/*******************************************/
/*--------GORDON YASMAR JAVASCRIPT---------*/
/*-----------------------------------------*/

/********************************/
/*--------------TEAM------------*/
/********************************/
/*
Jonathan Champion

*/



/**
 * ON PAGE (window) LOAD (fixes refresh bug)
 */
$(window).load(function(){
    setColumnHeights();
    
});

$( window ).resize(function() {
    setColumnHeights();
});




/**
 * Set height of all .fillV classes to largest value
 */
function setColumnHeights(){
    var maxHeight = 0;
    if($(window).width() >= 833){
        
        //go through heights of all .fillV
        $('.fillV').each(function(){
            //set maxHeight if new value is larger
            maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
        });
    } else {
        maxHeight = "auto";
    }
    //set all fillV heights to new max    
    $("div.fillV").height(maxHeight);
    $("article.fillV").height(maxHeight);
        
}
