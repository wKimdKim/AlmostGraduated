/*Global Variables*/
var marker;
var latitude;
var longitude;

/*Creates the google map. Added a listener so when user click on the map, marker is placed.
Saves the marker's latitude and longitude*/
function myMap() {
  var mapProp= {
      center:new google.maps.LatLng(-36.852701,174.7699),
      zoom:18,
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
  var mapListener = map.addListener('click', function(e) {
    if (marker){
      marker.setPosition(e.latLng);
    }
    else{
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



function Create_event() {
  var Name = $("#name").val();
  var Area = $("#area").val();
  var DateTime = $("#datetime-local").val();
  console.log(DateTime);
  var lat = latitude;
  var long = longitude;

  $.ajax({
    url: '/add/event',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({'Name':Name,'Area':Area,'DateTime':DateTime, 'Latitude': lat, 'Longitude': long}),
    success: function(response){
      alert(response)
      console.log(response);
      },
    error: function(response){
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


function get_marker(id){
  $.ajax({
    url: '/location/query',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({'id':id}),
    success: function (response) {
      var latitude = response['longitude'];
      var longitude = response['latitude'];
      var numLat = parseFloat(latitude);
      var numLng = parseFloat(longitude);

      var latLng = new google.maps.LatLng(numLat, numLng);
      var mapOptions = {
          zoom: 18,
          center: latLng
      }

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var eventMarker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: 'Event Location'
  });
  eventMarker.setMap(map);
      },
    error: function(response){
        alert(response);
      }
    });


}  