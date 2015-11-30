var game = new Phaser.Game(800,600,Phaser.AUTO,'');
<<<<<<< HEAD

=======
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
>>>>>>> origin/NewEngine
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
<<<<<<< HEAD
       
=======
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        level=game.add.tilemap();
        level.addTilesetImage('floorTile');
        layer = level.create('layer',64,64,32,32);
        layer.resizeWorld();
        
>>>>>>> origin/NewEngine
        Dungeon.Generate();
        //Dungeon.Draw();
        player.draw();
        
        
        var walkables = [1];
        
        pathFinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        pathFinder.setGrid(Dungeon.map,walkables);
        console.log(level.layers[0].data);
        marker = game.add.graphics();
        marker.lineStyle(2,0x000000,1);
        marker.drawRect(0,0,32,32);
        
        
        
        game.physics.enable(player.sprite);
        game.camera.follow(player.sprite);
       // game.camera.scale.setTo(1,1);
        game.world.setBounds(0,0,Dungeon.mapSize*32*game.camera.scale.x,Dungeon.mapSize*32*game.camera.scale.y);
        player.sprite.smoothed = false;
        cursors = game.input.keyboard.createCursorKeys();
        
    };
    this.update=function(){
<<<<<<< HEAD
        player.x+=1;
        player.sprite.position.x +=1;
=======
        player.update();
        //console.log(game.input.y);
        marker.x = layer.getTileX(game.input.activePointer.worldX)*32;
        marker.y = layer.getTileY(game.input.activePointer.worldY)*32;
        if(game.input.mousePointer.isDown){
            blocked=true;
            //player.findPathTo(layer.getTileX(marker.x),layer.getTileY(marker.y));
            console.log(level.getTile(layer.getTileX(marker.x),layer.getTileY(marker.y)));
            player.gridTargetX=layer.getTileX(marker.x)*32;
            player.gridTargetY=layer.getTileY(marker.y)*32;
        }
        
>>>>>>> origin/NewEngine
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
<<<<<<< HEAD
    this.preload=function(){
        game.load.image("logo","imgs/GordonYasmarLogo.png");
        
    };
    this.create=function(){
        game.stage.backgroundColor = "#eeeeee";
        logo = game.add.sprite(0,0,'logo');
        logo.scale.setTo(.5,.5);
=======
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
>>>>>>> origin/NewEngine
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
game.state.start("title");

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
                this.map[x][y] = new Tile(x,y,0);
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
<<<<<<< HEAD
    this.sprite;
    this.draw=function(){
        this.sprite = game.add.sprite(this.x,this.y,'gordon');
=======
    this.path = [];
    this.findPath=true;
    this.sprite;
    var me = this;
    this.draw=function(){
       this.sprite = game.add.sprite(this.x,this.y,'gordon');
>>>>>>> origin/NewEngine
    }
    this.update=function(){
        this.sprite.position.x=this.x;
        this.sprite.position.y=this.y;
        
        if(cursors.up.isDown)this.y-=4;
        if(cursors.down.isDown)this.y+=4;
        if(cursors.right.isDown)this.x+=4;
        if(cursors.left.isDown)this.x-=4;
    };
    this.findPathTo=function(tilex, tiley) {

    pathFinder.setCallbackFunction(function(path) {
        path = path || [];
        for(var i = 0, ilen = path.length; i < ilen; i++) {
            level.putTile(0, path[i].x, path[i].y);
        }
        blocked = false;
    });

    pathFinder.preparePathCalculation([0,0], [tilex,tiley]);
    pathFinder.calculatePath();
    };

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
}
