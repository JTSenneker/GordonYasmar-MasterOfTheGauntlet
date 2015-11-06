//TODO: Make an awesome JRPG

//hide things by putting it in Anon Function
(function(){
    
    ////////////////////////////////////////////
    //----------------------------------------//
    //---------------Variables----------------//
    //----------------------------------------//
    ////////////////////////////////////////////
    
    var canvas = document.getElementById("canvas");
    var graphics = canvas.getContext("2d");
    var img = new Image();
    
    var ptime = 0;
    
    /**
     * Cycle through different browsers to get correct animation frame function
     */
    var requestAnimFrame = (function(){
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        function(f){
        setTimeout(f, 1000/60);
        };
    })();
    
    ////////////////////////////////////////////
    //----------------------------------------//
    //---------------Game Loop----------------//
    //----------------------------------------//
    ////////////////////////////////////////////
    
    gameLoop();
    
    
    ////////////////////////////////////////////
    //----------------------------------------//
    //-----------FUNCTIONS AND SHIT-----------//
    //----------------------------------------//
    ////////////////////////////////////////////
    
    /**
     * Essentially its a sprite class, but javascript hates classes so it's a convulted function
     * @param {[[Type]]} url [[Description]]
     */
    function Sprite(url) {
        this.img = new Image();
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.scale = 1;
        this.anchorX = 0;
        this.anchorY = 0;
        this.hasLoaded = false;
        
        var me = this;
        /**
         * Wait until image has loaded to set anchor points
         */
        this.img.onload = function(){
            me.hasLoaded = true;
            me.anchorX = this.width/2;   
            me.anchorY = this.height/2;   
        }
        this.img.src = url;
        
        /**
         * Draw function for sprite, including translate bullshit
         * @param {graphics} g [[Description]]
         */
        this.draw = function(g){
            if(!this.hasLoaded) return;
            g.save();
            g.translate(this.x, this.y);
            g.rotate(this.angle);
            g.scale(this.scale, this.scale);
            g.drawImage(this.img, -this.anchorX, -this.anchorY);
            g.restore();
        }
    }
    
    /**
     * Main Game Loop that repeates every frame 
     * @param {[[Type]]} time [[Description]]
     */
    function gameLoop(time){
        var dt = (time - ptime)/1000;
        ptime = time;
        if(isNaN(time)) time = 0;
        
        update();
        
        draw();
        requestAnimFrame(gameLoop);
        
    }
    
    /**
     * Update every frame
     */
    function update(){
        
    }
    
    /**
     * Draw everything every frame
     */
    function draw(){
        //clear screen
        graphics.clearRect(0,0,canvas.width,canvas.height);
        
    }
    
})();