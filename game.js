/*******************************************/
/*--------GORDON YASMAR MAIN GAME JS-------*/
/*-----------------------------------------*/
/*******************************************/

/********************************/
/*------------Summary-----------*/
/********************************/
/*
    TODO write summary
*/

/********************************/
/*--------------TEAM------------*/
/********************************/
/*
    Jonathan Champion
    Eric Selover

*/
    
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
    var numOfRooms = 30;
    var rooms = [];
    var availableRooms = [];
    var connectedRooms = [];
    var paths = [];
    var tHelp = new TileHelper();
    var gridWidth = Math.floor(canvas.width / 32);
    var gridHeight = Math.floor(canvas.height / 32);
    
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
            var p = new Point(Math.floor(Math.random() * 40), Math.floor(Math.random() * 25));            
            var pixelPos = tHelp.gridToPixel(p);
            
            var numTilesW = Math.floor(Math.random() * 3 + 2);
            var numTilesH = Math.floor(Math.random() * 3 + 2);

            var r = new Room(pixelPos.x, pixelPos.y, numTilesW * 32, numTilesH * 32, i);
            rooms.push(r);
        }
        
        checkifoutside();
        connectRooms();
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
    
    // Stores data for each tile: Width, Height
    // Functions to conver pixel coordinates to grid coordinates,  vice versa
    function TileHelper() {
        this.W = 32;
        this.H = 32;
        this.halfW = this.W / 2;
        this.halfH = this.H / 2;
        
        this.gridToPixel = function(p) {
            return new Point(p.x * this.W, p.y * this.H);
        }
        
        this.pixelToGrid = function(p) {
            return new Point(Math.floor(p.x/this.W), Math.floor(p.y/this.H));   
        }
    }
    
    // Tile class
    // Stores the position
    // function to draw each tile
    // function to get center of tile for pathfinding
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
    
    //Point class
    // Stores the position for each grid point
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
    
    // Room class
    //@param [types] float, float, float, float int
    // Stores room data (i.e. Position, width, height, id number)
    // draw function to draw each room to the canvas
    function Room(x, y, w, h, id) {
        this.id = id;
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
            g.fillStyle = "#CCC";
            g.fillText("" + this.id + "", this.x, this.y, this.width);
        }
    }   
    
    
    function connectRooms() {
        
        // add all the remaining room ids to a temporary array
        for(var i = 0; i < rooms.length; i++) {
            availableRooms.push(rooms[i].id);   
        }
        
        //get a random room id from the available rooms array to start the connection
        var roomStart = Math.floor(Math.random() * availableRooms.length);
        connectedRooms.push(availableRooms[roomStart]);
        
        //Get a random room id for the next connecting room
        var idNum = availableRooms[Math.floor(Math.random() * availableRooms.length)];
        
        // Check to see if the room is already connected and if it is get a new room
        while(connectedRooms.length < rooms.length) {
            while(checkIfIsAlreadyConnected(idNum)){
                idNum = availableRooms[Math.floor(Math.random() * availableRooms.length)];
            }
        }
        
        
        createPaths();
    }
    
    function createPaths() {
        var startPoint = new Point(0, 0);
        var endPoint = new Point(0, 0);
        var pathPoints = [];
        for(var i = 0; i < connectedRooms.length; i++) {
            for(var j = 0; j < rooms.length; j++) {
                if(connectedRooms[i] === rooms[j].id) {
                    var tempX = Math.floor(Math.random() * rooms[j].maxX + rooms[j].x);
                    if(tempX > rooms[j].maxX) tempX = rooms[j].maxX;
                    var tempY = Math.floor(Math.random() * rooms[j].maxY + rooms[j].y);
                    if(tempY > rooms[j].maxY) tempY = rooms[j].maxY;
                    
                    startPoint.x = tempX;
                    startPoint.y = tempY;
                    
                    startPoint = tHelp.pixelToGrid(startPoint);
                    
                    var tileS = new Tile(startPoint.x, startPoint.y);
                    paths.push(tileS);
                    
                    console.log("StartPoint: " + startPoint.x + ", " + startPoint.y);
                }
            }
            
            for(var k = 0; k < rooms.length; k++) {
                if((i + 1) <= connectedRooms.length) {
                    if(connectedRooms[i + 1] === rooms[k].id) {
                        var endTempX = Math.floor(Math.random() * rooms[k].maxX + rooms[k].x);
                        if(endTempX > rooms[k].maxX) endTempX = rooms[k].maxX;
                        var endTempY = Math.floor(Math.random() * rooms[k].maxY + rooms[k].y);
                        if(endTempY > rooms[k].maxY) endTempY = rooms[k].maxY;
                        
                        endPoint.x = endTempX;
                        endPoint.y = endTempY;
                        
                        endPoint = tHelp.pixelToGrid(endPoint);
                        
                        var tileE = new Tile(endPoint.x, endPoint.y);
                        paths.push(tileE);
                        
                        console.log("EndPoint: "  + endPoint.x + ", " + endPoint.y);
                    }
                }
            }
        }
    }
    
    // @param  [type]   int      [description]  Room id
    // Checks the room id to see if it is already connected by looping through the connected rooms array
    // @return [type]   Boolean
    function checkIfIsAlreadyConnected(num) {
        for(var i = 0; i < connectedRooms.length; i++) {
            if(num == connectedRooms[i]) {
                return true;   
            }
        }
        
        connectedRooms.push(num);
        
        return false;
    }
    
    ////////////////////////////////////////////
    //----------------------------------------//
    //---------------Game Loop----------------//
    //----------------------------------------//
    ////////////////////////////////////////////
    
    /// Checks the rooms array to see if any of the rooms extend past the canvas' width / height and removes them from the array
    function checkifoutside() {
        for(var i = rooms.length - 1; i >= 0; i--) {
            if((rooms[i].x + rooms[i].width) > canvas.width) {
                rooms.splice(i, 1);
            }
            if((rooms[i].y + rooms[i].height) > canvas.height) {
                rooms.splice(i, 1);
            }
        }
    }
    
    gameLoop();
    
    /**
     * Main Game Loop that repeates every frame 
     * @param {[[Type]]} time [[Description]]
     */
    function gameLoop(time){
        var dt = (time - ptime)/1000;
        ptime = time;
        if(isNaN(time)) time = 0;
        
        update(dt);
        
        draw();
        requestAnimFrame(gameLoop);
        
    }
    
    /**
     * Update every frame
     */
    function update(dt){
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
        
        for(var j = paths.length - 1; j >= 0; j--) {
            paths[j].draw(graphics);
        }
    }
    
})();