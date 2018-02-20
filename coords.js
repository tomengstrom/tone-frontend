
Math.getDistance = function( x1, y1, x2, y2 ) {
	
	var 	xs = x2 - x1,
		ys = y2 - y1;		
	
	xs *= xs;
	ys *= ys;
	 
	return Math.sqrt( xs + ys );
};

var oldPoint;
var distance;

window.addEventListener('mousemove', function(e) {
   
    var x = e.clientX;
    var y = e.clientY;
    var coords = [y, x];
    
    var distance;
    if (!oldPoint) {
        distance = 0;
    }
    else {
        distance = Math.getDistance( x, y, oldPoint[0], oldPoint[1] )
    }
    
  
    //set new value for old point
    oldPoint = [x, y];
        
});


//var radius = 10;
//context.lineWidth = radius*2;
 
// nämä ovat tuolta main.js:stä


var setRadius = function() {
    if (distance = 0) 
       radius = 10; 
    else if(distance)
    context.lineWidth = radius * distance;
};

setRadius();

// mistä radius tulee, mikä se on?
// voiko context.lineWidth:iä käyttää täällä?
// onko distance luku jota voidaan hyödyntää tässä?
// mitä else if:n sulkujen sisälle merkitään?
// miten yleensä merkitään kun tämä kasvaa niin tämä toinen kasvaa?
// kun jokin on tuolla mainissa variablena niin voiko sitä käyttää täälläkin?

