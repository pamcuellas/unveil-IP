
/*******************************************************************************/
$(document).ready( function(){ 	// Wait until DOM be ready to start.

	$('#btn').on("click", () => {
		let ipToSearch = $('#ip').val();
		$.post("/search/ip", { ip: ipToSearch })
		.then( (data) => {
			//69.156.99.103
			//console.log( data[0] );			
			fillLis( data[0] );
		})
		.catch( (error) => {
			console.log(error);
		});
	});

	// $('#ip').focus();
});

let fillLis =  result => {
	console.log(result);
	$(".ccode"	).text(result.country_code); 
	$(".cname"	).text(result.country_name); 
	$(".region" ).text(result.region_name); 
	$(".city"	).text(result.city_name); 
	$(".lati"	).text(result.latitude); 
	$(".longi"	).text(result.longitude); 
	$(".zip"	).text(result.zip_code); 
	$(".time"	).text(result.time_zone); 
	$(".from"	).text(result.ip_from); 
	$(".to"		).text(result.ip_to); 
	$('#ip'		).focus();
}	
