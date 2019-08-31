/*jshint esversion: 6 */
/*******************************************************************************/
$(document).ready( function(){ 	// Wait until DOM be ready to start.

let ipToSearch= "";

	$('#btn').on("click", () => {
		if (checkIPs()) {
			ipToSearch = getCurrIP();
			clearFields();
			$.post("/search/ip", { ip: ipToSearch })
			.then( (data) => {
				fillLis( data[0] );
			})
			.catch( (error) => {
				console.log(error);
			});
		} else {
			$("#error-msg").attr("style","color:red");
			$("#error-msg").html("Invalid IP number [ " + getCurrIP() +  " ]");
		}
	});

	let fillLis =  result => {
		$(".ip"		).text(ipToSearch);
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
		$("#error-msg").html("");
		$("#ip01").focus();   
	}

	let clearFields = ( ) => {
		$(".ccode"	).text(""); 
		$(".cname"	).text(""); 
		$(".region" ).text(""); 
		$(".city"	).text(""); 
		$(".lati"	).text(""); 
		$(".longi"	).text(""); 
		$(".zip"	).text(""); 
		$(".time"	).text(""); 
		$(".from"	).text(""); 
		$(".to"		).text(""); 
		$("#ip01"	).val("");
		$("#ip02"	).val("");
		$("#ip03"	).val("");
		$("#ip04"	).val(""); 
		$("#error-msg").html("Searching IP " + ipToSearch + " ...");
	}

	$(".ip-element").keyup(function ( ) { 
		var keycode = (event.keyCode ? event.keyCode : event.which);   
		if ((this.value.length == this.maxLength) || (keycode == '13' && this.value.length != 0)) {    
			if(checkIPs()) { 
				$("#error-msg").html("");
				if ($(this).index() != 4 ){
					$(this).next('.ip-element').focus();   
				} else if (keycode == '13') {  
					$("#btn").click();
				}
			} else {
				$("#error-msg").html("Invalid IP number [ " + getCurrIP() +  " ]");
				$(this).html("");
			}
		}    
	});  

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
	}	

  	let checkIP  =  value  => {
		let numbers = /^[0-9]+$/;
		if( value.match(numbers) || value.length == 0 )
		{
			if (parseInt(value) <= 254 || value.length == 0) {
				return true;
			}
		} 
		return false;
	}

	let getCurrIP = () => {  
			let ip  = $('#ip01').val() + "." + $('#ip02').val()  + "." + $('#ip03').val() + "." + $('#ip04').val(); 
			ip = ip.replace("..",".").replace("..",".");
			return ip;
		};

	$("#ip01").focus();   		


});

