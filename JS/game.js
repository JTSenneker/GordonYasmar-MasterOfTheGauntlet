var game = new Phaser.Game(800,600,Phaser.AUTO,'');



var pathFinder;
var level;
var layer;
var marker;
var blocked = false;
function findPathTo(tilex,tiley){
     pathFinder.setCallbackFunction(function(path) {
        path = path || [];
        for(var i = 0, ilen = path.length; i < ilen; i++) {
            map.putTile(0, path[i].x, path[i].y);
        }
        blocked=false;
    });
    pathFinder.preparePathCalculation([0,0],[tilex,tiley]);
    pathFinder.calculatePath();
    console.log("path found!")
}

//////////////Convenience Random Function////////////
function GetRandom(min,max){
    return~~ (Math.random() * (max - min)) + min;
}

var overworld = function(){
    this.preload=function(){
        game.load.image("floorTile","imgs/TileSheet.png");
        game.load.image("gordon","imgs/GordonYasmarOverworld.png");
        player = new PlayerOW();
        
    };
    this.create=function(){

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        level=game.add.tilemap();
        level.addTilesetImage('floorTile');
        layer = level.create('layer',64,64,32,32);
        layer.resizeWorld();
        level.setCollision(1);

        Dungeon.Generate();
        //Dungeon.Draw();
        player.draw();
        player.placePlayer();
        
        var walkables = [1];
        
        pathFinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        pathFinder.setGrid(Dungeon.map,walkables);
        console.log(level.layers[0].data);
        marker = game.add.graphics();
        marker.lineStyle(2,0x000000,1);
        marker.drawRect(0,0,32,32);
        
        
        
        game.physics.enable(player.sprite,Phaser.Physics.ARCADE);
        player.sprite.body.setSize(32,32,2,1);
        player.sprite.collideWorldBounds=true;
        game.camera.follow(player.sprite);
        game.camera.scale.setTo(1,1);
        game.world.setBounds(0,0,Dungeon.mapSize*32*game.camera.scale.x,Dungeon.mapSize*32*game.camera.scale.y);
        player.sprite.smoothed = false;
        cursors = game.input.keyboard.createCursorKeys();
        
        
    };
    this.update=function(){
        game.physics.arcade.collide(player.sprite,layer);

        player.update();
        //console.log(game.input.y);
        marker.x = layer.getTileX(game.input.activePointer.worldX)*32;
        marker.y = layer.getTileY(game.input.activePointer.worldY)*32;
        if(game.input.mousePointer.isDown){
            console.log(level.getTile(layer.getTileX(marker.x),layer.getTileY(marker.y)));
            player.gridTargetX=layer.getTileX(marker.x)*32;
            player.gridTargetY=layer.getTileY(marker.y)*32;
        }
        

    };
    this.render=function(){};
};

var battle = function(){
    this.preload=function(){
        
    };
    this.create=function(){
        
    };
    this.update=function(){
        
    };
    this.render=function(){};
};

var title = function(){
    var logo;
    var yasmar;
    this.preload=function(){
        game.load.image("Logo","imgs/GordonYasmarLogo.png");
        game.load.image("Yasmar","imgs/YasmarNESColors.png");
    };
    this.create=function(){
        game.stage.backgroundColor = "#eeeeee";
        logo = game.add.sprite(0,0,"Logo");
        yasmar = game.add.sprite(800,0,"Yasmar");
        logo.scale.setTo(.75,.75);

    };
    this.update=function(){
        
    };
    this.render=function(){};
}
var gameover = function(){
     this.preload=function(){
        
    };
    this.create=function(){
        
    };
    this.update=function(){
        
    };
    this.render=function(){};
};
game.state.add("overworld", overworld);
game.state.add("title", title);
game.state.start("overworld");

///////////////Tile Object///////////////////
function Tile(posX,posY,value){
    this.x = posX*32;
    this.y = posY*32;
    this.gridX=posX;
    this.gridY=posY;
    this.value = value;
    this.sprite;
    this.Draw = function(graphics){
        if(this.value==1){
            //this.sprite = game.add.sprite(this.x,this.y,'floorTile');
            level.putTile(0,layer.getTileX(this.x),layer.getTileY(this.y),layer);
            //this.sprite.smoothed=false;
        }
        else   level.putTile(1,layer.getTileX(this.x),layer.getTileY(this.y),layer);

        
    }
}

////////////////Dungeon Object//////////////
var Dungeon = {
    ////////////////VARIABLES/////////////////
    map:null,
    mapSize:64,
    rooms:[],

    //////////////////////////////////////////
    ///////////MAP GENERATING FUNCTION////////
    //////////////////////////////////////////
    //Creates a 2D array for the map
    //Places rooms onto the map
    //Checks to see if a room collides with another room
    //moves colliding roomes away from them
    //fills rooms with tiles
    //Connects rooms
    Generate: function(){
        this.map=[];
        for (var x = 0;x<this.mapSize-1;x++){
            this.map[x]=[];
            for(var y = 0; y<this.mapSize-1;y++){
                this.map[x][y] = 0;
                level.putTile(1,x,y,layer);
            }
        }

        var roomCount = GetRandom(10,20);
        var minSize = 5;
        var maxSize = 15;

        //create rooms and put them into the rooms array
        for(var i = 0;i<roomCount;i++){
            var room = {};

            room.x = GetRandom(1, this.mapSize-maxSize-1);
            room.y = GetRandom(1, this.mapSize-maxSize-1);
            room.w = GetRandom(minSize,maxSize);
            room.h = GetRandom(minSize,maxSize);

            if(this.RoomsCollide(room)){
                i--;
                continue;
            }
            room.w--;
            room.h--;

            this.rooms.push(room);
        }

        //place the rooms on the map
        for(i=0; i<roomCount;i++){
            var room=this.rooms[i];
            for(var x=room.x;x<room.x+room.w;x++){
                for(var y=room.y;y<room.y+room.h;y++){
                    level.putTile(0,x,y,layer);

                }
            }
        }
        //connect the rooms
        for(i=0;i<roomCount;i++){
            var roomA = this.rooms[i];
            var roomB = this.FindClosestRoom(roomA);

            pointA = {
                x:GetRandom(roomA.x,roomA.x+roomA.w),
                y:GetRandom(roomA.y,roomA.y+roomA.h),
            };
            pointB = {
                x:GetRandom(roomB.x,roomB.x+roomB.w),
                y:GetRandom(roomB.y,roomB.y+roomB.h),
            };
            while((pointB.x!=pointA.x)){
                if(pointB.x>pointA.x)pointB.x--;
                else if(pointB.x<pointA.x)pointB.x++;
                else return;
                level.putTile(0,pointB.x,pointB.y,layer);

            }
            while((pointB.y!=pointA.y)){
                if(pointB.y>pointA.y)pointB.y--;
                else if(pointB.y<pointA.y) pointB.y++;
                else return;
                level.putTile(0,pointB.x,pointB.y,layer);

            }
        }
    },

    ////////////////////////////////////
    ///////ROOM COLLISION FUNCTION//////
    ////////////////////////////////////
    //Checks to see if one room collides with another
    RoomsCollide:function(room, ignore){
        for(var i = 0; i <this.rooms.length;i++){
            if(i==ignore) continue;
            var check = this.rooms[i];
            if(!((room.x+room.w<check.x)||(room.x>check.x+check.w)||(room.y+room.h<check.y)||(room.y>check.y+check.h)))return true;
        }
        return false;
    },

    /////////////////////////////////////
    //////FIND CLOSEST ROOM FUNCTION/////
    /////////////////////////////////////
    //looks through the rooms array
    //finds the closest room to the room passed into the function
    FindClosestRoom:function(room){
        var roomCenter = {
            x:room.x+(room.w/2),
            y:room.h+(room.h/2)
        };
        var closest = null;
        var closest_distance = 1000;
        for(var i = 0; i<this.rooms.length;i++){
            var check = this.rooms[i];
            if(check == room)continue;
            var checkCenter = {
                x:check.x+(check.w/2),
                y:check.h+(check.h/2)
            };
            var distance = Math.min(Math.abs(roomCenter.x - checkCenter.x) - (room.w / 2) - (check.w / 2), Math.abs(roomCenter.y - checkCenter.y) - (room.h / 2) - (check.h / 2));
            if (distance < closest_distance) {
                closest_distance = distance;
                closest = check;
            }
        }
        return closest;
    },
    
    //////////////////////////////////////
    //////////GET TILE FUNCTION///////////
    //////////////////////////////////////
   /* GetTile:function(point){
        if(point.x < 0 || point.y < 0) return null;
        if(point.x > Dungeon.map[0].length || point.y > Dungeon.map.length) return null;
        return Dungeon.map[point.x][point.y];
    },
    */
    Draw:function(graphics){
        for(var x=0;x<this.mapSize-1;x++){
                for(var y=0;y<this.mapSize-1;y++){
                    this.map[x][y].Draw(graphics);
                }
            }
    }
}

///////////////Overworld Player////////////
function PlayerOW(){
    
    this.gridX = 1;
    this.gridY = 1;
    this.gridTargetX = 32;
    this.gridTargetY = 32;
    this.x=32;
    this.y=32;
    this.sprite;
    this.placedOnMap=false;
    this.targetTile = null;
    var me = this;
    var targetTile;
    this.placePlayer=function(){
        while(!this.placedOnMap){
            var spawnTile = level.getTile(GetRandom(1,63),GetRandom(1,64));
            
            if(spawnTile!=null && spawnTile.index==0){
                this.sprite.position.x=spawnTile.worldX+spawnTile.centerX;
                this.sprite.position.y=spawnTile.worldY+spawnTile.centerY;
                this.placedOnMap=true;
                player.collideWorldBounds=true;
            }
        }
        console.log(this.targetTile);
    }
    this.draw=function(){
        this.sprite = game.add.sprite(this.x,this.y,'gordon');
        this.sprite.anchor.x=.5;
        this.sprite.anchor.y=.5;

    }
    this.update=function(){
        this.sprite.body.velocity.set(0);
        if(cursors.up.isDown)this.sprite.body.velocity.y = -200;
        if(cursors.down.isDown)this.sprite.body.velocity.y = 200;
        if(cursors.right.isDown)this.sprite.body.velocity.x = 200;
        if(cursors.left.isDown)this.sprite.body.velocity.x = -200;
    };
    this.goLeft=function(){
        targetTile = level.getTileLeft(level.getLayer(),layer.getTileX(this.x),layer.getTileY(this.y));
       
    }
     this.goRight=function(){
        targetTile = level.getTileRight(level.getLayer(),layer.getTileX(this.x),layer.getTileY(this.y));
      
    }
     this.goUp=function(){
        targetTile = level.getTileAbove(level.getLayer(),layer.getTileX(this.x),layer.getTileY(this.y));
      
    }
     this.goDown=function(){
        targetTile = level.getTileBelow(level.getLayer(),layer.getTileX(this.x),layer.getTileY(this.y));
        
    }
     this.updateMove=function(){
      if(targetTile!=null && targetTile.index==0){
            var targetPositionX = targetTile.worldX+targetTile.centerX;
            var targetPositionY = targetTile.worldY+targetTile.centerY;

            var diffX = targetPositionX - this.x;
            var diffY = targetPositionY - this.y;

            this.x+=diffX*.2;
            this.y+=diffY*.2;

            if(Math.abs(diffX)<1)this.x=targetPositionX;
            if(Math.abs(diffY)<1)this.y=targetPositionY;
        }   
     }
    

}


/////////////POINT OBJECT////////////////
function Point(pointX,pointY){
    this.x=pointX;
    this.y=pointY;
    
    this.getUp=function(){
        return new Point(this.x,this.y-1);
    };
    this.getDown=function(){
        return new Point(this.x,this.y+1);
    };
    this.getLeft=function(){
        return new Point(this.x-1,this.y);
    };
    this.getRight=function(){
        return new Point(this.x+1,this.y);
    };
}

////////////TILE HELPER OBJECT//////////
var TileHelper = {
    pixelToGrid:function(x,y){
        return new Point(~~(x/32),~~(y/32));
    },
    gridToPixel:function(point){
        return {x:point.x*32,y:point.y*32};
    }
};
