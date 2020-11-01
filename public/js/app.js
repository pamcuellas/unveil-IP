/*jshint esversion: 6 */
/*******************************************************************************/
$(document).ready( function(){ 	// Wait until DOM be ready to start.

// Global variables
let ipToSearch= "";
let ipLocation = [];
const torontoCoordinates = [40.651070, -79.347015]; // Start the map with Toronto Coordinates.

	// Event to search IP location
	$('#btn').on("click", () => {

		// Check if IP is valid
		if (checkIPs()) {
			ipToSearch = getCurrIP();
			clearFields();
			$("#message").attr("style","color:#1e90ff");
			$("#message").html("Searching IP " + ipToSearch + " ...");
			// Run our small REST to get the IP Location
			$.post("/search/ip", { ip: ipToSearch })
			.then( (data) => {
				setNewLocation( data[0] );
			})
			.catch( (error) => {
				console.log(error);
			});
		} else {
			$("#message").attr("style","color:red");
			$("#message").html("Invalid IP number [ " + getCurrIP() +  " ]");
		}
	});

	// function to process new IP location
	let setNewLocation = ( result ) => {
		
		// Get the coordinates 
		let coordinates = [ result.latitude,  result.longitude ];

		// Check if database returned a valid coordinate.
		if (coordinates[0] != 0 || coordinates[1] != 0) {

			// Clear message field
			$("#message").html("");
			$("#message").attr("style","color:#e8a0b7");

			// Define a popup text to show up
			const popupText = "<h6 style='font-weight: bold; text-align:center;'>" + result.city_name + "</h6>" +
			"<hr style='margin: 2px'>" +
			"<span>Country: " + result.country_code + " - "  + result.country_name + "</span><br>" +
			"<span>Region: " + result.region_name + "</span><br>" + 
			"<span>Zip code: " + result.zip_code + "</span><br>"  +
			"<span>Coordinates: " + coordinates[0] + ", " + coordinates[1] + "</span><br>"  +
			"<span>Time Zone: " + result.time_zone + "</span><br>"  +
			"<span>IP searched: " + ipToSearch + "</span><br>"  + 
			"<span>From/To: " + result.ip_from + "/" + result.ip_to + "</span>";

			// Create a circle for IP Location
			ipLocation.push(  L.circle(coordinates, {
				stroke: true,
				fillOpacity: 0.7,
				weight: 2,
				color: "purple",
				fillColor: '#ff1d59',
				radius: 50000
			} ).bindPopup(popupText)
			);		

			// Create the layer for IP location
			let ipLayer = L.layerGroup(ipLocation);

			// Add layears to the map;
			ipLayer.addTo( vMap );	

			// Coordinates for Map
			let mapCoordinates = [coordinates[0]  + 4, coordinates[1]];

			// Send the map to coordinates
			vMap.flyTo(mapCoordinates, 5);

			// Create a popup to show up automatically
			var popup = L.popup()
			.setLatLng(coordinates)
			.setContent(popupText);
			
			// Wait 2.6 seconds to present info
			setTimeout( () => { popup.openOn(vMap); }, 2500 );
			
		} else{
			// IP not found
			$("#message").attr("style","color:red");
			$("#message").html("Sorry! The IP " + ipToSearch + " does not exist in our database!");
		}
	};

	// Clear IP fields
	let clearFields = ( ) => {
		$("#ip01").val("");
		$("#ip02").val("");
		$("#ip03").val("");
		$("#ip04").val(""); 
	};

	// Event to check if the typed IP number is right
	$(".ip-element").keyup(function ( ) { 
		var keycode = (event.keyCode ? event.keyCode : event.which);   
		if ((this.value.length == this.maxLength) || (keycode == '13' && this.value.length != 0)) {    
			if(checkIPs()) { 
				$("#message").html("");
				if ($(this).index() != 4 ){
					$(this).next('.ip-element').focus();   
				} else if (keycode == '13') {  
					$('#btn').focus();   
					$("#btn").trigger("click");
				}
			} else {
				$("#message").html("Invalid IP number [ " + getCurrIP() +  " ]");
				$(this).html("");
			}
		}    
	});  

	// Check the full IP number
	let checkIPs = () => {
		let result = true;
		for (i=1; i<5; i++) {
			let content = $("#ip0" + i).val();
			if ( !(checkIP( content )) ) {
				result = false;
				break;
			}
		}
		return result;
	};

	// Check if each part of IP number is valid
  	let checkIP  =  value  => {
		let numbers = /^[0-9]+$/;
		if( value.match(numbers) || value.length == 0 )
		{
			if (parseInt(value) <= 254 || value.length == 0) {
				return true;
			}
		} 
		return false;
	};

	// Get the current IP
	let getCurrIP = () => {  
			let ip  = $('#ip01').val() + "." + $('#ip02').val()  + "." + $('#ip03').val() + "." + $('#ip04').val(); 
			ip = ip.replace("...","").replace("..","");
			return ip;
		};

	// Create the map
	var vMap = L.map("map", {
		center: torontoCoordinates, 
		zoom: 10
	});
	
	// Define maps styles
	/*
	var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "mapbox.streets",
		accessToken: API_KEY
	}).addTo( vMap ); // Add a basemap
    */ 
	var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "satellite-streets-v9",
		accessToken: API_KEY
	}).addTo( vMap );
	
	var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "light-v9",
		accessToken: API_KEY
	});
	
	var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "outdoors-v9",
		accessToken: API_KEY
	});
	
	var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "dark-v9",
		accessToken: API_KEY
	});

	// Map styles options to appear in the control box.
	let basemapControl = {
//		"Streets": streetmap,
		"Satellite": satellite,
		"Grayscale": light,
		"Outdoors": outdoors,
		"Dark Map": dark
	};

	// Add the control component, a layer list with checkboxes for operational layers and radio buttons for basemaps
	L.control.layers( basemapControl, null ).addTo( vMap );

	// Function to start the page 
	init = () => {
		$( "#btn" ).trigger( "click" );
	};

	// Start the page with Toronto IP.
	init();
});

