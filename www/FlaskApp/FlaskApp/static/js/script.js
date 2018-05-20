/*Global Variables*/
var marker;
var latitude;
var longitude;

/*Creates the google map. Added a listener so when user click on the map, marker is placed.
Saves the marker's latitude and longitude*/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(-36.852701, 174.7699),
        zoom: 18,
        styles: [{
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}, {"hue": "#0066ff"}, {"saturation": 74}, {"lightness": 100}]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "off"}, {"weight": 0.6}, {"saturation": -85}, {"lightness": 61}]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{"visibility": "on"}]
        }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{"visibility": "on"}]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}, {"color": "#5f94ff"}, {"lightness": 26}, {"gamma": 5.86}]
        }]

    };
    var map = new google.maps.Map(document.getElementById("map"), mapProp);
    var mapListener = map.addListener('click', function (e) {
        if (marker) {
            marker.setPosition(e.latLng);
        }
        else {
            marker = new google.maps.Marker({
                position: e.latLng,
                map: map
            });
        }
        // console.log(marker.position.lng());
        // marker = new google.maps.Marker()
        // marker.setPosition(e.latLng);
        latitude = marker.position.lat();
        longitude = marker.position.lng();
        // console.log(latitude);
        // console.log(longitude);
        // placeMarkerAndPanTo(marker.getPosition(), map);
        // google.maps.event.clearListeners(map, 'click');
    });
}

// google.maps.event.addListener(map, 'click', function(event) {
//   placeMarker(event.latLng);
// });

// function placeMarkerAndPanTo(latLng, map) {
//   var marker = new google.maps.Marker({
//     position: latLng,
//     map: map
//   });
//   map.panTo(latLng);
// }

function showModal(message) {

}


function Create_event() {
    var Name = $("#name").val();
    var Area = $("#exampleFormControlSelect1").val();
    var DateTime = $("#datetime-local").val();


    if (Area == 'Other' && latitude != '' && longitude != '') {

        alert('Select a location');
    }

    if (Area=='Other')
    {
        Area = [latitude,longitude];
    }

    if (Name == '' || DateTime == '') {
        alert("Please enter a Name and Time");
        return;
    }

    var email = $('#email').val();
    var description = $('#description').val()

    $.ajax({
        url: '/add/event',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({
            'Name': Name,
            'Area': Area,
            'DateTime': DateTime,
            'Email': email,
            'Description': description
        }),
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            alert(response)
        }
    });
}

function moreEventDetails() {
    var details = document.getElementById("showEventDetails");
    if (details.style.display === "none") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}


function get_marker(id) {
    $.ajax({
        url: '/location/query',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({'id': id}),
        success: function (response) {
            console.log(response['latitude']);
            console.log(response['longitude']);
        },
        error: function (response) {
            alert(response)
        }
    });
} 