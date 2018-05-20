/*Global Variables*/
var marker;
var latitude;
var longitude;
var Areas = ["OGGB Upstairs", "OGGB Downstairs", "Computer Science Ground Labs", "GenLib"];

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
  console.log(Name);
  var Area = $("#exampleFormControlSelect1").val();
  if (Area in Areas){
    if (Area === Areas[0]){
      lat = 174.771057;
      long = -36.853074;
    }
    if (Area === Areas[1]){
      lat = 174.771698;
      long = -36.852552;
    }
    if (Area === Areas[2]){
      lat = 174.767908;
      long = -36.853063;
    }
    if (Area === Areas[3]){
      lat = 174.76947;
      long = -36.85137;
    }
  }
  console.log(Area);
  var DateTime = $("#datetime-local").val();
  console.log(DateTime);

  if (Area === "Other"){
    if (lat == null || long == null){
      alert("Please choose a location on the map");
    }
    else{
      var lat = latitude;
      var long = longitude;
      $.ajax({
        url: '/add/event',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({'Name':Name,'Area':Area,'DateTime':DateTime, 'Latitude':lat, 'Longitude':long}),
        success: function(response){
          alert(response)
          },
        error: function(response){
          alert(response)
          }
      });
    }
    else{
      $.ajax({
        url: '/add/event',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({'Name':Name,'Area':Area,'DateTime':DateTime, 'Latitude':lat, 'Longitude':long}),
        success: function(response){
          alert(response);
          },
        error: function(response){
          alert(response);
          }
      });
    }
  }
}

function moreEventDetails() {
    var details = document.getElementById("showEventDetails");
    if (details.style.display === "none") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}
