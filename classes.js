//copied from game.js, functional class to render image to screen

/**
*Stat listing
*VIT: This is the Vitality stat. It determines how much one’s max health is.
*MAG: This is the Magic stat. It determines how much one’s max mana is.
*STR: This is the Strength stat. It determines the power of one’s physical attacks.
*DEF: This is the Defense stat. It determines the amount of damage taken from physical attacks.
*INT: This is the Intelligence stat. It determines the power of one’s magical attacks.
*DEX: This is the Dexterity stat. It determines the chance of landing a critical hit.
*EVA: This is the Evasiveness stat. It determines the odds of an attack missing.
*SPD: This is the Speed stat. It’s used to determine the rate of which the ATB gauge fills.
*/

/**
*Contains data for playable characters:
*base stats
*update function
*attacking
*/
function PC (url) {
    
    //Sprite
    var obj = new Sprite(url);
    
    //data
    obj.name = "";
    
    //PC level
    obj.level = 1;
    
    //PC hp and mp - need a formula to derive these from core stats
    obj.hp = 0;
    obj.mp = 0;
    
    //core stats ( can use array structure if preferred)
    //obj.stat = {vit:1, mag: 1, str: 1, def: 1, int: 1, dex: 1, eva: 1, spd: 1};
    obj.vit = 1;
    obj.mag = 1;        
    obj.str = 1;
    obj.def = 1;
    obj.int = 1;
    obj.dex = 1;
    obj.eva = 1;
    obj.spd = 1;
    
    //internal timer for battle turn
    obj.ATBTimer = 0;
    
    /*
    *These can serve as a 1/0 boolean, or allow for increasing incrimentation
    *if desired (i.e. "fire 2" etc)
    */
    obj.hasLearned = {fire:0,
                      blizzard:0,
                      thunder:0,
                      haste:0,
                     };
    
    /*
    *update function requires gameloop's delta time
    *updates attack timer for the hero
    */
    obj.update = function (dt) {
        obj.ATBTimer -= dt;
        
        if(obj.ATBTimer <= 0){
            obj.attack();
        }
    }
    
    /*
    *Attack function
    *When triggered, this allows player to select attack
    *then select a target
    */
    obj.attack = function () {
        //Pause timers to allow for selections?
        
        //select skill
        
        //target opponent
        
        //reset atbTimer
        obj.ATBTimer = 0;
    }
    
    return obj;
}

function NPC (){
    
    //data
    this.name = "";
    this.description = "";
    
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
    
    //ATB timer
    this.ATBTimer = 0;
    
    //Do we want to calculate XP value here?
    //this.xpGiven = 0;
    
    
    //skill system?  Dont know what stuff the NPC's will have
    obj.hasLearned = {fire:0,
                      blizzard:0,
                      thunder:0,
                      haste:0,
                     }
    
    /*
    *Update function
    *takes gameloops delta time
    */
    obj.update = function (dt) {
        obj.ATBTimer -= dt;
        
        if(obj.ATBTimer <= 0){
            obj.attack();
        }
    }
    
    /*
    *AI attack function called when it's ATB timer hits 0
    *AI should select one of it's skills (if it has the resources to execute it
    *AI then selects a target (AI might need custom priorities to target lowest HP or %HP etc)
    *reset timer to it's delay
    */
    obj.attack = function () {
        //select skill
        
        //target opponent
        
        //reset atbTimer
        obj.ATBTimer = 0;
    }
    
    return obj;
}

/*
*Equippable content class
*these provide a statisical buff to player stats when equipped.
*/
function Equippable () {
    
    //Objects descriptive content
    this.name = "";
    this.description = "";
    
    //objects statistical buffs
    this.Addvit = 0;
    this.Addmag = 0;        
    this.Addstr = 0;
    this.Adddef = 0;
    this.Addint = 0;
    this.Adddex = 0;
    this.Addeva = 0;
    this.Addspd = 0;
    
    //anything else we want to do here?  any special functionality (like giving a bonus spell etc?)
    
}

/*
*Usable object class
*potions etc that will provide quick stat boosts/replenishment
*/
function Usable () {
    
    //usables can have (-)#s to subtract from enemies
    this.addHP = 0;
    this.addMP = 0;
    this.Addvit = 0;
    this.Addmag = 0;        
    this.Addstr = 0;
    this.Adddef = 0;
    this.Addint = 0;
    this.Adddex = 0;
    this.Addeva = 0;
    this.Addspd = 0;
    
    //targeting?  friend/foe exclusivity?
    
    //timer's for temporary effects?
}