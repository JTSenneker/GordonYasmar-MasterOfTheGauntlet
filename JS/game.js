var game = new Phaser.Game(800,600,Phaser.AUTO,'');



var pathFinder;
var level;
var layer;
var marker;
var gordonBattle = new PCBattle();



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
        player.draw();
        player.placePlayer();
        
        var walkables = [1];
        
        pathFinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        pathFinder.setGrid(Dungeon.map,walkables);
        console.log(level.layers[0].data);
        
        
        
        game.physics.enable(player.sprite,Phaser.Physics.ARCADE);
        player.sprite.body.setSize(25,25,0,0);
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
        

    };
    this.render=function(){};
};

var battle = function(){
    var healthFrame;
    var manaFrame;
    var ATBFrame;
    var ATBBar;
    var ATBCrop;
    var healthBar;
    var healthCrop;
    var timer;
    var enemy;
    var attackButton;
    this.preload=function(){
        game.load.image("heinz","imgs/Heinz.png");
        game.load.image("hpFrame","imgs/BattleSystem/GUI/HealthBarFrame.png");
        game.load.image("manaFrame","imgs/BattleSystem/GUI/ManaBarFrame.png");
        game.load.image("ATBFrame","imgs/BattleSystem/GUI/ATBFrame.png");
        game.load.image("HealthBar","imgs/BattleSystem/GUI/HealthBar.png");
        game.load.image("ATBBar","imgs/BattleSystem/GUI/ATB.png");
        game.load.spritesheet('attackButton',"imgs/BattleSystem/GUI/AttackButtonSheet.png",224,100);
    };
    this.create=function(){
        healthBar=game.add.sprite(10,477,'HealthBar');
        ATBBar = game.add.sprite(10,544,'ATBBar');
        ATBCrop = new Phaser.Rectangle(0,0,0,ATBBar.height);
        enemy = new Heinz();
        healthCrop=new Phaser.Rectangle(0,0,0,healthBar.height);
        manaFrame=game.add.sprite(0,492,'manaFrame');
        healthFrame=game.add.sprite(0,454,'hpFrame');
        ATBFrame=game.add.sprite(0,526,'ATBFrame');
        game.stage.backgroundColor = "#eeeeee";
        
        attackButton = game.add.button(500,400,'attackButton',attackButton,this,0,1,2);
        
    };
    function attackButton(){
        gordonBattle.ATBTimer=0;
    }
    this.update=function(){
        healthBar.crop(healthCrop);
        gordonBattle.update();
        healthCrop.width = (gordonBattle.hp/gordonBattle.maxHP)*188;
        ATBBar.crop(ATBCrop);
        ATBCrop.width = (gordonBattle.ATBTimer/gordonBattle.maxATB)*188;
        enemy.obj.update();
        //console.log(gordonBattle.ATBTimer);
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
        yasmar = game.add.sprite(300,0,"Yasmar");
        logo.scale.setTo(.5,.5);

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
game.state.add("battle",battle);
game.state.start("battle");

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
    

}

function PCBattle () {
    
    
    
    //data
    this.name = "Gordon";
    this.state={
        slow:0,
        haste:1000,
    };
    //PC level
    this.level = 1;
    
    //PC hp and mp - need a formula to derive these from core stats
    this.hp = 100;
    this.maxHP=100;
    this.mp = 100;
    
    //core stats ( can use array structure if preferred)
    //obj.stat = {vit:1, mag: 1, str: 1, def: 1, int: 1, dex: 1, eva: 1, spd: 1};
    this.vit = 1;
    this.mag = 1;        
    this.str = 1;
    this.def = 1;
    this.int = 1;
    this.dex = 1;
    this.eva = 1;
    this.spd = 4;
    this.maxATB=((60-this.spd)*160);
    
    //internal timer for battle turn
    this.ATBTimer = 0;
    
    /*
    *These can serve as a 1/0 boolean, or allow for increasing incrimentation
    *if desired (i.e. "fire 2" etc)
    */
    this.hasLearned = {fire:0,
                      blizzard:0,
                      thunder:0,
                      haste:0,
                     };
    
    /*
    *update function requires gameloop's delta time
    *updates attack timer for the hero
    */
    this.update = function () {
        if(this.state.slow > 0){
            this.ATBTimer +=6;
            this.state.slow--;
            
        }
        else if(this.state.haste > 0){
            this.ATBTimer +=15;
            this.state.haste--;
        }
        else this.ATBTimer += 10;
        
        if(this.ATBTimer >= this.maxATB){
            //this.attack();
        }
    }
    
    /*
    *Attack function
    *When triggered, this allows player to select attack
    *then select a target
    */
    this.attack = function () {
        //Pause timers to allow for selections?
        
        //select skill
        
        //target opponent
        
        //reset atbTimer
        this.ATBTimer = 0;
    }
    
}
function NPC (){
    
    //data
    this.name = "";
    this.description = "";
    this.state = {
        slow:0,
        haste:0,
    }
    //Level is a function of how deep into the gauntlet you are
    this.level = 1;
    
    //hp and mp - factors of stats?
    this.hp = 0;
    this.mp = 0;
    
    //core stats (can use array structure if preferred)
    //obj.stat = {vit:1, mag: 1, str: 1, def: 1, int: 1, dex: 1, eva: 1, spd: 1};
    this.vit = 1;
    this.mag = 1;        
    this.str = 1;
    this.def = 1;
    this.int = 1;
    this.dex = 1;
    this.eva = 1;
    this.spd = 1;
    
    this.baseAtk=10;
    this.maxATB=((60-this.spd)*160);
    //ATB timer
    this.ATBTimer = 0;
    
    //Do we want to calculate XP value here?
    this.xpGiven = 10;
    
    
    //skill system?  Dont know what stuff the NPC's will have
    this.hasLearned = {fire:0,
                      blizzard:0,
                      thunder:0,
                      haste:0,
                     }
    
    /*
    *Update function
    *takes gameloops delta time
    */
   this.update = function () {
        if(this.state.slow > 0){
            this.ATBTimer +=6;
            this.state.slow--;
            
        }
        else if(this.state.haste > 0){
            this.ATBTimer +=15;
            this.state.haste--;
        }
        else this.ATBTimer += 10;
        
        if(this.ATBTimer >= this.maxATB){
            this.attack();
        }
    }
    
    /*
    *AI attack function called when it's ATB timer hits 0
    *AI should select one of it's skills (if it has the resources to execute it
    *AI then selects a target (AI might need custom priorities to target lowest HP or %HP etc)
    *reset timer to it's delay
    */
    this.attack = function () {
        //select skill
        
        //target opponent
        
        //reset atbTimer
        this.ATBTimer = 0;
    }
    
}
function Heinz(){
    this.obj = new NPC();
    this.obj.hp=100;
    this.obj.xpGiven=10;
    this.obj.str=3;
    this.obj.spd=4;
    this.obj.baseAtk=25;
    
    this.obj.attack = function(){
        gordonBattle.hp-=((2*this.level+10)/100)*(this.str/gordonBattle.def)*this.baseAtk+2;
        this.ATBTimer=0;
    }
    this.obj.sprite = game.add.sprite(400,300,'heinz');
    this.obj.sprite.anchor.set(.5);
}

