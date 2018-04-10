var siteurl = "http://vantageappspro.com/gardensbylouise";
var realsiteurl = "http://vantageappspro.com/gardensbylouise/";
function gup(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
function gup2(sParam,url) {
  var results = new RegExp('[\?&]' + sParam + '=([^&#]*)').exec(url);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

function users_menus()
{
	var User_fname=localStorage.getItem('Staff_fname');
	var menu='<ul>';
	<!--menu+='<li><a href="my-schedule.html" class="activityfeedmenu"><i class="fa fa-home" aria-hidden="true"></i><br>Activity</a></li>';-->
	menu+='<li><a href="my-schedule.html" class="myschedulemenu"><img src="images/job.png" alt="Jobs" /><br>Jobs</a></li>';
	//menu+='<li><a href="notification.html"><i class="fa fa-bell" aria-hidden="true"></i><span class="badge badge-danger">9</span><br>Notifications </a></li>';
	menu+='<li><a href="timesheets.html" class="notificationmenu"><img src="images/timesheet.png" alt="Timesheets" /><br>Timesheets </a></li>';
	menu+='<li><a href="logout.html" class="moremenu"><img src="images/logout.png" alt="Logout" /><br>Logout</a></li>';
	menu+='<li><a href="database.html" class="moremenu"><img src="images/logout.png" alt="Logout" /><br>DB</a></li>';
	menu+='</ul>';
	
	return menu;
}

var uid=localStorage.getItem('Staff_ID');
function shownotificationpopup(){
	var uid=localStorage.getItem('Staff_ID');
	var url=siteurl+'/api/jobs/notificationpopup';
	jQuery.ajax({ 
	 type: 'POST',  
	 url: url,  
	 crossDomain: true,
	 data: {user_id:uid},  
	 beforeSend: function() {
	 },		
	 complete: function() {
	 },
	 success: function(res) { 
	   if(jQuery.trim(res)!=''){
	  	jQuery('body .showmessage').remove();
		var html='<div class="showmessage popupnotification">'+res+'</div>';
		jQuery('body').append(html);
		setTimeout(function(){jQuery('.showmessage').slideUp();},5000);
		
	  }
	  setTimeout(shownotificationpopup,10000);
	 },  
	 error: function(response, d, a){
		
	 } 
   });
}
if(typeof uid!='undefine' && uid!='' && uid!=null){

	setTimeout(function(){
		if(jQuery.trim(uid)!='' && uid!=null && typeof uid!='undefined'){
			var menu=users_menus();
			jQuery('.bottom-nav-bar').html(menu);
			var path = window.location.pathname;
			var page = path.split("/").pop();
			if(page=='timesheets.html'){jQuery('.bottom-nav-bar a.notificationmenu').addClass('active'); jQuery('.bottom-nav-bar a.myschedulemenu img').attr('src','images/timesheet1.png');}
			else if(page=='my-schedule.html'){jQuery('.bottom-nav-bar a.myschedulemenu').addClass('active'); jQuery('.bottom-nav-bar a.myschedulemenu img').attr('src','images/job1.png');}
			else if(page=='more.html' || page=='staff.html' || page=='client.html' || page=='task.html'){jQuery('.bottom-nav-bar a.moremenu').addClass('active');}
			/*var url=siteurl+'/api/jobs/unreadnotifications';
			jQuery.ajax({  
			 type: 'POST',  
			 url: url,  
			 data: {uid:uid},  
			 crossDomain: true,  
			 beforeSend: function() {
			 },		
			 complete: function() {
							
			 },
			 success: function(res) {  
			   if(res && parseInt(res)>0){
				   jQuery('.bottom-nav-bar a.notificationmenu').html('<i class="fa fa-bell" aria-hidden="true"></i><span class="badge badge-danger">'+res+'</span><br>Notifications ');
			   }
			 },  
			 error: function(response, d, a){
				jQuery('body .showmessage').remove();
				var html='<div class="showmessage">Server Error.</div>';
				jQuery('body').append(html);
				setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
			 } 
		   });*/
		}
	},1000);
	//shownotificationpopup();
}
function checkloggedin(uid)
{
	
	var url=siteurl+'/api/login/checkloggedin';
	
	jQuery.ajax({  
	 type: 'POST',  
	 url: url,  
	 //contentType: contentType,  
	 dataType: 'json',  
	 data: {uid:uid},  
	 crossDomain: true,  
	 beforeSend: function() {
	 },		
	 complete: function() {
					
	 },
	 success: function(res) {  
	   if(res['loggedin']!='success')
	   {
		window.location='login.html';   
	   }
		else
		{
			window.location='my-schedule.html';	
		}
	 },  
	 error: function(response, d, a){
		jQuery('body .showmessage').remove();
		var html='<div class="showmessage">Server Error.</div>';
		jQuery('body').append(html);
		setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
	 } 
   });
}


function codeLatLng(lat, lng) {
	var geocoder = new google.maps.Geocoder;
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == 'OK') {
        if (results[0]) {
		 localStorage.setItem('Staff_Address',results[0].formatted_address);
        } 
      } 
    });
  }


function showPosition(position) {
	localStorage.setItem('Staff_Lat',position.coords.latitude);
	localStorage.setItem('Staff_Long',position.coords.longitude);
	codeLatLng(position.coords.latitude, position.coords.longitude);
	var uid=localStorage.getItem('Staff_ID');
	
	//alert(uid);
	if(typeof uid!='undefine' && uid!='' && uid!=null && (position.coords.latitude!='' || position.coords.longitude!='')){
		var url=siteurl+'/api/account/updatelatilongi';
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 data: {id:uid,lati:position.coords.latitude,longi:position.coords.longitude},  
		 crossDomain: true,  
		 beforeSend: function() {
						
		 },		
		 complete: function() {
					
		 },
		 success: function(res) {  
		   
		 },  
		 error: function(response, d, a){
			jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error in update location.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
			
		 } 
	   });
		setTimeout(getLocation,30000);
	}
    
}
 function showError(error){
	 alert('Message:' + error.message);
 }
 function getLocation() {
     navigator.geolocation.getCurrentPosition(showPosition, showError);
}
 
 

/*function showNotify(){	
	cordova.plugins.diagnostic.switchToLocationSettings();
	return true;
}
	document.addEventListener("deviceready", onDeviceReady2, false);
	function onDeviceReady2(){
		localStorage.setItem('deviceplatform', device.platform);
		
		cordova.plugins.diagnostic.isLocationAvailable(function(available){
				if(!available)
				{
					navigator.notification.alert(
					"Please enable location services from your settings.",
					showNotify, 
					'Location update failed',
					'SETTINGS'
				);	
				}else{
					//getLocation();
				}
		});		
		
	};*/
var uid=localStorage.getItem('Staff_ID');
		
if(typeof uid!='undefine' && uid!='' && uid!=null){
	var path = window.location.pathname;
	var page = path.split("/").pop();
	if(page=='my-schedule.html'){
		getLocation();
	}
}
function ValidateEmail(inputText)  
{  
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	if(inputText.match(mailformat))  
	{  
		return true;  
	}  
	else  
	{  
		return false;  
	}  
}
function dateformat(date){
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	
	var yyyy = date.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	return yyyy+'-'+mm+'-'+dd;
}