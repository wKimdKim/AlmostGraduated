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
  var Area = $("#exampleFormControlSelect1").val();
  var DateTime = $("#datetime-local").val();
  
  
  if(Area=='Other' && latitude!='' && longitude!='')
  {
    alert('Select a location');
    return;
  }

  if(Name=='' || DateTime=='')
  {
    alert("Please enter a Name and Time");
    return;
  }

  var email = $('#email').val();
  var description = $('#description').val()

  $.ajax({
    url: '/add/event',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({'Name':Name,'Area':Area,'DateTime':DateTime, 'Email': email, 'Description': description}),
    success: function(response){
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
    success: function(response){
      console.log(response['latitude']);
      console.log(response['longitude']);
      },
    error: function(response){
      alert(response)
      }
  });
} 