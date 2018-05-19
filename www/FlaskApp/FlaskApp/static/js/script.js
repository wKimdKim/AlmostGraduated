var lat;
var long;

function myMap() {
  var mapProp= {
      center:new google.maps.LatLng(-36.852701,174.7699),
      zoom:18,
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
  var mapListener = map.addListener('click', function(e) {
    var marker = new google.maps.Marker()
    marker.setPosition(e.latLng);
    lat = marker.position.lat();
    long = marker.position.lng();
    // console.log(long)
    placeMarkerAndPanTo(marker.getPosition(), map);
    google.maps.event.clearListeners(map, 'click');
  });
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}



function Create_event() {
	var Name = $("#name").val();
	var Area = $("#area").val();

	$.ajax({
		url: '/add/event',
		contentType: 'application/json',
		type: 'POST',
		data: JSON.stringify({'Name':Name,'Area':Area, 'Latitude': Latitude, 'Longitude': Longitude}),
		success: function(response){
			alert(response)
			},
		error: function(response){
			alert(response)
			}
	});
}
