
// Sets the radius to new radius
var setRadius = function(newRadius) {

    // Radius size limiting
    // If new radius is smaller than minRad, set it to minRad
    if(newRadius<minRad)
        newRadius = minRad;

    // If new radius is larger than maxRad, set it to maxRad
    else if(newRadius>maxRad)
        newRadius = maxRad;

    // Set radius
    radius = newRadius;

    // Update context's linde width
    context.lineWidth = radius*2;

    // Update UI
    radSpan.innerHTML = radius;

    return;
}


var minRad = 0.5,
    maxRad = 100,
    defaultRad = 20,
    interval = 5,
    radSpan = document.getElementById('radval'),
    decRad = document.getElementById('decrad'),
    incRad = document.getElementById('incrad');

// Decrease radius button click listener
decRad.addEventListener('click', function(){
    setRadius(radius-interval);
});

// Increase radius button click listener
incRad.addEventListener('click', function(){
    setRadius(radius+interval);
});



  setRadius(defaultRad);
