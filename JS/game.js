var game = new Phaser.Game(800,600,Phaser.AUTO,'');

var damageText;
var attackAnimation;
var pathFinder;
var level;
var layer;
var marker;
var gordonBattle = new PCBattle();

var BattleAnim;
var animationInProgress=false;

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
    var manaBar;
    var manaCrop;
    var enemy;
    var buttons = {
        attackButton:0,
        healButton:0,
        runButton:0,
        fireButton:0,
        iceButton:0,
        hasteButton:0,
    }
    var buttonLocations = {
        runX:249,
        runY:527,
        attackX:248,
        attackY:452,
        fireX:227,
        fireY:382,
        iceX:168,
        iceY:329,
        hasteX:15,
        hasteY:313,
        healX:91,
        healY:312
    };
    
    this.preload=function(){
        
        game.load.image("heinz","imgs/Heinz.png");
        game.load.image("hpFrame","imgs/BattleSystem/GUI/HealthBarFrame.png");
        game.load.image("manaFrame","imgs/BattleSystem/GUI/ManaBarFrame.png");
        game.load.image("ATBFrame","imgs/BattleSystem/GUI/ATBFrame.png");
        game.load.image("HealthBar","imgs/BattleSystem/GUI/HealthBar.png");
        game.load.image("ATBBar","imgs/BattleSystem/GUI/ATB.png");
        game.load.image("ManaBar","imgs/BattleSystem/GUI/ManaBar.png");
        game.load.image("gordonSprite","imgs/BattleSystem/GUI/GordonBattleSprite.png");
        game.load.spritesheet('buttonSheet',"imgs/BattleSystem/GUI/ButtonSheet.png",64,64);
        game.load.spritesheet('slashAttack',"imgs/BattleSystem/Animations/slashAnimation.png",240,256);
        game.load.spritesheet('fireSpell',"imgs/BattleSystem/Animations/FireSpellEffect.png",64,64);
        game.load.spritesheet('iceSpell',"imgs/BattleSystem/Animations/IceSpellEffect.png",256,256);
        game.load.spritesheet("HasteAnim","imgs/BattleSystem/Animations/HasteAnimation.png",117,122);
        game.load.spritesheet("CureSpell","imgs/BattleSystem/Animations/CureSpellEffect.png",64,64);
    };
    this.create=function(){
        damageText=game.add.text(32,32,"",{fill:'white'});
        game.stage.backgroundColor = "#333333";
        
        healthBar=game.add.sprite(547,477,'HealthBar');
        manaBar=game.add.sprite(547,510,'ManaBar');
        ATBBar = game.add.sprite(547,544,'ATBBar');
        ATBCrop = new Phaser.Rectangle(0,0,0,ATBBar.height);
        healthCrop=new Phaser.Rectangle(0,0,0,healthBar.height);
        manaCrop=new Phaser.Rectangle(0,0,0,manaBar.height);
        manaFrame=game.add.sprite(537,492,'manaFrame');
        healthFrame=game.add.sprite(537,454,'hpFrame');
        ATBFrame=game.add.sprite(537,526,'ATBFrame');
        
        enemy = new Heinz();
        gordonBattle.sprite = game.add.sprite(6,404,'gordonSprite');
        
        
        buttons.attackButton = game.add.button(-1000,-1000,'buttonSheet',attackButton,this,16,15,17);
        buttons.fireButton = game.add.button(-1000,-1000,'buttonSheet',fireSpellButton,this,4,3,5);
        buttons.healButton = game.add.button(-1000,-1000,'buttonSheet',cureSpellButton,this,1,0,2);
        buttons.iceButton = game.add.button(-1000,-1000,'buttonSheet',iceSpellButton,this,7,6,8);
        buttons.hasteButton = game.add.button(-1000,-1000,'buttonSheet',hasteSpellButton,this,10,9,11);
        buttons.runButton = game.add.button(-1000,-1000,'buttonSheet',attackButton,this,13,12,14);
        
    };
    /////Call back functions for the buttons
    function attackButton(){
        if(animationInProgress===false){
            attackAnimation = game.add.sprite(500,350,'slashAttack',5);
            attackAnimation.anchor.set(.5);
            animationInProgress=true;
            attackAnimation.position.x=400;
            attackAnimation.position.y=300;
            BattleAnim = attackAnimation.animations.add('slash',null,10);
            BattleAnim.play();
            gordonBattle.ATBTimer=0;
            BattleAnim.onComplete.add(function(){
                    var dmg = Math.floor(((2*gordonBattle.level+10)/100)*(gordonBattle.str/enemy.obj.def)*gordonBattle.baseAtk+GetRandom(2,8));
                    enemy.obj.hp-=dmg;
                    damageText.text=dmg;
                    
                    animationInProgress=false;
                   
                });
        }
    }
    function iceSpellButton(){
        if(gordonBattle.mp-20>=0){
            if(animationInProgress===false){
                gordonBattle.mp-=20;
                attackAnimation = game.add.sprite(500,350,'iceSpell',18);
                attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(.75);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                attackAnimation.position.x=400;
                attackAnimation.position.y=300;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                        var dmg = Math.floor(((2*gordonBattle.level+10)/100)*(gordonBattle.int/enemy.obj.def)*150+GetRandom(2,8));
                        enemy.obj.state.slow=1200;
                        enemy.obj.hp-=dmg;
                        damageText.text=dmg;

                        animationInProgress=false;

                    });
            }
        }else damageText.text="You don't have enought Magic!"
    }
    function fireSpellButton(){
        if(gordonBattle.mp-20>=0){
            if(animationInProgress===false){
                gordonBattle.mp-=20;
                attackAnimation = game.add.sprite(500,350,'fireSpell',11);
                attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                attackAnimation.position.x=400;
                attackAnimation.position.y=300;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                        var dmg = Math.floor(((2*gordonBattle.level+10)/100)*(gordonBattle.int/enemy.obj.def)*200+GetRandom(2,8));
                        enemy.obj.hp-=dmg;
                        damageText.text=dmg;

                        animationInProgress=false;

                    });
            }
        }else damageText.text="You don't have enought Magic!"
    }
    function hasteSpellButton(){
        if(gordonBattle.mp-20>=0){
            if(animationInProgress===false){
                gordonBattle.mp-=20;
                attackAnimation = game.add.sprite(gordonBattle.sprite.position.x,gordonBattle.sprite.position.y,'HasteAnim');
               // attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                BattleAnim = attackAnimation.animations.add('slash',null);
                BattleAnim.play('slash',10,false,true);
                gordonBattle.state.haste=3000;
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                       
                        
                        animationInProgress=false;

                    });
            }
        }else damageText.text="You don't have enought Magic!"
    }
    function cureSpellButton(){
        if(gordonBattle.mp-20>=0){
            if(animationInProgress===false){
                gordonBattle.mp-=20;
                attackAnimation = game.add.sprite(gordonBattle.sprite.position.x,gordonBattle.sprite.position.y,'CureSpell');
               // attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                       
                        gordonBattle.hp+=100; 
                        animationInProgress=false;

                    });
            }
        }else damageText.text="You don't have enought Magic!"
    }
    
    this.update=function(){
        if(gordonBattle.ATBTimer>=gordonBattle.maxATB){
            revealButtons();
        }else{
            hideButtons();
        }
        
        console.log(gordonBattle.mp);
        healthBar.crop(healthCrop);
        manaBar.crop(manaCrop);
        manaCrop.width = (gordonBattle.mp/gordonBattle.maxMP)*188;
        gordonBattle.update();
        healthCrop.width = (gordonBattle.hp/gordonBattle.maxHP)*188;
        ATBBar.crop(ATBCrop);
        ATBCrop.width = (gordonBattle.ATBTimer/gordonBattle.maxATB)*188;
        enemy.obj.update();
        //console.log(gordonBattle.ATBTimer);
    };
    this.render=function(){};
    function revealButtons(){
        buttons.attackButton.x=buttonLocations.attackX;
        buttons.attackButton.y=buttonLocations.attackY;
        buttons.runButton.x=buttonLocations.runX;
        buttons.runButton.y=buttonLocations.runY;
        
        if(gordonBattle.hasLearned.fire>0){
            buttons.fireButton.x=buttonLocations.fireX;
            buttons.fireButton.y=buttonLocations.fireY;
        }
        if(gordonBattle.hasLearned.blizzard>0){
            buttons.iceButton.x=buttonLocations.iceX;
            buttons.iceButton.y=buttonLocations.iceY;
        }
        if(gordonBattle.hasLearned.haste>0){
            buttons.hasteButton.x=buttonLocations.hasteX;
            buttons.hasteButton.y=buttonLocations.hasteY;
        }
        if(gordonBattle.hasLearned.heal>0){
            buttons.healButton.x=buttonLocations.healX;
            buttons.healButton.y=buttonLocations.healY;
        }
        
    }
    function hideButtons(){
        buttons.attackButton.x=-1000;
        buttons.attackButton.y=-1000;
        buttons.runButton.x=-1000;
        buttons.runButton.y=-1000;
        buttons.fireButton.x=-1000;
        buttons.fireButton.y=-1000;
        buttons.iceButton.x=-1000;
        buttons.iceButton.y=-1000;
        buttons.healButton.x=-1000;
        buttons.healButton.y=-1000;
        buttons.hasteButton.x=-1000;
        buttons.hasteButton.y=-1000;
        
        
    }
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
    
    
    this.sprite = 0;
    //data
    this.name = "Gordon";
    this.state={
        slow:0,
        haste:0,
    };
    //PC level
    this.level = 1;
    //PC xp - used to help the player level up
    this.xp = 0;
    this.maxXP=Math.floor((this.level+300*Math.pow(2,this.level/7))/4);
    
    //core stats ( can use array structure if preferred)
    //obj.stat = {vit:1, mag: 1, str: 1, def: 1, int: 1, dex: 1, eva: 1, spd: 1};
    this.vit = 5;
    this.mag = 5;        
    this.str = 5;
    this.def = 5;
    this.int = 5;
    this.dex = 5;
    this.eva = 5;
    this.spd = 5;
    this.maxATB=((60-this.spd)*160);
    this.baseAtk=100;
    //internal timer for battle turn
    this.ATBTimer = 0;
    
    //PC hp and mp - need a formula to derive these from core stats
    
    this.maxHP=100+(3*this.vit*this.level)+(this.level*4);
    this.hp = this.maxHP;
    
    this.maxMP=100+(3*this.mag*this.level)+(this.level*4);
    this.mp = this.maxMP;
    
    /*
    *These can serve as a 1/0 boolean, or allow for increasing incrimentation
    *if desired (i.e. "fire 2" etc)
    */
    this.hasLearned = {fire:1,
                      blizzard:1,
                      heal:1,
                      haste:1,
                     };
    
    /*
    *update function requires gameloop's delta time
    *updates attack timer for the hero
    */
    this.update = function () {
        if(this.hp>this.maxHP)this.hp=this.maxHP;
        if(this.hp<=0)this.hp=0;
        if(this.mp<=0)this.mp=0;
        if(this.state.slow > 0){
            this.ATBTimer +=6;
            this.state.slow--;
            
        }
        else if(this.state.haste > 0){
            this.ATBTimer +=20;
            this.state.haste--;
        }
        else this.ATBTimer += 10;
        
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
    this.vit = 5;
    this.mag = 5;        
    this.str = 5;
    this.def = 5;
    this.int = 5;
    this.dex = 5;
    this.eva = 5;
    this.spd = 5;
    
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
    this.obj.def=4;
    this.obj.xpGiven=10;
    this.obj.baseAtk=25;
    
    this.obj.attack = function(){
        if(animationInProgress===false){
            animationInProgress = true;
            attackAnimation = game.add.sprite(500,350,'slashAttack',5);
            attackAnimation.position.x=gordonBattle.sprite.position.x;
            attackAnimation.position.y=gordonBattle.sprite.position.y;
            BattleAnim = attackAnimation.animations.add('slash',null,10);
            BattleAnim.play();
            var dmg = ((2*this.level+10)/100)*(this.str/gordonBattle.def)*this.baseAtk+2;
            var me = this;
            BattleAnim.onComplete.add(function(){
                
                gordonBattle.hp-=dmg;
                damageText.text=dmg;
                animationInProgress=false;
                me.ATBTimer=0;
            });
        }
    }
    this.obj.sprite = game.add.sprite(400,300,'heinz');
    this.obj.sprite.anchor.set(.5);
}

