
// Measure distance between two points
Math.getDistance = function( x1, y1, x2, y2 ) {

	var 	xs = x2 - x1,
		ys = y2 - y1;

	xs *= xs;
	ys *= ys;

	return Math.sqrt( xs + ys );
};

var oldPoint;
var distance;

// Detect mouse speed and set radius
var detectSpeed = function(e) {
	// Get current mouse position
	var currentX = e.clientX;
	var currentY = e.clientY;

	// Get the distance of the current position
	// to the old position
	var distance;

	// If there is no old point, there is no
	// point of reference ; distance is 0
	if (!oldPoint) {
			distance = 0;
	}
	// Otherwise it's the distance :D
	else {
			var oldX = oldPoint[0];
			var oldY = oldPoint[1];
			distance = Math.getDistance( currentX, currentY, oldX, oldY );
			getRadiusBasedOnDistance(distance);
			console.log('distance is ' + distance );
	}

	// Store current position to oldPoint
	oldPoint = [ currentX, currentY ];

	return;
};

//window.addEventListener( 'mousemove', detectSpeed );


//var radius = 10;
//context.lineWidth = radius*2;

// nämä ovat tuolta main.js:stä


var getRadiusBasedOnDistance = function(currentDistance) {
		var newRadius;

		// This variable says how much radius changes
		// based on distance
		var radiusRatio = 1.1;

		if (currentDistance == 0) {
			newRadius = 10;
		}
    else {
			newRadius = currentDistance * radiusRatio;
		}

		console.log('radius is ' + newRadius);

		setRadius(newRadius);
		return;
};

// mistä radius tulee, mikä se on?
/// radius on muuttuja, joka on alustettu main.js:ssä
/// radius muuttuu nyt nappeja painamalla tai hiirtä liikuttamalla
/// (detectSpeed() -> getRadiusBasedOnDistance() )

// voiko context.lineWidth:iä käyttää täällä?
/// voi mut ei tartte :)

// onko distance luku jota voidaan hyödyntää tässä?
/// ???

// mitä else if:n sulkujen sisälle merkitään?
/// kaikkee voi :)

// miten yleensä merkitään kun tämä kasvaa niin tämä toinen kasvaa?
/// var tämä; var tämäToinen;
/// tämä += 1;
/// var updateTämäToinen = function(tämä) {
///     tämäToinen = tämä*2;
/// }
/// (eli nyt aina kun tämä muuttuu on pidettävä huoli siitä että kutsutaan myös
/// updateTämäToinen() -funktiota )

// kun jokin on tuolla mainissa variablena niin voiko sitä käyttää täälläkin?
/// jep!
