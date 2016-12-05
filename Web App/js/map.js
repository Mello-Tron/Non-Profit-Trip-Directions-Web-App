var map;
var directionDisplay;

function initMap() {
    var uluru = {lat: 47.658, lng: -117.426};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru
    });
}

function displayRoute() {
    //Refresh Panel with Directions and refresh Route Display
    document.getElementById("mapPanel").innerHTML = "";
    if (directionDisplay != null) {
        directionDisplay.setMap(null);
        directionDisplay = null;
    }
    
    var directionsService = new google.maps.DirectionsService();
    var renderOptions = { draggable: false };
    directionDisplay = new google.maps.DirectionsRenderer(renderOptions);
    directionDisplay.setMap(map);
    
    var directionsPanel = document.getElementById('mapPanel');
    directionDisplay.setPanel(directionsPanel); 

    //Get waypoints from address boxes
    var items = [];
    for (var i = 0; i < 10; i++) {
        var currentName = "input ";
        currentName += i;
        var currentInput = document.getElementById(currentName);
        if (currentInput != null)
            items.push(currentInput.value);
    }
    var waypoints = [];
    for (var i = 1; i < items.length; i++) {
        var address = items[i];
        if (address !== "") {
            waypoints.push({
                location: address,
                stopover: true
            });
        }
    }

    //Set start and end
    var originAddress = items[0];
    var destinationAddress = items[0];

    //Set up directions request
    var request = {
        origin: originAddress,
        destination: destinationAddress,
        waypoints: waypoints, //an array of waypoints
        optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    //Get the route from the directions service
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionDisplay.setDirections(response);
        }
        else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}