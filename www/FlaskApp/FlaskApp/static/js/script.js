function myMap() {
  var mapProp= {
      center:new google.maps.LatLng(51.508742,-0.120850),
      zoom:5,
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
}



function Create_event() {
	
	var Name = $("#name").val();
	var Area = $("#area").val();
	console.log(Name)
	console.log(Area)
	console.log("HERE")
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