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
    var numOfRooms = 25;
    var rooms = [];
    var tHelp = new TileHelper();
    
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
    
    window.onload = (function() {
        for(var i = 0; i < numOfRooms; i++) {
            var p = new Point(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 680));
            
            var gridPos = tHelp.pixelToGrid(p);
            var r = new Room(gridPos.x * tHelp.W, gridPos.y * tHelp.H, Math.floor(Math.random() * 96 + 32), Math.floor(Math.random() * 96 + 32));
            console.log(r.x);
            rooms.push(r);
        }
    })();
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
    
    function TileHelper() {
        this.W = 32;
        this.H = 32;
        this.halfW = this.W / 2;
        this.halfH = this.H / 2;
        
        this.gridToPixel = function(p) {
            return new Point(point.x * this.W, point.y * this.H);
        }
        
        this.pixelToGrid = function(p) {
            return new Point(Math.floor(p.x/this.W), Math.floor(p.y/this.H));   
        }
    }
    
    function Tile(X, Y) {
        this.X = X;
        this.Y = Y;
        this.TERRAIN = 0;
        
        this.draw = function(g) {
            g.fillStyle = "#000";
            g.fillRect(this.X * tHelp.W, this.Y * tHelp.H, tHelp.W, tHelp.H);
        }
        
        this.getCenter = function() {
            var p = new Point(0, 0);
            
            p = tHelp.gridToPixel(this.X, this.Y);
            p.x += tHelp.halfW;
            p.y += tHelp.halfH;
            
            return p;
        }
    }
    
    function Point(x, y) {
        this.x = x;
        this.y = y;
        
        this.get = function() {
            return new Point(this.x, this.y);   
        }
        
        this.getUp = function() {
            return new Point(this.x, this.y - 1);
        }
        
        this.getDown = function() {
            return new Point(this.x, this.y+1);   
        }
        
        this.getLeft = function() {
            return new Point(this.x-1, this.y);   
        }
        
        this.getRight = function() {
            return new Point(this.x+1, this.y);   
        }
        
        this.toString = function() {
            return "" + this.x + ", " + this.y;   
        }
    }
    
    
    function Room(x, y, w, h) {
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.minX = x;
        this.maxX = x + w;
        this.minY = y;
        this.maxY = y + h;
        
        this.draw = function(g) {
            g.fillStyle = "#000";            
            g.fillRect(this.x, this.y, this.width, this.height);
        }
    }   
    
    
    ////////////////////////////////////////////
    //----------------------------------------//
    //---------------Game Loop----------------//
    //----------------------------------------//
    ////////////////////////////////////////////
    
    
    gameLoop();
    
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
        for(var i = rooms.length - 1; i >= 0; i--) {
            rooms[i].draw(graphics);   
        }
    }
    
})();