function myMap() {
  var mapProp= {
      center:new google.maps.LatLng(-36.852701,174.7699),
      zoom:18,
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
  google.maps.event.clearListener(map);
}



function Create_event() {
	var Name = $("#name").val();
	var Area = $("#area").val();
	$.ajax({
		url: '/add/event',
		contentType: 'application/json',
		type: 'POST',
		data: JSON.stringify({'Name':Name,'Area':Area}),
		success: function(response){
			alert(response)
			},
		error: function(response){
			alert(response)
			}
	});
};

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}
