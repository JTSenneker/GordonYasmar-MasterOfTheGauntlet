
var canvas = document.getElementById("canvas");
var graphics = canvas.getContext("2d");
//////////////Convenience Random Function////////////
function GetRandom(min,max){
    return~~ (Math.random() * (max - min)) + min;
}

///////////////Tile Object///////////////////
function Tile(posX,posY,value){
    this.x = posX*32;
    this.y = posY*32;
    this.value = value
    this.img = new Image();
    this.img.src = "imgs/TileSheet.png";
    this.me = this;
    this.Draw = function(graphics){
        if(this.value==1)graphics.drawImage(this.img,this.x,this.y);
        else{
            graphics.fillStyle = "#333";
            graphics.fillRect(this.x,this.y,32,32);
        }
        
    }
    
    /////////////////////////////////////////////
    //=========================================//
    //============PATHFINDING STUFF============//
    //=========================================//
    /////////////////////////////////////////////
    
    //pathfinding properties
    this.neighbors = [];
    this.parent;
    this.G;//cost to move to this node from path start
    this.F;//estimated total cost of this node
    
    this.resetParent = function(){
        me.parent = null;
        me.G=0;
        me.F=0;
    }
    this.setParentTile = function(tile){
        me.parent=tile;
        me.G=parent.G+me.getCost();
    }
    this.getCost=function(){
        if(me.value==1) return 1;
        return 1000;
    }
    this.doHeuristic = function(endTile){
        var H=0;
        H=distanceEuclidean(endTile);
    }
    this.distanceEuclidean=function(endTile){
        var dx = endTile.x-me.x;
        var dy = endTile.y-me.y;
        return Math.sqrt(dx*dx + dy+dy);
    }
    this.addNeighbors = function(tileArray){
        for(var t = 0; t<tileArray.length;t++){
            if(tileArray[i]!=null)me.neighbors.push(tileArray[i]);   
        }
    }
}


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
                    this.map[x][y]=new Tile(x,y,1);
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
                this.map[pointB.x][pointB.y]=new Tile(pointB.x,pointB.y,1);
            }
            while((pointB.y!=pointA.y)){
                if(pointB.y>pointA.y)pointB.y--;
                else if(pointB.y<pointA.y) pointB.y++;
                else return;
                this.map[pointB.x][pointB.y]=new Tile(pointB.x,pointB.y,1);
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

    Draw:function(graphics){
        for(var x=0;x<this.mapSize-1;x++){
                for(var y=0;y<this.mapSize-1;y++){
                    this.map[x][y].Draw(graphics);
                }
            }
    }
}

Dungeon.Generate();
Dungeon.Draw(graphics);

///////////////////////////////////////////////
//===========================================//
//=============PATHFINDING STUFF=============//
//===========================================//
///////////////////////////////////////////////
function Pathfinder(){
    this.openTiles = [];
    this.closedTiles = [];
    
    var me = this;
    //===========FIND PATH FUNCTION==========//
    //Finds the path for the player to follow
    this.findPath = function(startTile, endTile){
        me.openTiles = [];
        me.closedTiles = [];
        
        //Starting tiles parent property shuld be null
        startTile.resetParent();
        //STEP 1: CONNECT START TO END
        me.connectStartToEnd(startTile,endTile);
        //STEP 2: BUILD PATH BACK TO BEGINNING
        var path = me.connectEndToStart(startTile,endTile);
        //STEP 3: REVERSE THE PATH(FOR CONVENIENCE)
        path.reverse();
    }
    
    //function that calculates the cost of moving from one tile to the next and connects a starting tile to an ending tile
    this.connectStartToEnd=function(startTile,endTile){
        me.openTiles.push(startTile);//add startTile to the open tiles array
        
        //WHILE THERE ARE STILL TILES IN THE OPEN TILES ARRAY
        while(me.openTiles.length >0){
            //FIND THE OPEN TILE WITH THE LOWEST F VALUE
            var F = 99999999999;
            var index = -1;
            for(var i = 0; i < me.openTiles.length;i++){
             if(me.openTiles[i].F < F){
                 F=me.openTiles[i].F;
                 index=i;
             }
            }
            var current = openTiles.slice(index);//REMOVE TILE FROM OPEN TILES ARRAY
            me.closedTiles.push(current);
            
            //IF WE'VE CONNECTED THE START TO THE END , BREAK OUT OF WHILE, RETURN OUT OF FUNCTION
            if(current == endTile)break;
            
            for(var i = 0; i < current.neighbors.length;i++){
                var neighbor = current.neighbors[i];
                if(!me.tileInArray(me.closedTiles,neighbor)){
                    if(!me.tileInArray(me.openTiles,neighbor)){
                        me.openTiles.push(neighbor);
                        neighbor.setParentTile(current);
                        neighbor.doHeuristic(endTile);
                    }
                }else{
                    if(neighbor.G>current.G+neighbor.getCost()){
                        neighbor.setParentTile(current);
                        neighbor.doHeuristic(endTile);
                    }
                }
            }
        }
    }//end start to end method
    
    //get each tile's parent starting at the end
    this.connectEndToStart = function(startTile, endTile){
        var path = [];
        var pathNode=endTile;
        while(pathNode!=null){
            path.push(pathNode);
            pathNode = pathNode.parent;
        }
        return path;
    }
    //function that checks to see if a tile is in an array
    this.tileInArray = function(array,tile){
        for(var i =0; i < array.length;i++) if(array[i]==tile)return true;
        return false;
        
    }
    
}