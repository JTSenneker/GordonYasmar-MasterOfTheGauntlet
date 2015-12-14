var game = new Phaser.Game(800,600,Phaser.AUTO,'canvas');
var dialogueText;
var damageText;
var attackAnimation;
var pathFinder;
var level=0;
var layer;
var marker;
var inventoryItemSlot;
var armors = [
    {
    //Objects descriptive content
    name:"Cuisiner's Garb",
    description:"Common clothing worn by cuisiners.",
    //icon
    sprite:3,
    /*
    *the slot will control equip slot as follows 
    0: Weapon 1: head 2: body 3: arms 4: legs
    */
    slot:2,
    //objects statistical buffs
    Addvit:1,
    Addmag:1,
    Addstr:1,
    Adddef:1,
    Addint:1,
    Adddex:1,
    Addeva:1,
    Addspd:1,
    //slot number in inventory
    inventorySlot:0
},
    {
    //Objects descriptive content
    name:"Cotton Robe",
    description:"A robe that helps hone one's magic.",
    //icon
    sprite:3,
    /*
    *the slot will control equip slot as follows 
    0: Weapon 1: head 2: body 3: arms 4: legs
    */
    slot:2,
    //objects statistical buffs
    Addvit:0,
    Addmag:0,
    Addstr:0,
    Adddef:0,
    Addint:3,
    Adddex:0,
    Addeva:0,
    Addspd:0,
    //slot number in inventory
    inventorySlot:0
},
    {
    //Objects descriptive content
    name:"Master's Robe",
    description:"A robe like the one Master Toille wears.",
    //icon
    sprite:3,
    /*
    *the slot will control equip slot as follows 
    0: Weapon 1: head 2: body 3: arms 4: legs
    */
    slot:2,
    //objects statistical buffs
    Addvit:0,
    Addmag:5,
    Addstr:0,
    Adddef:2,
    Addint:8,
    Adddex:0,
    Addeva:0,
    Addspd:0,
    //slot number in inventory
    inventorySlot:0
},
    {
    //Objects descriptive content
    name:"Iron shirt",
    description:"How did they make such a comfortable shirt out of metal?",
    //icon
    sprite:3,
    /*
    *the slot will control equip slot as follows 
    0: Weapon 1: head 2: body 3: arms 4: legs
    */
    slot:2,
    //objects statistical buffs
    Addvit:0,
    Addmag:0,
    Addstr:0,
    Adddef:6,
    Addint:0,
    Adddex:0,
    Addeva:0,
    Addspd:0,
    //slot number in inventory
    inventorySlot:0
},
    {
    //Objects descriptive content
    name:"Mysterious Hood",
    description:"A strange hood that makes you faster",
    //icon
    sprite:3,
    /*
    *the slot will control equip slot as follows 
    0: Weapon 1: head 2: body 3: arms 4: legs
    */
    slot:2,
    //objects statistical buffs
    Addvit:0,
    Addmag:0,
    Addstr:0,
    Adddef:0,
    Addint:0,
    Adddex:0,
    Addeva:0,
    Addspd:6,
    //slot number in inventory
    inventorySlot:0
},
    {
    //Objects descriptive content
    name:"Raggedy Clothes",
    description:"These clothes are all torn up.",
    //icon
    sprite:3,
    /*
    *the slot will control equip slot as follows 
    0: Weapon 1: head 2: body 3: arms 4: legs
    */
    slot:2,
    //objects statistical buffs
    Addvit:-2,
    Addmag:-2,
    Addstr:-2,
    Adddef:-2,
    Addint:-2,
    Adddex:-2,
    Addeva:-2,
    Addspd:-2,
    //slot number in inventory
    inventorySlot:0
}
    
];
var gloves = [
      {
        //Objects descriptive content
        name:"Cuisiner's Gloves",
        description:"Common clothing worn by cuisiners.",
        //icon
        sprite:0,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:3,
        //objects statistical buffs
        Addvit:1,
        Addmag:1,
        Addstr:1,
        Adddef:1,
        Addint:1,
        Adddex:1,
        Addeva:1,
        Addspd:1,
        //slot number in inventory
        inventorySlot:0
    },
      {
        //Objects descriptive content
        name:"Leather Gloves",
        description:"Pretty nice looking gloves made of leather.",
        //icon
        sprite:0,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:3,
        //objects statistical buffs
        Addvit:0,
        Addmag:0,
        Addstr:0,
        Adddef:1,
        Addint:0,
        Adddex:3,
        Addeva:0,
        Addspd:0,
        //slot number in inventory
        inventorySlot:0
      },
     {
        //Objects descriptive content
        name:"Iron Gauntlets",
        description:"Sturdy gauntlets made of iron.",
        //icon
        sprite:0,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:3,
        //objects statistical buffs
        Addvit:0,
        Addmag:0,
        Addstr:0,
        Adddef:4,
        Addint:0,
        Adddex:2,
        Addeva:0,
        Addspd:0,
        //slot number in inventory
        inventorySlot:0
      },
     {
        //Objects descriptive content
        name:"Steel Gauntlets",
        description:"Strong gauntlets made of steel.",
        //icon
        sprite:0,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:3,
        //objects statistical buffs
        Addvit:0,
        Addmag:0,
        Addstr:0,
        Adddef:6,
        Addint:0,
        Adddex:3,
        Addeva:0,
        Addspd:0,
        //slot number in inventory
        inventorySlot:0
      },
     {
        //Objects descriptive content
        name:"Silver Gauntlets",
        description:"Pretty nice looking gloves made of leather.",
        //icon
        sprite:3,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:3,
        //objects statistical buffs
        Addvit:0,
        Addmag:0,
        Addstr:0,
        Adddef:10,
        Addint:0,
        Adddex:6,
        Addeva:0,
        Addspd:0,
        //slot number in inventory
        inventorySlot:0
      },
     {
        //Objects descriptive content
        name:"Fingerless Gloves",
        description:"With these, you'll definitely look cool!",
        //icon
        sprite:0,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:3,
        //objects statistical buffs
        Addvit:0,
        Addmag:0,
        Addstr:0,
        Adddef:0,
        Addint:0,
        Adddex:7,
        Addeva:0,
        Addspd:2,
        //slot number in inventory
        inventorySlot:0
      },
     {
        //Objects descriptive content
        name:"The Master's Gauntlets",
        description:"Could these be the gauntlets you're looking for?",
        //icon
        sprite:0,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:3,
        //objects statistical buffs
        Addvit:-2,
        Addmag:-2,
        Addstr:-2,
        Adddef:-2,
        Addint:-2,
        Adddex:-2,
        Addeva:-2,
        Addspd:-2,
        //slot number in inventory
        inventorySlot:0
      }
];
var weapons = [
      {
    //Objects descriptive content
        name:"Iron Sword",
        description:"A large sword that's in decent shape.",
        //icon
        sprite:4,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:0,
        //objects statistical buffs
        Addvit:0,
        Addmag:0,
        Addstr:3,
        Adddef:0,
        Addint:0,
        Adddex:0,
        Addeva:0,
        Addspd:0,
        //slot number in inventory
        inventorySlot:0
      },
    {
    //Objects descriptive content
        name:"Steel Sword",
        description:"A large sword that's in good shape.",
        //icon
        sprite:4,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:0,
        //objects statistical buffs
        Addvit:0,
        Addmag:0,
        Addstr:6,
        Adddef:0,
        Addint:0,
        Adddex:0,
        Addeva:0,
        Addspd:0,
        //slot number in inventory
        inventorySlot:0
      },
    {
    //Objects descriptive content
        name:"Silver Sword",
        description:"A large sword that's in great shape.",
        //icon
        sprite:4,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:0,
        //objects statistical buffs
        Addvit:0,
        Addmag:0,
        Addstr:10,
        Adddef:0,
        Addint:0,
        Adddex:0,
        Addeva:0,
        Addspd:0,
        //slot number in inventory
        inventorySlot:0
      },
    {
    //Objects descriptive content
        name:"The HKT",
        description:"A devilish trident with great power.",
        //icon
        sprite:4,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:0,
        //objects statistical buffs
        Addvit:10,
        Addmag:10,
        Addstr:10,
        Adddef:10,
        Addint:10,
        Adddex:10,
        Addeva:10,
        Addspd:10,
        //slot number in inventory
        inventorySlot:0
      },
    {
    //Objects descriptive content
        name:"Wooden Sword",
        description:"Master Harland made you train with these before you could use a real blade.",
        //icon
        sprite:4,
        /*
        *the slot will control equip slot as follows 
        0: Weapon 1: head 2: body 3: arms 4: legs
        */
        slot:0,
        //objects statistical buffs
        Addvit:-2,
        Addmag:-2,
        Addstr:-2,
        Adddef:-2,
        Addint:-2,
        Adddex:-2,
        Addeva:-2,
        Addspd:-2,
        //slot number in inventory
        inventorySlot:0
      }
    ];


var gordonBattle = new PCBattle();
var cursors;
var BattleAnim;
var animationInProgress=false;
var player = new PlayerOW();
var boss = new BossOW();

var inventoryHandle=0;

var battleMusic;
var bossBattleMusic;
var titleMusic;
var gameOverMusic;
var overWorldMusic;
var floor=3;
var treasurechest = new treasureChest();
var dialogueBoxLifeSpan;
var dialogueBox;




//////////////Convenience Random Function////////////
function GetRandom(min,max){
    return~~ (Math.random() * (max - min)) + min;
}

//loads the music
var loadMusic= function(){
    this.preload=function(){
        game.load.audio("battleTheme",["JS/audio/Music/MP3/1-02 Resonant Hopes Ignited Wills.mp3","audio/Music/OGG/1-02 Resonant Hopes Ignited Wills.ogg"]);
        game.load.audio("bossBattleTheme",["JS/audio/Music/MP3/3-11 Royalty of Sin.mp3","audio/Music/OGG/3-11 Royalty of Sin.ogg"]);
        game.load.audio("overWorldTheme",["JS/audio/Music/MP3/2-05 Mellow Darkness.mp3","audio/Music/OGG/2-05 Mellow Darkness.ogg"]);
        game.load.audio("gameOverTheme",["JS/audio/Music/MP3/2-03 Peaceful Moment.mp3","audio/Music/OGG/2-03 Peaceful Moment.ogg"]);
        game.load.audio("titleTheme",["JS/audio/Music/MP3/2-10 Poem for The Different Future.mp3","audio/Music/OGG/2-10 Poem for The Different Future.ogg"]);
        
        //Load Game Over Images
        game.load.image("gameOverBG","JS/imgs/EndScreen/EndScreen.png");
        game.load.spritesheet("gameOverButtons", "JS/imgs/EndScreen/EndScreen_Buttons.png", 345, 38, 3);
        
        //Load Overworld Images
        game.load.image("floorTile","JS/imgs/TileSheet.png");
        game.load.image("gordon","JS/imgs/GordonYasmarOverworld.png");
        game.load.image("rahman","JS/imgs/OverWorld/RahmanOverworld.png");
        game.load.image("toille","JS/imgs/OverWorld/toilleOverworld.png");
        game.load.image("hFigure","JS/imgs/OverWorld/JohnOverworld.png");
        game.load.spritesheet("treasureChest","JS/imgs/OverWorld/TreasureChestSheet.png",32,32);
        game.load.spritesheet("gordonOW","JS/imgs/OverWorld/GordonYasmarOverworld.png",32,32);
        
        //Load Battle Images
        game.load.image("poultrygeist","JS/imgs/BattleSystem/GUI/poultrygeist.png");
        game.load.image("cuclumberjack","JS/imgs/BattleSystem/GUI/cuclumberjack.png");
        game.load.image("hoodedFigure","JS/imgs/BattleSystem/GUI/JohnRaffetBattle.png");
        game.load.image("toilleBattle","JS/imgs/BattleSystem/GUI/MasterToilleBattle.png");
        game.load.image("rahmanBattle","JS/imgs/BattleSystem/GUI/RahmanBattle.png");
        game.load.image("battleBackground","JS/imgs/BattleSystem/GUI/battlescreen_background.png");
        game.load.image("DialogueBox","JS/imgs/BattleSystem/GUI/DialogueBox.png");
        game.load.image("statBox","JS/imgs/BattleSystem/GUI/statBox.png");
        game.load.image("heinz","JS/imgs/Heinz.png");
        game.load.image("hpFrame","JS/imgs/BattleSystem/GUI/HealthBarFrame.png");
        game.load.image("manaFrame","JS/imgs/BattleSystem/GUI/ManaBarFrame.png");
        game.load.image("ATBFrame","JS/imgs/BattleSystem/GUI/ATBFrame.png");
        game.load.image("HealthBar","JS/imgs/BattleSystem/GUI/HealthBar.png");
        game.load.image("ATBBar","JS/imgs/BattleSystem/GUI/ATB.png");
        game.load.image("ManaBar","JS/imgs/BattleSystem/GUI/ManaBar.png");
        game.load.image("gordonSprite","JS/imgs/BattleSystem/GUI/GordonBattleSprite.png");
        game.load.spritesheet('buttonSheet',"JS/imgs/BattleSystem/GUI/ButtonSheet.png",64,64);
        game.load.spritesheet('slashAttack',"JS/imgs/BattleSystem/Animations/slashAnimation.png",240,256);
        game.load.spritesheet('fireSpell',"JS/imgs/BattleSystem/Animations/FireSpellEffect.png",64,64);
        game.load.spritesheet('iceSpell',"JS/imgs/BattleSystem/Animations/IceSpellEffect.png",256,256);
        game.load.spritesheet("HasteAnim","JS/imgs/BattleSystem/Animations/HasteAnimation.png",117,122);
        game.load.spritesheet("CureSpell","JS/imgs/BattleSystem/Animations/CureSpellEffect.png",64,64);
        
        //Load Title screen Images
        game.load.image("Logo","JS/imgs/TitleScreen/GordonYasmarLogo.png");
        game.load.image("Yasmar","JS/imgs/TitleScreen/YasmarNESColors.png");
        game.load.image("titleBG","JS/imgs/TitleScreen/background.png");
        game.load.spritesheet("titleButtons", "JS/imgs/TitleScreen/titleButtons.png", 150, 14, 4);
        
        //Load Level Up Screen Images
        game.load.image("levelUpBG","JS/imgs/LvlUp/Level_Up_Gordon.png");
        game.load.spritesheet("add_bttn", "JS/imgs/LvlUp/Level_Up_Buttons.png", 25, 25, 2);
        
        //Load Inventory Screen Images
        game.load.image("InventoryBG","JS/imgs/Inventory/inventory_bg.png");
        game.load.spritesheet("exit", "JS/imgs/Inventory/inventory_exit_button.png", 100, 100, 2);
        game.load.spritesheet("InventoryButtons", "JS/imgs/Inventory/inventory_buttons.png", 248, 62, 4);
        game.load.spritesheet("InventoryIcons","JS/imgs/Inventory/Icons.png",32,32);
    }
    this.create=function(){
        
        battleMusic = game.add.audio("battleTheme");
        bossBattleMusic = game.add.audio("bossBattleTheme");
        overWorldMusic = game.add.audio("overWorldTheme");
        gameOverMusic = game.add.audio("gameOverTheme");
        titleMusic = game.add.audio("titleTheme");
        titleMusic.onDecoded.add(start,this);
        
    }
    function start(){
        game.state.clearCurrentState(game.state.start("title"));   
    }
}
var overworld = function(){
    var interactWithBoss = false;
    var interactWithChest = false;
    var iKey;
    var actionKey;
    
    this.preload=function(){
      
        
    };
    this.create=function(){
        overWorldMusic.loopFull();
        
        iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
        iKey.onDown.add(startInventory, this);
        
        actionKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        actionKey.onDown.add(function(){
            if(interactWithChest)treasurechest.openChest();
            if(interactWithBoss){
                overWorldMusic.stop();
           game.state.clearCurrentState(game.state.start("bossBattle")); 
            }
        });
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();
        
        level=game.add.tilemap();
        level.addTilesetImage('floorTile');
        layer = level.create('layer',64,64,32,32);
        layer.resizeWorld();
        level.setCollision(1);
        if(Dungeon.map == null){
            player.placedOnMap=false;
            boss.placedOnMap=false;
            Dungeon.Generate();
            treasurechest.placedOnMap=false
        }
        Dungeon.DrawDungeon();
        if((floor+2)%3==0)boss.sprite=game.add.sprite(0,0,'rahman');
        if((floor+1)%3==0)boss.sprite=game.add.sprite(0,0,'hFigure');
        if((floor)%3==0)boss.sprite=game.add.sprite(0,0,'toille');
        treasurechest.sprite = game.add.sprite(0,0,"treasureChest",treasurechest.frame);
        treasurechest.sprite.anchor.set(.5);
        boss.sprite.anchor.set(.5);
        player.draw();
        
        game.physics.enable(player.sprite,Phaser.Physics.ARCADE);
        player.sprite.body.setSize(25,25,0,0);
        player.sprite.collideWorldBounds=true;
        game.camera.follow(player.sprite);
        
        game.world.setBounds(0,0,Dungeon.mapSize*32*game.camera.scale.x,Dungeon.mapSize*32*game.camera.scale.y);
        player.sprite.smoothed = false;
        player.stepsToEncounter=GetRandom(100,1000);
        player.placePlayer();
        
        
        boss.placeInRoom();
        treasurechest.fillChest();
        treasurechest.placeInRoom();
    };
    this.update=function(){
        interactWithBoss=false;
        interactWithChest=false;
        game.physics.arcade.collide(player.sprite,layer);
        game.physics.arcade.collide(player.sprite,boss.sprite,BossCollisionHandler,null,this);
        game.physics.arcade.collide(player.sprite,treasurechest.sprite,ChestCollisionHandler,null,this);
        player.update();
        if(player.stepsToEncounter<0){
            overWorldMusic.stop();
           game.state.clearCurrentState(game.state.start("battle")); 
        }
    };
    this.render=function(){};
    function BossCollisionHandler(obj1,obj2){
        interactWithBoss=true;
    }
    function ChestCollisionHandler(obj1,obj2){
        interactWithChest=true;
    }
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
    var statBox;
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
    var background;
    var music;
    this.preload=function(){
        
       
        
        
    };
    this.create=function(){
        
        battleMusic.loopFull();
        background = game.add.sprite(0,0,"battleBackground");
        background.tint = 0xdddddd;
        background.width=800;
        background.height=600;
        dialogueBox = game.add.sprite(20,10,"DialogueBox");
        statBox=game.add.sprite(537,454,'statBox');
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
        
        //a random number used to determine which enemy will appear
        var enemyNumber=GetRandom(0,100);
        
        if(floor > 1){
            if(enemyNumber < 50){
                enemy = new Heinz();
            }
            else{
                enemy = new Poultrygeist();
            }
        }
        else if(floor>2){
            if(enemyNumber<33){
                enemy = new Cuclumberjack();
            }
            else if(enemyNumber<66){
                enemy = new Poultrygeist();
            }
            else enemy=new Heinz();
        }else enemy=new Heinz();
        
        enemy.obj.sprite.anchor.set(.5);
        enemy.obj.sprite.x = 500;
        enemy.obj.sprite.y=350;
        gordonBattle.sprite = game.add.sprite(25,425,'gordonSprite');
    
        
        
        buttons.attackButton = game.add.button(-1000,-1000,'buttonSheet',attackButton,this,16,15,17);
        buttons.fireButton = game.add.button(-1000,-1000,'buttonSheet',fireSpellButton,this,4,3,5);
        buttons.healButton = game.add.button(-1000,-1000,'buttonSheet',cureSpellButton,this,1,0,2);
        buttons.iceButton = game.add.button(-1000,-1000,'buttonSheet',iceSpellButton,this,7,6,8);
        buttons.hasteButton = game.add.button(-1000,-1000,'buttonSheet',hasteSpellButton,this,10,9,11);
        buttons.runButton = game.add.button(-1000,-1000,'buttonSheet',runButton,this,13,12,14);
        
        dialogueText=game.add.text(0,0,"A "+enemy.obj.name+ " has appeared!",{fill:"#eee",boundsAlignH:"center",boundsAlignV:"middle"});
       
        //dialogueBox.addChild(dialogueText);
         dialogueText.setTextBounds(dialogueBox.x,dialogueBox.y,dialogueBox.width,dialogueBox.height);
        dialogueBoxLifeSpan = 300;
    };
    
    /////Call back functions for the buttons
    function attackButton(){
        if(animationInProgress===false){
            attackAnimation = game.add.sprite(enemy.obj.sprite.x,enemy.obj.sprite.y,'slashAttack',5);
            attackAnimation.anchor.set(.5);
            animationInProgress=true;
             attackAnimation.position.x=enemy.obj.sprite.x;
                attackAnimation.position.y=enemy.obj.sprite.y;
            BattleAnim = attackAnimation.animations.add('slash',null,10);
            BattleAnim.play();
            gordonBattle.ATBTimer=0;
            dialogueText.text="Gordon Attacks!";
            dialogueBoxLifeSpan = 300;
            BattleAnim.onComplete.add(function(){
                
                var dmg = Math.floor(((2*gordonBattle.level+10)/100)*(gordonBattle.str/enemy.obj.def)*gordonBattle.baseAtk+GetRandom(2,8));
                var critRoll = GetRandom(0,100);
                if(critRoll < gordonBattle.dex)dmg*=2;
                    enemy.obj.hp-=dmg;
                    //damageText.text=dmg;
                    dialogueText.text=enemy.obj.name+" took "+dmg+" damage!";
                    animationInProgress=false;
                   
                });
        }
    }
    function runButton(){
        if(animationInProgress==false){
            var chances = GetRandom(0,100);
            if (chances < gordonBattle.eva*3){
                dialogueText.text = "Gordon ran away!";
                dialogueBoxLifeSpan=300;
                gordonBattle.ATBTimer=0;
                game.state.clearCurrentState(game.state.start("overworld"));
            }
            else{
                dialogueText.text = "Gordon couldn't escape!";
                dialogueBoxLifeSpan=300;
                gordonBattle.ATBTimer=0;
            }
        }
    }
    function iceSpellButton(){
       
            if(animationInProgress===false){
                if(!gordonBattle.mpCharge){
                dialogueText.text="Gordon cast Ice!";
                dialogueBoxLifeSpan = 300;
                gordonBattle.mp-= gordonBattle.maxMP*.2;
                attackAnimation = game.add.sprite(enemy.obj.sprite.x,enemy.obj.sprite.y,'iceSpell',18);
                attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(.75);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                attackAnimation.position.x=enemy.obj.sprite.x;
                attackAnimation.position.y=enemy.obj.sprite.y;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                        var dmg = Math.floor(((2*gordonBattle.level+10)/100)*(gordonBattle.int/enemy.obj.def)*150+GetRandom(2,8));
                    var critRoll = GetRandom(0,100);
                if(critRoll < gordonBattle.dex)dmg*=2;
                        enemy.obj.state.slow=1200;
                        enemy.obj.hp-=dmg;
                        //damageText.text=dmg;
                        dialogueText.text=enemy.obj.name+" took "+dmg+" damage!";
                        animationInProgress=false;

                    });
            }
            }
    }
    function fireSpellButton(){
        
            if(animationInProgress===false){
                if(!gordonBattle.mpCharge){
                dialogueText.text="Gordon cast Fire!";
                dialogueBoxLifeSpan = 300;
                gordonBattle.mp-= gordonBattle.maxMP*.2;
                attackAnimation = game.add.sprite(enemy.obj.sprite.x,enemy.obj.sprite.y,'fireSpell',11);
                attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;
             attackAnimation.position.x=enemy.obj.sprite.x;
                attackAnimation.position.y=enemy.obj.sprite.y;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                        var dmg = Math.floor(((2*gordonBattle.level+10)/100)*(gordonBattle.int/enemy.obj.def)*200+GetRandom(2,8));
                    var critRoll = GetRandom(0,100);
                if(critRoll < gordonBattle.dex)dmg*=2;
                        enemy.obj.hp-=dmg;
                        //damageText.text=dmg;
                        dialogueText.text=enemy.obj.name+" took "+dmg+" damage!";
                        animationInProgress=false;

                    });
            }
            }
    }
    function hasteSpellButton(){
       
            if(animationInProgress===false){
                if(!gordonBattle.mpCharge){
                dialogueText.text="Gordon cast Haste!";
                dialogueBoxLifeSpan = 300;
                gordonBattle.mp-= gordonBattle.maxMP*.2;
                attackAnimation = game.add.sprite(gordonBattle.sprite.position.x,gordonBattle.sprite.position.y,'HasteAnim');
               // attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                BattleAnim = attackAnimation.animations.add('slash',null);
                BattleAnim.play('slash',10,false,true);
                gordonBattle.state.haste=1000;
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                       
                        
                        animationInProgress=false;

                    });
            }
            }
       
    }
    function cureSpellButton(){
            if(animationInProgress===false){
                if(!gordonBattle.mpCharge){
                    dialogueText.text="Gordon cast Cure!";
                    dialogueBoxLifeSpan = 300;
                    gordonBattle.mp-= gordonBattle.maxMP*.5;
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
            }
    }
    
    this.update=function(){
        dialogueBoxLifeSpan--;
        if(dialogueBoxLifeSpan<0){
            dialogueBox.visible=false;
            dialogueText.visible=false;
        }else{
            dialogueBox.visible=true;
            dialogueText.visible=true;
        }
        if(gordonBattle.ATBTimer>=gordonBattle.maxATB){
            revealButtons();
        }else{
            hideButtons();
        }
        
       
        healthBar.crop(healthCrop);
        manaBar.crop(manaCrop);
        manaCrop.width = (gordonBattle.mp/gordonBattle.maxMP)*188;
        gordonBattle.update();
        healthCrop.width = (gordonBattle.hp/gordonBattle.maxHP)*188;
        ATBBar.crop(ATBCrop);
        ATBCrop.width = (gordonBattle.ATBTimer/gordonBattle.maxATB)*188;
        enemy.obj.update();
         if(gordonBattle.hp<=0){
            bossBattleMusic.stop();
            game.state.clearCurrentState(game.state.start("gameover"));
        }
        if(enemy.obj.hp<=0){
            battleMusic.stop();
            animationInProgress=false;
            gordonBattle.ATBTimer=0;
            gordonBattle.state.haste=0;
            gordonBattle.state.slow=0;
            gordonBattle.xp+=enemy.obj.xpGiven;
            if(gordonBattle.xp>gordonBattle.maxXP){
                gordonBattle.xp = 0;
                game.state.clearCurrentState(game.state.start("lvlup"));
            }else {
                game.state.clearCurrentState(game.state.start("overworld"));
            }
        }
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
var bossBattle = function(){
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
    
    var statBox;
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
    var background;
    var music;
    
    this.preload=function(){
        
       
        
        
    };
    this.create=function(){
        bossBattleMusic.loopFull();
        background = game.add.sprite(0,0,"battleBackground");
        background.tint = 0xdddddd;
        background.width=800;
        background.height=600;
        dialogueBox = game.add.sprite(20,10,"DialogueBox");
        statBox=game.add.sprite(537,454,'statBox');
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
        
        if((floor+2)%3==0){
            enemy = new Rahman();
            enemy.obj.sprite.anchor.set(.5);
            enemy.obj.sprite.position.x = 430;
            enemy.obj.sprite.position.y=340;
        }
        if((floor+1)%3==0){
            enemy = new hoodedFigure();
             enemy.obj.sprite.position.x = 470;
            enemy.obj.sprite.position.y=340;
        }
        if((floor)%3==0){
            enemy = new masterToille();
              enemy.obj.sprite.position.x = 470;
            enemy.obj.sprite.position.y=340;
        }
        enemy.obj.sprite.anchor.set(.5);
       // enemy.obj.sprite.x = 500;
        //enemy.obj.sprite.y=340;
        gordonBattle.sprite = game.add.sprite(25,425,'gordonSprite');
    
        
        
        buttons.attackButton = game.add.button(-1000,-1000,'buttonSheet',attackButton,this,16,15,17);
        buttons.fireButton = game.add.button(-1000,-1000,'buttonSheet',fireSpellButton,this,4,3,5);
        buttons.healButton = game.add.button(-1000,-1000,'buttonSheet',cureSpellButton,this,1,0,2);
        buttons.iceButton = game.add.button(-1000,-1000,'buttonSheet',iceSpellButton,this,7,6,8);
        buttons.hasteButton = game.add.button(-1000,-1000,'buttonSheet',hasteSpellButton,this,10,9,11);
        buttons.runButton = game.add.button(-1000,-1000,'buttonSheet',runButton,this,13,12,14);
        
        dialogueText=game.add.text(0,0,"Gordon has challenged "+enemy.obj.name+ "!",{fill:"#eee",boundsAlignH:"center",boundsAlignV:"middle"});
       
        //dialogueBox.addChild(dialogueText);
         dialogueText.setTextBounds(dialogueBox.x,dialogueBox.y,dialogueBox.width,dialogueBox.height);
        dialogueBoxLifeSpan = 300;
    };
    
    /////Call back functions for the buttons
    function attackButton(){
        if(animationInProgress===false){
            attackAnimation = game.add.sprite(enemy.obj.sprite.x,enemy.obj.sprite.y,'slashAttack',5);
            attackAnimation.anchor.set(.5);
            animationInProgress=true;
             attackAnimation.position.x=enemy.obj.sprite.x;
                attackAnimation.position.y=enemy.obj.sprite.y;
            BattleAnim = attackAnimation.animations.add('slash',null,10);
            BattleAnim.play();
            gordonBattle.ATBTimer=0;
            dialogueText.text="Gordon Attacks!";
            dialogueBoxLifeSpan = 300;
            BattleAnim.onComplete.add(function(){
                    var dmg = Math.floor(((2*gordonBattle.level+10)/100)*(gordonBattle.str/enemy.obj.def)*gordonBattle.baseAtk+GetRandom(2,8));
                var critRoll = GetRandom(0,100);
                if(critRoll < gordonBattle.dex)dmg*=2;
                    enemy.obj.hp-=dmg;
                    //damageText.text=dmg;
                    dialogueText.text=enemy.obj.name+" took "+dmg+" damage!";
                    animationInProgress=false;
                   
                });
        }
    }
    function runButton(){
          
                dialogueText.text = "Gordon can't run from this!";
                dialogueBoxLifeSpan=300;
        
    }
    function iceSpellButton(){
       
            if(animationInProgress===false){
                if(!gordonBattle.mpCharge){
                dialogueText.text="Gordon cast Ice!";
                dialogueBoxLifeSpan = 300;
                gordonBattle.mp-= gordonBattle.maxMP*.2;
                attackAnimation = game.add.sprite(enemy.obj.sprite.x,enemy.obj.sprite.y,'iceSpell',18);
                attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(.75);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                attackAnimation.position.x=enemy.obj.sprite.x;
                attackAnimation.position.y=enemy.obj.sprite.y;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                        var dmg = Math.floor(((2*gordonBattle.level+10)/100)*(gordonBattle.int/enemy.obj.def)*150+GetRandom(2,8));
                    var critRoll = GetRandom(0,100);
                if(critRoll < gordonBattle.dex)dmg*=2;
                        enemy.obj.state.slow=1200;
                        enemy.obj.hp-=dmg;
                        //damageText.text=dmg;
                        dialogueText.text=enemy.obj.name+" took "+dmg+" damage!";
                        animationInProgress=false;

                    });
            }
            }
    }
    function fireSpellButton(){
        
            if(animationInProgress===false){
                if(!gordonBattle.mpCharge){
                dialogueText.text="Gordon cast Fire!";
                dialogueBoxLifeSpan = 300;
                gordonBattle.mp-= gordonBattle.maxMP*.2;
                attackAnimation = game.add.sprite(enemy.obj.sprite.x,enemy.obj.sprite.y,'fireSpell',11);
                attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;
             attackAnimation.position.x=enemy.obj.sprite.x;
                attackAnimation.position.y=enemy.obj.sprite.y;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                        var dmg = Math.floor(((2*gordonBattle.level+10)/100)*(gordonBattle.int/enemy.obj.def)*200+GetRandom(2,8));
                    var critRoll = GetRandom(0,100);
                if(critRoll < gordonBattle.dex)dmg*=2;
                        enemy.obj.hp-=dmg;
                        //damageText.text=dmg;
                        dialogueText.text=enemy.obj.name+" took "+dmg+" damage!";
                        animationInProgress=false;

                    });
            }
            }
    }
    function hasteSpellButton(){
       
            if(animationInProgress===false){
                if(!gordonBattle.mpCharge){
                dialogueText.text="Gordon cast Haste!";
                dialogueBoxLifeSpan = 300;
                gordonBattle.mp-= gordonBattle.maxMP*.2;
                attackAnimation = game.add.sprite(gordonBattle.sprite.position.x,gordonBattle.sprite.position.y,'HasteAnim');
               // attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                BattleAnim = attackAnimation.animations.add('slash',null);
                BattleAnim.play('slash',10,false,true);
                gordonBattle.state.haste=1000;
                gordonBattle.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                       
                        
                        animationInProgress=false;

                    });
            }
            }
       
    }
    function cureSpellButton(){
            if(animationInProgress===false){
                if(!gordonBattle.mpCharge){
                    dialogueText.text="Gordon cast Cure!";
                    dialogueBoxLifeSpan = 300;
                    gordonBattle.mp-= gordonBattle.maxMP*.5;
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
            }
    }
    
    this.update=function(){
        dialogueBoxLifeSpan--;
        if(dialogueBoxLifeSpan<0){
            dialogueBox.visible=false;
            dialogueText.visible=false;
        }else{
            dialogueBox.visible=true;
            dialogueText.visible=true;
        }
        if(gordonBattle.ATBTimer>=gordonBattle.maxATB){
            revealButtons();
        }else{
            hideButtons();
        }
        
       
        healthBar.crop(healthCrop);
        manaBar.crop(manaCrop);
        manaCrop.width = (gordonBattle.mp/gordonBattle.maxMP)*188;
        gordonBattle.update();
        healthCrop.width = (gordonBattle.hp/gordonBattle.maxHP)*188;
        ATBBar.crop(ATBCrop);
        ATBCrop.width = (gordonBattle.ATBTimer/gordonBattle.maxATB)*188;
        enemy.obj.update();
        if(gordonBattle.hp<=0){
            bossBattleMusic.stop();
            game.state.clearCurrentState(game.state.start("gameover"));
        }
        if(enemy.obj.hp<=0){
            bossBattleMusic.stop();
            animationInProgress=false;
            gordonBattle.ATBTimer=0;
            gordonBattle.state.haste=0;
            gordonBattle.state.slow=0;
            gordonBattle.xp+=enemy.obj.xpGiven;
            floor++;
            Dungeon.map=null;
            if(gordonBattle.xp>gordonBattle.maxXP){
                gordonBattle.xp = 0;
                game.state.clearCurrentState(game.state.start("lvlup"));
            }else {
                game.state.clearCurrentState(game.state.start("overworld"));
            }
        }
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
    //setup content objects
    var logo;
    var yasmar;
    var bg;
    var buttonNG;
    var buttonLG;
    
    //load content
    this.preload=function(){
       
    };
    
    //create the starting frame of the gamestate
    this.create=function(){
        titleMusic.loopFull();
        game.stage.backgroundColor = "#eeeeee";
        bg = game.add.sprite(0,0,"titleBG");
        logo = game.add.sprite(0,0,"Logo");
        yasmar = game.add.sprite(300,0,"Yasmar");
        buttonNG = game.add.button(50, 450, "titleButtons", StartNG, this, 1, 0, 1, 1);
        buttonLG = game.add.button(50, 470, "titleButtons", Load, this, 3, 2, 3, 3);
        logo.scale.setTo(.5,.5);
        bg.scale.setTo(.75, .75);

    };
    //update the gamestate
    this.update=function(){
        
    };
    //additional renders
    this.render=function(){
    
    };
};

//game state that is called when the player levels up after a battle
var lvlup = function(){
    //setup content objects
    var bg;
    var style;
    var style2;
    var points;
    var vit;
    var mag;
    var str;
    var def;
    var int;
    var dex;
    var eva;
    var spd;
    var vit_bttn;
    var mag_bttn;
    var str_bttn;
    var def_bttn;
    var int_bttn;
    var dex_bttn;
    var eva_bttn;
    var spd_bttn;
    
    //load content
    this.preload=function(){
        
    };
    
    //create the starting frame of the gamestate
    this.create=function(){
        game.stage.backgroundColor = "#eeeeee";
        
        style = { font: "25px Nyala", fill: "#000", align: "right" };
        style2 = { font: "35px Nyala", fill: "#111243", align: "right" };
        
        points = 5;       
        
    };
    //update the gamestate 
    this.update=function(){      
        
        bg = game.add.sprite(0,0,"levelUpBG");
        bg.scale.setTo(.65, .65);
        
        vit = game.add.text(700, 196, gordonBattle.vit, style);
        mag = game.add.text(700, 225, gordonBattle.mag, style);
        str = game.add.text(700, 252, gordonBattle.str, style);
        def = game.add.text(700, 282, gordonBattle.def, style);
        int = game.add.text(700, 310, gordonBattle.int, style);
        dex = game.add.text(700, 335, gordonBattle.dex, style);
        eva = game.add.text(700, 360, gordonBattle.eva, style);
        spd = game.add.text(700, 390, gordonBattle.spd, style);
        
        vit_bttn = game.add.button(750,199, "add_bttn", addVit, this, 1, 0, 1, 0);
        vit_bttn.scale.setTo(.8, .8);
        mag_bttn = game.add.button(750,228, "add_bttn", addMag, this, 1, 0, 1, 0);
        mag_bttn.scale.setTo(.8, .8);
        str_bttn = game.add.button(750,256, "add_bttn", addStr, this, 1, 0, 1, 0);
        str_bttn.scale.setTo(.8, .8);
        def_bttn = game.add.button(750,286, "add_bttn", addDef, this, 1, 0, 1, 0);
        def_bttn.scale.setTo(.8, .8);
        int_bttn = game.add.button(750,314, "add_bttn", addInt, this, 1, 0, 1, 0);
        int_bttn.scale.setTo(.8, .8);
        dex_bttn = game.add.button(750,339, "add_bttn", addDex, this, 1, 0, 1, 0);
        dex_bttn.scale.setTo(.8, .8);
        eva_bttn = game.add.button(750,364, "add_bttn", addEva, this, 1, 0, 1, 0);
        eva_bttn.scale.setTo(.8, .8);
        spd_bttn = game.add.button(750,394, "add_bttn", addSpd, this, 1, 0, 1, 0);
        spd_bttn.scale.setTo(.8, .8);
        
        pointsText = game.add.text(630, 470, points, style2);
        
        if (points <= 0){
            gordonBattle.level++;
            if(gordonBattle.level>1)gordonBattle.hasLearned.heal=1;
            if(gordonBattle.level>3)gordonBattle.hasLearned.fire=1;
            if(gordonBattle.level>5)gordonBattle.hasLearned.blizzard=1;
            if(gordonBattle.level>9)gordonBattle.hasLearned.haste=1;
            gordonBattle.maxXP=(gordonBattle.level+300*Math.pow(2,gordonBattle.level/2))/4;
            game.state.clearCurrentState(game.state.start("overworld"));
        }
    };
    //additional renders
    this.render=function(){
    };
    
    function addVit(){
        gordonBattle.vit ++;
        points --;
    }
    function addMag(){
        gordonBattle.mag ++;
        points --;
    }
    function addStr(){
        gordonBattle.str ++;
        points --;
    }
    function addDef(){
        gordonBattle.def ++;
        points --;
    }
    function addInt(){
        gordonBattle.int ++;
        points --;
    }
    function addDex(){
        gordonBattle.dex ++;
        points --;
    }
    function addEva(){
        gordonBattle.eva ++;
        points --;
    }
    function addSpd(){
        gordonBattle.spd ++;
        points --;
    }
};

//Called when the game is ended, a gate back to the start screen
var gameover = function(){
    //setup content objects
    var bg;
    var buttonStart;
    
    //load content
    this.preload=function(){
        
    };
    
    //create the starting frame of the gamestate
    this.create=function(){
        gameOverMusic.loopFull();
        game.stage.backgroundColor = "#eeeeee";
        bg = game.add.sprite(0,0,"gameOverBG");
        buttonStart = game.add.button(250, 450, "gameOverButtons", StartTitle, this, 1, 0, 2, 1);
        bg.scale.setTo(.65, .65); 
    };
    this.update=function(){
        
    };
    this.render=function(){
        
    };
};

//inventory display
var inventory = function(){
    //setup content objects
    var bg;
    var counterText;
    var style;
    var exitBttn;
    var equipBttn;
    var dropBttn;
    var x;
    var y;
    var nameText;
    var vitText;
    var magText;
    var strText;
    var defText;
    var intText;
    var dexText;
    var evaText;
    var spdText;
    
    //load content
    this.preload=function(){
        
    };
    
    //create the starting frame of the gamestate
    this.create=function(){
        game.stage.backgroundColor = "#eeeeee";
        bg = game.add.sprite(0,0,"InventoryBG");
        bg.width = 800;
        bg.height = 600;
        exitBttn = game.add.button(20, 20, "exit", function(){game.state.clearCurrentState(game.state.start("overworld"));}, this, 0, 0, 1, 1);
        exitBttn.scale.setTo(.3, .3);
        equipBttn = game.add.button(430, 540, "InventoryButtons", equipItem, this, 2, 2, 3, 3);
        equipBttn.scale.setTo(.6, .6);
        dropBttn = game.add.button(605, 540, "InventoryButtons", dropItem, this, 0, 0, 1, 1);
        dropBttn.scale.setTo(.6, .6);
        
        style = { font: "30px Nyala", fill: "#000", align: "right" };
        
        nameText = game.add.text(50, 425, "Name:", style);
        vitText = game.add.text(50, 460, "Vit: ", style);
        magText = game.add.text(50, 490, "Mag: ", style);
        strText = game.add.text(50, 520, "Str: ", style);
        defText = game.add.text(50, 550, "Def: ", style);
        intText = game.add.text(200, 460, "Int: ", style);
        dexText = game.add.text(200, 490, "Dex: ", style);
        evaText = game.add.text(200, 520, "Eva: ", style);
        spdText = game.add.text(200, 550, "Spd: ", style);
        updateInventory();
        counterText = game.add.text(330, 543, gordonBattle.inventory.length + "/25", style);
    };
    this.update=function(){
        for (inventoryItemSlot = gordonBattle.inventory.length-1; inventoryItemSlot >= 0; inventoryItemSlot--){
            
            gordonBattle.inventory[inventoryItemSlot].inventorySlot=inventoryItemSlot;
            if(gordonBattle.inventory[inventoryItemSlot].isEquipped){
                gordonBattle.inventory[inventoryItemSlot].button.tint = 0x00FFFF;  
            }else  gordonBattle.inventory[inventoryItemSlot].button.tint = 0xFFFFFF;  
            gordonBattle.inventory[inventoryItemSlot].button.onInputDown.add(function(){
                for (inventoryItemSlot = gordonBattle.inventory.length-1; inventoryItemSlot >= 0; inventoryItemSlot--){
                   if(gordonBattle.inventory[inventoryItemSlot].button.frame>5){
                       
                       inventoryHandle=gordonBattle.inventory[inventoryItemSlot].inventorySlot;
                   }
            }});
        }
        //count how many items are in the invenory (should never be over 25)
        counterText.text = gordonBattle.inventory.length +"/25";
        if(inventoryHandle>-1){
            if(gordonBattle.inventory[inventoryHandle]!=undefined){
                
            //draw out the stats for the item in question
                nameText.text=gordonBattle.inventory[inventoryHandle].name;
                vitText.text="Vit:"+ /*gordonBattle.base_vit +*/ "+" + gordonBattle.inventory[inventoryHandle].Addvit;
                magText.text="Mag:"+ /*gordonBattle.base_mag +*/ "+" + gordonBattle.inventory[inventoryHandle].Addmag;
                strText.text="Str:"+ /*gordonBattle.base_str +*/ "+" + gordonBattle.inventory[inventoryHandle].Addstr;
                defText.text="Def:"+ /*gordonBattle.base_def +*/ "+" + gordonBattle.inventory[inventoryHandle].Adddef;
                intText.text="Int:"+ /*gordonBattle.base_int +*/ "+" + gordonBattle.inventory[inventoryHandle].Addint;
                dexText.text="Dex:"+ /*gordonBattle.base_dex +*/ "+" + gordonBattle.inventory[inventoryHandle].Adddex;
                evaText.text="Eva:"+ /*gordonBattle.base_eva +*/ "+" + gordonBattle.inventory[inventoryHandle].Addeva;
                spdText.text="Spd:"+ /*gordonBattle.base_spd +*/ "+" + gordonBattle.inventory[inventoryHandle].Addspd;

                gordonBattle.inventory[inventoryHandle].button.tint=0xccccee;
            }
        }
        else{
         nameText.text="";
            vitText.text="Vit:";
            magText.text="Mag:";
            strText.text="Str:";
            defText.text="Def:";
            intText.text="Int:";
            dexText.text="Dex:";
            evaText.text="Eva:";
            spdText.text="Spd:";   
        }
    };
    this.render=function(){
        
    };
    function updateInventory(){
        x = 320;
        y = 90;
        for (var i = gordonBattle.inventory.length-1; i >= 0; i--){
            var ibutton;
            
            gordonBattle.inventory[i].inventorySlot=i;
            //draw a rectangle
            gordonBattle.inventory[i].button = game.add.button(x,y,'InventoryIcons',null,this,gordonBattle.inventory[i].sprite,gordonBattle.inventory[i].sprite,gordonBattle.inventory[i].sprite+6);
            gordonBattle.inventory[i].button.scale.setTo(2);
            gordonBattle.inventory[i].button.smoothed=false;
            //iterate where the next rectangle gets drawn
            x += 90;
            if (x >= 750){
                x = 320;
                y += 80;
            }  
        }
    }
}

//add states and start first state
game.state.add("overworld", overworld);
game.state.add("title", title);
game.state.add("battle",battle);
game.state.add("bossBattle",bossBattle);
game.state.add("lvlup",lvlup);
game.state.add("gameover",gameover);
game.state.add("loadMusic",loadMusic);
game.state.add("inventory", inventory);
game.state.start("loadMusic");

/*
*CLASSES
*/
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
            Dungeon.map[x]=[];
            for(var y = 0; y<this.mapSize-1;y++){
                Dungeon.map[x][y] = 1;
                //level.putTile(1,x,y,layer);
            }
        }

        var roomCount = 10;
        var minSize = 5;
        var maxSize = 10;

        //create rooms and put them into the rooms array
        for(var i = 0;i<roomCount;i++){
            var room = {};

            room.x = GetRandom(1, this.mapSize-maxSize-1);
            room.y = GetRandom(1, this.mapSize-maxSize-1);
            room.w = GetRandom(minSize,maxSize);
            room.h = GetRandom(minSize,maxSize);

            /*if(this.RoomsCollide(room)){
                i--;
                continue;
            }*/
            room.w--;
            room.h--;

            this.rooms.push(room);
        }

        //place the rooms on the map
        for(i=0; i<roomCount;i++){
            var room=this.rooms[i];
            for(var x=room.x;x<room.x+room.w;x++){
                for(var y=room.y;y<room.y+room.h;y++){
                    Dungeon.map[x][y] = 0;
                    //level.putTile(0,x,y,layer);

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
                Dungeon.map[pointB.x][pointB.y] = 0;
                //level.putTile(0,pointB.x,pointB.y,layer);

            }
            while((pointB.y!=pointA.y)){
                if(pointB.y>pointA.y)pointB.y--;
                else if(pointB.y<pointA.y) pointB.y++;
                else return;
                Dungeon.map[pointB.x][pointB.y] = 0;
                //level.putTile(0,pointB.x,pointB.y,layer);

            }
        }
        for(var j=0;j<roomCount;j++){
            var roomA = this.rooms[j];
            var roomB = this.FindFarthestRoom(roomA);

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
                Dungeon.map[pointB.x][pointB.y] = 0;
                //level.putTile(0,pointB.x,pointB.y,layer);

            }
            while((pointB.y!=pointA.y)){
                if(pointB.y>pointA.y)pointB.y--;
                else if(pointB.y<pointA.y) pointB.y++;
                else return;
                Dungeon.map[pointB.x][pointB.y] = 0;
                //level.putTile(0,pointB.x,pointB.y,layer);

            }
        }
        
    },
    DrawDungeon:function(){
        for(var x=0;x<Dungeon.map.length;x++){
            for(var y=0;y<Dungeon.map.length;y++){
                level.putTile(Dungeon.map[x][y],x,y,layer);
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
            y:room.y+(room.h/2)
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
    FindFarthestRoom:function(room){
        var roomCenter = {
            x:room.x+(room.w/2),
            y:room.y+(room.h/2)
        };
        var closest = null;
        var closest_distance = 0;
        for(var i = 0; i<this.rooms.length;i++){
            var check = this.rooms[i];
            if(check == room)continue;
            var checkCenter = {
                x:check.x+(check.w/2),
                y:check.h+(check.h/2)
            };
            var distance = ((roomCenter.x - checkCenter.x)*(roomCenter.x - checkCenter.x)) * ((roomCenter.y - checkCenter.y)*(roomCenter.y - checkCenter.y));
            
            if (distance > closest_distance) {
                closest_distance = distance;
                closest = check;
            }
        }
        return closest;
    }
    
    
}
function PlayerOW(){
    this.playerWalkUp;
    this.playerWalkDown;
    this.playerWalkLeft;
    this.playerWalkRight;
    this.stepsToEncounter=100;
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
               // player.collideWorldBounds=true;
            }
        }
    }
    this.draw=function(){
        this.sprite = game.add.sprite(this.x,this.y,'gordonOW',1);
        this.sprite.anchor.x=.5;
        this.sprite.anchor.y=.5;
        this.playerWalkDown=this.sprite.animations.add('walkDown',[0,1,2,1],5,true);
        this.playerWalkUp=this.sprite.animations.add('walkUp',[3,4,5,4],5,true);
        this.playerWalkRight=this.sprite.animations.add('walkRight',[6,7,8,7],5,true);
        this.playerWalkLeft=this.sprite.animations.add('walkLeft',[9,10,11,10],5,true);

    }
    this.update=function(){
        
        this.x=this.sprite.position.x;
        this.y=this.sprite.position.y;
        this.sprite.body.velocity.set(0);
        if(cursors.up.isDown){
            this.sprite.body.velocity.y = -200;
            this.stepsToEncounter--;
            this.sprite.play('walkUp');
        }
       if(cursors.down.isDown){
            this.sprite.body.velocity.y = 200;
            this.stepsToEncounter--;
            this.sprite.play('walkDown');
        }
       if(cursors.right.isDown){
            this.sprite.body.velocity.x = 200;
            this.stepsToEncounter--;
           this.sprite.play('walkRight');
        }
       if(cursors.left.isDown){
            this.sprite.body.velocity.x = -200;
            this.stepsToEncounter--;
           this.sprite.play('walkLeft');
        }
        
        if(this.sprite.body.velocity.x==0&&this.sprite.body.velocity.y==0){
            this.sprite.animations.stop();   
        }
    };
    
}
function BossOW(){
    this.sprite;
    this.x=0;
    this.y=0;
    this.placedOnMap= false;
    this.placeInRoom=function(){
         while(!this.placedOnMap){
            var spawnTile = level.getTile(GetRandom(1,63),GetRandom(1,64));
            
            if(spawnTile!=null && spawnTile.index==0){
                this.x=spawnTile.worldX+spawnTile.centerX;
                this.y=spawnTile.worldY+spawnTile.centerY;
                
                
                this.placedOnMap=true;
                //player.collideWorldBounds=true;
            }
         }
        this.sprite.position.x=this.x;
        this.sprite.position.y=this.y;
        game.physics.enable(this.sprite,Phaser.Physics.ARCADE);
        this.sprite.body.setSize(25,25,0,0);
        this.sprite.collideWorldBounds=true;
        this.sprite.body.immovable=true;
      
        
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
    this.maxXP=(this.level+300*Math.pow(2,this.level/2))/4;
    
    //inventory
    this.inventory = [];
    
    //equipmentSlots 0-4 (weapon, head, body, arms, legs)
    this.equipped = {
        weapon:0,
        head:0,
        body:0,
        arms:0,
        legs:0
    };
    //base stats
    this.base_vit = 5;
    this.base_mag = 5;        
    this.base_str = 5;
    this.base_def = 5;
    this.base_int = 5;
    this.base_dex = 5;
    this.base_eva = 5;
    this.base_spd = 5;

    
    
    //after stats
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
    
    this.maxMP=((120-this.mag)*160);
    this.mp = this.maxMP;
    
    this.mpCharge = false;
    /*
    *These can serve as a 1/0 boolean, or allow for increasing incrimentation
    *if desired (i.e. "fire 2" etc)
    */
    this.hasLearned = {fire:0,
                      blizzard:0,
                      heal:0,
                      haste:0,
                     };
    
    /*
    *update function requires gameloop's delta time
    *updates attack timer for the hero
    */
    this.update = function () {
        this.maxMP=((120-this.mag)*160);
        this.maxATB=((this.spd+250)/this.spd)*160;
        if(this.hp>this.maxHP)this.hp=this.maxHP;
        if(this.hp<=0)this.hp=0;
        if(this.mp<=0){
            this.mp=0;
            this.mpCharge=true;
        }
        if(this.state.slow > 0){
            this.ATBTimer +=6;
            this.state.slow--;
            
        }
        else if(this.state.haste > 0){
            this.ATBTimer +=20;
            this.state.haste--;
        }
        else this.ATBTimer += 10;
        if(this.mpCharge){
            this.mp+=10;   
        }
        if(this.mp >= this.maxMP){
            this.mp=this.maxMP;
            this.mpCharge=false;
        }
    }
    
    /*attack function*/
    this.attack = function () {
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

///The Mobs
function Heinz(){
    this.obj = new NPC();
    this.obj.name = "Heinz";
    this.obj.hp=60;
    this.obj.def=4;
    this.obj.xpGiven=40;
    this.obj.baseAtk=65;
    
    this.obj.attack = function(){
        if(animationInProgress===false){
            dialogueText.text="The heinz attacked!";
                dialogueBoxLifeSpan = 300;
            animationInProgress = true;
            attackAnimation = game.add.sprite(500,350,'slashAttack',5);
            attackAnimation.position.x=gordonBattle.sprite.position.x;
            attackAnimation.position.y=gordonBattle.sprite.position.y;
            BattleAnim = attackAnimation.animations.add('slash',null,10);
            BattleAnim.play();
            var dmg = Math.floor(((2*this.level+10)/100)*(this.str/gordonBattle.def)*this.baseAtk+2);
            var me = this;
            BattleAnim.onComplete.add(function(){
                
                gordonBattle.hp-=dmg;
                //damageText.text=dmg;
                 dialogueText.text="Gordon took "+dmg+" damage!";
                animationInProgress=false;
                me.ATBTimer=0;
            });
        }
    }
    this.obj.sprite = game.add.sprite(400,300,'heinz');
    this.obj.sprite.anchor.set(.5);
}

function Poultrygeist(){
    this.obj = new NPC();
    this.obj.name = "Poultrygeist";
    this.obj.hp=200;
    this.obj.def=8;
    this.obj.str=8;
    this.obj.xpGiven=80;
    this.obj.baseAtk=100;
    
    this.obj.attack = function(){
        var attack = GetRandom(0,100);
           if(attack<40){
            
            if(animationInProgress===false){
                dialogueText.text="The poultrygeist spit Fire!";
                dialogueBoxLifeSpan = 300;
                attackAnimation = game.add.sprite(gordonBattle.sprite.x,gordonBattle.sprite.y,'fireSpell',11);
                //attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;

                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                this.ATBTimer=0;
                var dmg = Math.floor(((2*this.level+10)/100)*(this.int/gordonBattle.def)*200+GetRandom(2,8));
                BattleAnim.onComplete.add(function(){
                        
                        gordonBattle.hp-=dmg;
                        //damageText.text=dmg;
                        dialogueText.text="Gordon took "+dmg+" damage!";
                        animationInProgress=false;

                    });
            }
            
        }
        else if(attack<100){
            if(animationInProgress===false){
                dialogueText.text="The poultrygeist attacked!";
                console.log(dialogueText.text);
                dialogueBoxLifeSpan = 300;
                animationInProgress = true;
                attackAnimation = game.add.sprite(500,350,'slashAttack',5);
                attackAnimation.position.x=gordonBattle.sprite.position.x;
                attackAnimation.position.y=gordonBattle.sprite.position.y;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                var dmg = Math.floor(((2*this.level+10)/100)*(this.str/gordonBattle.def)*this.baseAtk+2);
                var me = this;
                BattleAnim.onComplete.add(function(){

                    gordonBattle.hp-=dmg;
                    dialogueText.text="Gordon took "+dmg+" damage!";
                    animationInProgress=false;
                    me.ATBTimer=0;
                });
            }
        }
    }
    this.obj.sprite = game.add.sprite(400,300,'poultrygeist');
    this.obj.sprite.anchor.set(.5);
    this.obj.sprite.scale.set(2);
    this.obj.sprite.smoothed=false;
}

function Cuclumberjack(){
    this.obj = new NPC();
    this.obj.name = "Cuclumberjack";
    this.obj.hp=200;
    this.obj.def=12;
    this.obj.str=8;
    this.obj.dex=10;
    
    this.obj.xpGiven=80;
    this.obj.baseAtk=100;
    
    this.obj.attack = function(){
        var attack = GetRandom(0,100);
           if(attack<40){
            
             if(animationInProgress===false){
                 dialogueText.text="The cuclumber jack cast Ice!";
                dialogueBoxLifeSpan = 300;
                gordonBattle.mp-= gordonBattle.maxMP*.2;
                attackAnimation = game.add.sprite(gordonBattle.sprite.x,gordonBattle.sprite.y,'iceSpell',18);
                //attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(.75);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                //attackAnimation.position.x=enemy.obj.sprite.x;
                //attackAnimation.position.y=enemy.obj.sprite.y;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                this.ATBTimer=0;
                var dmg = Math.floor(((2*this.level+10)/100)*(this.int/gordonBattle.def)*150+GetRandom(2,8));
                BattleAnim.onComplete.add(function(){
                        
                        gordonBattle.state.slow=1200;
                        gordonBattle.hp-=dmg;
                        //damageText.text=dmg;
                    dialogueText.text="Gordon took "+dmg+" damage!";

                        animationInProgress=false;

                    });
            }
            
        }
        else if(attack<100){
            if(animationInProgress===false){
                dialogueText.text="The cuclumberjack attacked!";
                console.log(dialogueText.text);
                dialogueBoxLifeSpan = 300;
                animationInProgress = true;
                attackAnimation = game.add.sprite(500,350,'slashAttack',5);
                attackAnimation.position.x=gordonBattle.sprite.position.x;
                attackAnimation.position.y=gordonBattle.sprite.position.y;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                var critRoll = GetRandom(0,100)
                var dmg = Math.floor(((2*this.level+10)/100)*(this.str/gordonBattle.def)*this.baseAtk+2);
                if(critRoll<this.dex*2)dmg*=2;
                var me = this;
                BattleAnim.onComplete.add(function(){

                    gordonBattle.hp-=dmg;
                    dialogueText.text="Gordon took "+dmg+" damage!";
                    animationInProgress=false;
                    me.ATBTimer=0;
                });
            }
        }
    }
    this.obj.sprite = game.add.sprite(400,300,'cuclumberjack');
    this.obj.sprite.anchor.set(.5);
    this.obj.sprite.scale.set(1.75);
    this.obj.sprite.smoothed=false;
}


////The Bosses
function Rahman(){
    this.obj = new NPC();
    this.obj.name = "Rahman";
    this.obj.hp=600;
    this.obj.def=8;
    this.obj.str=8;
    this.obj.spd=8;
    this.obj.xpGiven=120;
    this.obj.baseAtk=100;
    
    this.obj.attack = function(){
        if(animationInProgress===false){
            dialogueText.text="Rahman attacked!"
            dialogueBoxLifeSpan=300;
            animationInProgress = true;
            attackAnimation = game.add.sprite(500,350,'slashAttack',5);
            attackAnimation.position.x=gordonBattle.sprite.position.x;
            attackAnimation.position.y=gordonBattle.sprite.position.y;
            BattleAnim = attackAnimation.animations.add('slash',null,10);
            BattleAnim.play();
            var dmg = Math.floor(((2*this.level+10)/100)*(this.str/gordonBattle.def)*this.baseAtk+2);
            var me = this;
            BattleAnim.onComplete.add(function(){
                
                gordonBattle.hp-=dmg;
                //damageText.text=dmg;
                dialogueText.text="Gordon took "+dmg+" damage!";
                animationInProgress=false;
                me.ATBTimer=0;
            });
        }
    }
    this.obj.sprite = game.add.sprite(400,300,'rahmanBattle');
    this.obj.sprite.anchor.set(.5);
}
function hoodedFigure(){
    this.obj = new NPC();
    this.obj.name = "The Hooded Figure";
    this.obj.hp=1000;
    this.obj.int=15;
    this.obj.def=6;
    this.obj.str=10;
    this.obj.spd=10;
    this.obj.xpGiven=200;
    this.obj.baseAtk=100;
    
    this.obj.attack = function(){
        var attack = GetRandom(0,100);
        if(attack<10){
             if(animationInProgress===false){
                dialogueText.text="The Hooded Figure cast Haste!";
                dialogueBoxLifeSpan = 300;
                attackAnimation = game.add.sprite(this.sprite.position.x,this.sprite.position.y,'HasteAnim');
                attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                BattleAnim = attackAnimation.animations.add('slash',null);
                BattleAnim.play('slash',10,false,true);
                this.state.haste=3000;
                this.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                       
                        
                        animationInProgress=false;

                    });
            }
        }
        else if(attack<30){
            if(animationInProgress===false){
                 dialogueText.text="The Hooded Figure cast Ice!";
                dialogueBoxLifeSpan = 300;
                gordonBattle.mp-= gordonBattle.maxMP*.2;
                attackAnimation = game.add.sprite(gordonBattle.sprite.x,gordonBattle.sprite.y,'iceSpell',18);
                //attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(.75);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                //attackAnimation.position.x=enemy.obj.sprite.x;
                //attackAnimation.position.y=enemy.obj.sprite.y;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                this.ATBTimer=0;
                var dmg = Math.floor(((2*this.level+10)/100)*(this.int/gordonBattle.def)*150+GetRandom(2,8));
                BattleAnim.onComplete.add(function(){
                        
                        gordonBattle.state.slow=1200;
                        gordonBattle.hp-=dmg;
                        //damageText.text=dmg;
                    dialogueText.text="Gordon took "+dmg+" damage!";

                        animationInProgress=false;

                    });
            }
            }
    else if(attack<70){
        if(animationInProgress===false){
            dialogueText.text="The Hooded Figure attacked!";
            dialogueBoxLifeSpan = 300;
            animationInProgress = true;
            attackAnimation = game.add.sprite(500,350,'slashAttack',5);
            attackAnimation.position.x=gordonBattle.sprite.position.x;
            attackAnimation.position.y=gordonBattle.sprite.position.y;
            BattleAnim = attackAnimation.animations.add('slash',null,10);
            BattleAnim.play();
            var dmg = Math.floor(((2*this.level+10)/100)*(this.str/gordonBattle.def)*this.baseAtk+2);
            var me = this;
            BattleAnim.onComplete.add(function(){
                
                gordonBattle.hp-=dmg;
                //damageText.text=dmg;
                dialogueText.text="Gordon took "+dmg+" damage!";
                animationInProgress=false;
                me.ATBTimer=0;
            });
        }
    }
}
    this.obj.sprite = game.add.sprite(400,300,'hoodedFigure');
    this.obj.sprite.anchor.set(.5);
}
function masterToille(){
    this.obj = new NPC();
    this.obj.name = "Master Toille";
    this.obj.hp=2000;
    this.obj.int=20;
    this.obj.def=15;
    this.obj.str=15;
    this.obj.spd=15;
    this.obj.xpGiven=300;
    this.obj.baseAtk=150;
    
    this.obj.attack = function(){
        var attack = GetRandom(0,100);
        if(attack<10){
             if(animationInProgress===false){
                dialogueText.text="Master Toille cast Haste!";
                dialogueBoxLifeSpan = 300;
                attackAnimation = game.add.sprite(this.sprite.position.x,this.sprite.position.y,'HasteAnim');
                attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                BattleAnim = attackAnimation.animations.add('slash',null);
                BattleAnim.play('slash',10,false,true);
                this.state.haste=3000;
                this.ATBTimer=0;
                BattleAnim.onComplete.add(function(){
                       
                        animationInProgress=false;

                    });
            }
        }
        else if(attack<20){
            if(animationInProgress===false){
                 dialogueText.text="Master Toille cast Ice!";
                dialogueBoxLifeSpan = 300;
                gordonBattle.mp-= gordonBattle.maxMP*.2;
                attackAnimation = game.add.sprite(gordonBattle.sprite.x,gordonBattle.sprite.y,'iceSpell',18);
                //attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(.75);
                attackAnimation.smoothed=false;
                animationInProgress=true;
                //attackAnimation.position.x=enemy.obj.sprite.x;
                //attackAnimation.position.y=enemy.obj.sprite.y;
                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                this.ATBTimer=0;
                var dmg = Math.floor(((2*this.level+10)/100)*(this.int/gordonBattle.def)*150+GetRandom(2,8));
                BattleAnim.onComplete.add(function(){
                        
                        gordonBattle.state.slow=1200;
                        gordonBattle.hp-=dmg;
                        dialogueText.text="Gordon took "+dmg+" damage!";

                        animationInProgress=false;

                    });
            }
            }
        else if(attack<30){
            
            if(animationInProgress===false){
                dialogueText.text="Master Toille cast Fire!";
                dialogueBoxLifeSpan = 300;
                attackAnimation = game.add.sprite(gordonBattle.sprite.x,gordonBattle.sprite.y,'fireSpell',11);
                //attackAnimation.anchor.set(.5);
                attackAnimation.scale.set(2);
                attackAnimation.smoothed=false;
                animationInProgress=true;

                BattleAnim = attackAnimation.animations.add('slash',null,10);
                BattleAnim.play();
                this.ATBTimer=0;
                var dmg = Math.floor(((2*this.level+10)/100)*(this.int/gordonBattle.def)*200+GetRandom(2,8));
                BattleAnim.onComplete.add(function(){
                        
                        gordonBattle.hp-=dmg;
                        //damageText.text=dmg;
                        dialogueText.text="Gordon took "+dmg+" damage!";
                        animationInProgress=false;

                    });
            }
            
        }
    else if(attack<70){
        if(animationInProgress===false){
            dialogueText.text="Master Toille attacks!";
            dialogueBoxLifeSpan = 300;
            animationInProgress = true;
            attackAnimation = game.add.sprite(500,350,'slashAttack',5);
            attackAnimation.position.x=gordonBattle.sprite.position.x;
            attackAnimation.position.y=gordonBattle.sprite.position.y;
            BattleAnim = attackAnimation.animations.add('slash',null,10);
            BattleAnim.play();
            var dmg = Math.floor(((2*this.level+10)/100)*(this.str/gordonBattle.def)*this.baseAtk+2);
            var me = this;
            BattleAnim.onComplete.add(function(){
                
                gordonBattle.hp-=dmg;
               dialogueText.text="Gordon took "+dmg+" damage!";
                animationInProgress=false;
                me.ATBTimer=0;
            });
        }
    }
}
    this.obj.sprite = game.add.sprite(400,300,'toilleBattle');
    this.obj.sprite.anchor.set(.5);
}

function treasureChest(){
    this.sprite;
    this.opened = false;
    this.content;
    this.placedOnMap=false;
    this.x=0;
    this.y=0;
    this.frame=0;
    this.fillChest = function(){
        //the type of content in the chest
        //0: weapon, 1: armor 2: Gloves
        var contentType = GetRandom(0,100);
        if(contentType < 33){
            this.content=cloneObject(weapons[GetRandom(0,weapons.length-1)]);
        }
        else if(contentType < 66){
            this.content=cloneObject(armors[GetRandom(0,armors.length-1)]);
        }
        else if(contentType <100){
            this.content=cloneObject(gloves[GetRandom(0,gloves.length-1)]);
        }
        
    }
    this.openChest=function(){
        if(!this.opened){
            gordonBattle.inventory.push(this.content);
            this.frame=1;
            this.sprite.frame=1;
            this.opened=true;
        }
    }
    this.placeInRoom=function(){
        while(!this.placedOnMap){
            var room = Dungeon.rooms[0,Dungeon.rooms.length-1];
            var roomCenter = {
            x:Math.floor(room.x+(room.w/2)),
            y:Math.floor(room.y+(room.h/2))
            };
            
            var spawnTile=level.getTile(roomCenter.x,roomCenter.y);
            if(spawnTile!=null&&spawnTile.index==0){
                this.x=spawnTile.worldX+spawnTile.centerX;
                this.y=spawnTile.worldY+spawnTile.centerY;
                this.placedOnMap=true;
            }
        }
        this.sprite.position.x=this.x;
            this.sprite.position.y=this.y;
            game.physics.enable(this.sprite,Phaser.Physics.ARCADE);
            this.sprite.body.setSize(32,32,0,0);
            this.sprite.collideWorldBounds=true;
            this.sprite.body.immovable=true;
    }
}
/////////////////////EQUIPMENT////////////////////
///every piece of equipment is a JSON object
///this may be redundant, but it should be easier to
///save the players inventory to a php database this way



/*
*State Switching Functions
*/
//start a game
function StartNG(){
    titleMusic.stop();
    gordonBattle = new PCBattle();
    Dungeon.map=null;
    floor=1;
    game.state.clearCurrentState(game.state.start("overworld"));
}
//Load a game
function Load(){
    //start a game based on a load hash
    titleMusic.stop();
    game.state.clearCurrentState(game.state.start("gameover"));
}
//start the inventory
function startInventory(){
    game.state.clearCurrentState(game.state.start("inventory"));
}
//start the title screen
function StartTitle(){
    gameOverMusic.stop();
    game.state.clearCurrentState(game.state.start("title"));
};

/*
*supplimental functions
*/


function equipItem(){
    gordonBattle.inventory[inventoryHandle].isEquipped = true;
    if (gordonBattle.inventory[inventoryHandle].slot=0){
        
        gordonBattle.equipped.weapon.isEquipped = false;
        gordonBattle.equipped.weapon=gordonBattle.inventory[inventoryHandle];
        gordonBattle.vit = gordonBattle.base_vit + gordonBattle.equipped.weapon.Addvit;
        gordonBattle.mag = gordonBattle.base_mag + gordonBattle.equipped.weapon.Addmag;
        gordonBattle.int = gordonBattle.base_int + gordonBattle.equipped.weapon.Addint;
        gordonBattle.def = gordonBattle.base_def + gordonBattle.equipped.weapon.Adddef;
        gordonBattle.str = gordonBattle.base_str + gordonBattle.equipped.weapon.Addstr;
        gordonBattle.dex = gordonBattle.base_dex + gordonBattle.equipped.weapon.Adddex;
        gordonBattle.eva = gordonBattle.base_eva + gordonBattle.equipped.weapon.Addeva;
        gordonBattle.spd = gordonBattle.base_spd + gordonBattle.equipped.weapon.Addspd;
    }
     if (gordonBattle.inventory[inventoryHandle].slot=1){
         gordonBattle.equipped.head.isEquipped = false
        gordonBattle.equipped.head=gordonBattle.inventory[inventoryHandle];
        gordonBattle.vit = gordonBattle.base_vit + gordonBattle.equipped.head.Addvit;
        gordonBattle.mag = gordonBattle.base_mag + gordonBattle.equipped.head.Addmag;
        gordonBattle.int = gordonBattle.base_int + gordonBattle.equipped.head.Addint;
        gordonBattle.def = gordonBattle.base_def + gordonBattle.equipped.head.Adddef;
        gordonBattle.str = gordonBattle.base_str + gordonBattle.equipped.head.Addstr;
        gordonBattle.dex = gordonBattle.base_dex + gordonBattle.equipped.head.Adddex;
        gordonBattle.eva = gordonBattle.base_eva + gordonBattle.equipped.head.Addeva;
        gordonBattle.spd = gordonBattle.base_spd + gordonBattle.equipped.head.Addspd;
    }
     if (gordonBattle.inventory[inventoryHandle].slot=2){
         gordonBattle.equipped.body.isEquipped = false
        gordonBattle.equipped.body=gordonBattle.inventory[inventoryHandle];
        gordonBattle.vit = gordonBattle.base_vit + gordonBattle.equipped.body.Addvit;
        gordonBattle.mag = gordonBattle.base_mag + gordonBattle.equipped.body.Addmag;
        gordonBattle.int = gordonBattle.base_int + gordonBattle.equipped.body.Addint;
        gordonBattle.def = gordonBattle.base_def + gordonBattle.equipped.body.Adddef;
        gordonBattle.str = gordonBattle.base_str + gordonBattle.equipped.body.Addstr;
        gordonBattle.dex = gordonBattle.base_dex + gordonBattle.equipped.body.Adddex;
        gordonBattle.eva = gordonBattle.base_eva + gordonBattle.equipped.body.Addeva;
        gordonBattle.spd = gordonBattle.base_spd + gordonBattle.equipped.body.Addspd;
    }
     if (gordonBattle.inventory[inventoryHandle].slot=3){
         gordonBattle.equipped.arms.isEquipped = false
        gordonBattle.equipped.arms=gordonBattle.inventory[inventoryHandle];
        gordonBattle.vit = gordonBattle.base_vit + gordonBattle.equipped.arms.Addvit;
        gordonBattle.mag = gordonBattle.base_mag + gordonBattle.equipped.arms.Addmag;
        gordonBattle.int = gordonBattle.base_int + gordonBattle.equipped.arms.Addint;
        gordonBattle.def = gordonBattle.base_def + gordonBattle.equipped.arms.Adddef;
        gordonBattle.str = gordonBattle.base_str + gordonBattle.equipped.arms.Addstr;
        gordonBattle.dex = gordonBattle.base_dex + gordonBattle.equipped.arms.Adddex;
        gordonBattle.eva = gordonBattle.base_eva + gordonBattle.equipped.arms.Addeva;
        gordonBattle.spd = gordonBattle.base_spd + gordonBattle.equipped.arms.Addspd;
    }
     if (gordonBattle.inventory[inventoryHandle].slot=4){
         gordonBattle.equipped.legs.isEquipped = false
        gordonBattle.equipped.legs=gordonBattle.inventory[inventoryHandle];
        gordonBattle.vit = gordonBattle.base_vit + gordonBattle.equipped.legs.Addvit;
        gordonBattle.mag = gordonBattle.base_mag + gordonBattle.equipped.legs.Addmag;
        gordonBattle.int = gordonBattle.base_int + gordonBattle.equipped.legs.Addint;
        gordonBattle.def = gordonBattle.base_def + gordonBattle.equipped.legs.Adddef;
        gordonBattle.str = gordonBattle.base_str + gordonBattle.equipped.legs.Addstr;
        gordonBattle.dex = gordonBattle.base_dex + gordonBattle.equipped.legs.Adddex;
        gordonBattle.eva = gordonBattle.base_eva + gordonBattle.equipped.legs.Addeva;
        gordonBattle.spd = gordonBattle.base_spd + gordonBattle.equipped.legs.Addspd;
    }
}

function dropItem(){
    gordonBattle.inventory[inventoryHandle].button.destroy();
    if(gordonBattle.inventory[inventoryHandle].isEquipped == true){
            if (gordonBattle.inventory[inventoryHandle].slot=1){
                gordonBattle.equipped.head=0;
                gordonBattle.vit = gordonBattle.base_vit;
                gordonBattle.mag = gordonBattle.base_mag;
                gordonBattle.int = gordonBattle.base_int;
                gordonBattle.def = gordonBattle.base_def;
                gordonBattle.str = gordonBattle.base_str;
                gordonBattle.dex = gordonBattle.base_dex;
                gordonBattle.eva = gordonBattle.base_eva;
                gordonBattle.spd = gordonBattle.base_spd;
            }
             if (gordonBattle.inventory[inventoryHandle].slot=2){
                gordonBattle.equipped.body=0;
                 gordonBattle.vit = gordonBattle.base_vit;
                gordonBattle.mag = gordonBattle.base_mag;
                gordonBattle.int = gordonBattle.base_int;
                gordonBattle.def = gordonBattle.base_def;
                gordonBattle.str = gordonBattle.base_str;
                gordonBattle.dex = gordonBattle.base_dex;
                gordonBattle.eva = gordonBattle.base_eva;
                gordonBattle.spd = gordonBattle.base_spd;
            }
             if (gordonBattle.inventory[inventoryHandle].slot=3){
                gordonBattle.equipped.arms=0;
                gordonBattle.vit = gordonBattle.base_vit;
                gordonBattle.mag = gordonBattle.base_mag;
                gordonBattle.int = gordonBattle.base_int;
                gordonBattle.def = gordonBattle.base_def;
                gordonBattle.str = gordonBattle.base_str;
                gordonBattle.dex = gordonBattle.base_dex;
                gordonBattle.eva = gordonBattle.base_eva;
                gordonBattle.spd = gordonBattle.base_spd;
            }
             if (gordonBattle.inventory[inventoryHandle].slot=4){
                gordonBattle.equipped.legs=0;
                gordonBattle.vit = gordonBattle.base_vit;
                gordonBattle.mag = gordonBattle.base_mag;
                gordonBattle.int = gordonBattle.base_int;
                gordonBattle.def = gordonBattle.base_def;
                gordonBattle.str = gordonBattle.base_str;
                gordonBattle.dex = gordonBattle.base_dex;
                gordonBattle.eva = gordonBattle.base_eva;
                gordonBattle.spd = gordonBattle.base_spd;
            }   
    }
    gordonBattle.inventory.splice(inventoryHandle,1);
    inventoryHandle=null;
}

function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
 
    return temp;
}
