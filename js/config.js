var siteurl = "http://vantageappspro.com/gardensbylouise";
var realsiteurl = "http://vantageappspro.com/gardensbylouise/";
var db = window.openDatabase("Gardensbylouise", "1.0", "Gardens By Louise LLC", 200000);
var days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var times = {'07:00:00':'7:00 AM','07:30:00':'7:30 AM','08:00:00':'8:00 AM','08:30:00':'8:30 AM','09:00:00':'9:00 AM','09:30:00':'9:30 AM','10:00:00':'10:00 AM', '10:30:00':'10:30 AM','11:00:00':'11:00 AM', '11:30:00':'11:30 AM','12:00:00':'12:00 PM','12:30:00':'12:30 PM','13:00:00':'01:00 PM', '13:30:00':'01:30 PM','14:00:00':'02:00 PM','14:30:00':'02:30 PM','15:00:00':'03:00 PM', '15:30:00':'03:30 PM','16:00:00':'04:00 PM','16:30:00':'04:30 PM','17:00:00':'05:00 PM','17:30:00':'05:30 PM','18:00:00':'06:00 PM'};

var d = new Date();
var m=d.getMonth();
if(parseInt(m)<12){m=parseInt(m)+1;}
if(parseInt(m)<10){m='0'+m;}
var d1=d.getDate();
if(parseInt(d1)<10){d1='0'+d1;}
var today=d.getFullYear()+'-'+m+'-'+d1;
function addasecondintime(){
	d = new Date(); // just for example, can be any other time
	myTimeSpan = 1000; // 1 second in milliseconds
	d.setTime(d.getTime() + myTimeSpan);	
	var mint=d.getMinutes();
	if(parseInt(mint)<10){mint='0'+mint;}
	var h=d.getHours();
	if(parseInt(h)<10){h='0'+h;}
	var sec=d.getSeconds();
	if(parseInt(sec)<10){sec='0'+sec;}
	return h+':'+mint+':'+sec;
}
function getcurrenttime(){
	var d = new Date();
	var mint=d.getMinutes();
	if(parseInt(mint)<10){mint='0'+mint;}
	var h=d.getHours();
	if(parseInt(h)<10){h='0'+h;}
	var sec=d.getSeconds();
	if(parseInt(sec)<10){sec='0'+sec;}
	return h+':'+mint+':'+sec;
}
var currenttime=getcurrenttime();
function getdatetime(){
	var d = new Date();
	var mint=d.getMinutes();
	if(parseInt(mint)<10){mint='0'+mint;}
	var h=d.getHours();
	if(parseInt(h)<10){h='0'+h;}
	var sec=d.getSeconds();
	if(parseInt(sec)<10){sec='0'+sec;}
	return today+' '+h+':'+mint+':'+sec;
}
var currentdatetime=getdatetime();

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
var user_type=localStorage.getItem('StaffMem_user_type');
function users_menus()
{
	var menu='<ul>';
	menu+='<li><a href="startday.html" class="startdaymenu"><img src="images/timesheet.png" alt="Timer" /><br>Timer </a></li>';
	if(user_type=='manager' || user_type=='superadmin'){
		menu+='<li><a href="admin-schedule.html" class="myschedulemenu"><img src="images/job.png" alt="Jobs" /><br>Jobs</a></li>';
	}
	else if(user_type=='salesrep'){
		menu+='<li><a href="sales-schedule.html" class="myschedulemenu"><img src="images/job.png" alt="Jobs" /><br>Jobs</a></li>';
	}
	else{
		menu+='<li><a href="my-schedule.html" class="myschedulemenu"><img src="images/job.png" alt="Jobs" /><br>Jobs</a></li>';
	}
	menu+='<li><a href="timesheets.html" class="notificationmenu"><img src="images/tsheet.png" alt="Timesheets" /><br>Timesheets </a></li>';
	menu+='<li><a href="database.html" class="moremenu"><img src="images/srch.png" alt="Logout" /><br>DB</a></li>';
	menu+='<li><a href="logout.html" class="moremenu"><img src="images/logout.png" alt="Logout" /><br>Logout</a></li>';
	menu+='</ul>';
	
	return menu;
}

var uid=localStorage.getItem('StaffMem_ID');
function shownotificationpopup(){
	var uid=localStorage.getItem('StaffMem_ID');
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
if(typeof uid!='undefined' && uid!='' && uid!=null){

	setTimeout(function(){
		if(jQuery.trim(uid)!='' && uid!=null && typeof uid!='undefined'){
			var menu=users_menus();
			jQuery('.bottom-nav-bar').html(menu);
			var path = window.location.pathname;
			var page = path.split("/").pop();
			if(page=='timesheets.html'){jQuery('.bottom-nav-bar a.notificationmenu').addClass('active'); jQuery('.bottom-nav-bar a.notificationmenu img').attr('src','images/tsheet1.png');}
			else if(page=='my-schedule.html' || page=='admin-schedule.html' || page=='sales-schedule.html'){jQuery('.bottom-nav-bar a.myschedulemenu').addClass('active'); jQuery('.bottom-nav-bar a.myschedulemenu img').attr('src','images/job1.png');}
			else if(page=='startday.html' || page=='today-jobs.html'){jQuery('.bottom-nav-bar a.startdaymenu').addClass('active'); jQuery('.bottom-nav-bar a.startdaymenu img').attr('src','images/timesheet1.png');}
			else if(page=='more.html' || page=='staff.html' || page=='client.html' || page=='task.html'){jQuery('.bottom-nav-bar a.moremenu').addClass('active');}
			
		}
	},100);
	//shownotificationpopup();
}

function checkloggedin()
{
	
	db.transaction(checkloginuser, errorDB, successDB);
	function checkloginuser(tx){
		var q="SELECT * FROM userlogin WHERE loggedin=?";
		var cond=[1];
		tx.executeSql(q, cond, function(tx, res){
			if(parseInt(res.rows.length)>0){
				var user_id=res.rows.item(0).user_id;
				localStorage.setItem('StaffMem_ID',user_id);
				window.location='';
			}
			else{
				window.location='login.html';
			}
			
		});
	}
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
	var uid=localStorage.getItem('StaffMem_ID');
	
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
	// alert('Message:' + error.message);
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
var uid=localStorage.getItem('StaffMem_ID');
		
if(typeof uid!='undefine' && uid!='' && uid!=null){
	var path = window.location.pathname;
	var page = path.split("/").pop();
	if(page=='my-schedule.html'){
		//getLocation();
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

document.addEventListener("online", checkfornewupdates, false);
document.addEventListener("online", updategardenerdata, false);
function checkonlineoffline(){
	document.addEventListener("online", checkfornewupdates, false);
	document.addEventListener("online", updategardenerdata, false);
	//checkfornewupdates();
	//updategardenerdata();
}
setInterval(checkonlineoffline,15000);

function updategardenerdata(){
	//var networkState = navigator.connection.type;
	//alert('Connection type: ' + networkState);
	var uid=localStorage.getItem('StaffMem_ID');
	if(typeof uid!='undefine' && uid!='' && uid!=null){
		db.transaction(checkupdateforjobs, updateerrorDB, successDB);
		function checkupdateforjobs(tx){
			var q="SELECT * FROM jobs WHERE user_id=? AND status!=? AND updateonsite=?";
			var cond=[uid,'Assigned','0'];
			tx.executeSql(q, cond, function(tx, res){
				if(parseInt(res.rows.length)>0){
					for(var i = 0; i < res.rows.length; i++)
					{
						var job_id=res.rows.item(i).job_id;
						var id=res.rows.item(i).id;
						var real_date=res.rows.item(i).real_date;
						var real_start_time=res.rows.item(i).real_start_time;
						var real_end_time=res.rows.item(i).real_end_time;
						var status=res.rows.item(i).status;
						var url=siteurl+'/api/jobs/updatejobs';
						jQuery.ajax({  
						 type: 'POST',  
						 url: url,  
						 dataType: 'json',
						 data: {id:id,user_id:uid,job_id:job_id,real_date:real_date,real_start_time:real_start_time,real_end_time:real_end_time,status:status},  
						 crossDomain: true,  
						 beforeSend: function() {
										
						 },		
						 complete: function() {
									
						 },
						 success: updatejobdata1,  
						 error: function(response, d, a){
							/*jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data1.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
							
						 } 
					   });
					}
				}
			});
			
			
			var q="SELECT * FROM job_notifications WHERE user_id=? AND nfrom=? AND updateonsite=?";
			var cond=[uid,'app','0'];
			tx.executeSql(q, cond, function(tx, res){
				if(parseInt(res.rows.length)>0){
					for(var i = 0; i < res.rows.length; i++)
					{
						var job_id=res.rows.item(i).job_id;
						var id=res.rows.item(i).id;
						var nfrom=res.rows.item(i).nfrom;
						var title=res.rows.item(i).title;
						var message=res.rows.item(i).message;
						var cdate=res.rows.item(i).cdate;
						var url=siteurl+'/api/jobs/updatenotes';
						jQuery.ajax({  
						 type: 'POST',  
						 url: url,  
						 dataType: 'json',
						 data: {id:id, user_id:uid, job_id:job_id, nfrom:nfrom, title:title, message:message, cdate:cdate},  
						 crossDomain: true,  
						 beforeSend: function() {
										
						 },		
						 complete: function() {
									
						 },
						 success: updatejobdata2,  
						 error: function(response, d, a){
							/*jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data2.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
							
						 } 
					   });
					}
				}
			});
			
			var q="SELECT * FROM job_times WHERE assigned_to=? AND updateonsite=? ORDER BY id ASC";
			var cond=[uid,'0'];
			tx.executeSql(q, cond, function(tx, res){
				if(parseInt(res.rows.length)>0){
					for(var i = 0; i < res.rows.length; i++)
					{
						var job_id=res.rows.item(i).job_id;
						var id=res.rows.item(i).id;
						var start_time=res.rows.item(i).start_time;
						var pu_date=res.rows.item(i).pu_date;
						var end_time=res.rows.item(i).end_time;
						var time_type=res.rows.item(i).time_type;
						var cdate=res.rows.item(i).cdate;
						var url=siteurl+'/api/jobs/updatejob_times';
						jQuery.ajax({  
						 type: 'POST',  
						 url: url,  
						 dataType: 'json',
						 data: {id:id, user_id:uid, job_id:job_id, start_time:start_time, pu_date:pu_date, end_time:end_time, cdate:cdate, time_type:time_type},  
						 crossDomain: true,  
						 beforeSend: function() {
										
						 },		
						 complete: function() {
									
						 },
						 success: updatejobdata3,  
						 error: function(response, d, a){
							jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data3.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
							
						 } 
					   });
					}
				}
			});
			var q="SELECT * FROM job_times WHERE assigned_to=? AND site_job_time_id!=? AND end_time!=? AND updatedendtime=? ORDER BY id ASC";
			var cond=[uid,'0','00:00:00','0'];
			tx.executeSql(q, cond, function(tx, res){
				if(parseInt(res.rows.length)>0){
					for(var i = 0; i < res.rows.length; i++)
					{
						var id=res.rows.item(i).id;
						var end_time=res.rows.item(i).end_time;
						var site_job_time_id=res.rows.item(i).site_job_time_id;
						var url=siteurl+'/api/jobs/updatejob_timeendtimes';
						jQuery.ajax({  
						 type: 'POST',  
						 url: url,  
						 dataType: 'json',
						 data: {id:id, end_time:end_time,site_job_time_id:site_job_time_id},  
						 crossDomain: true,  
						 beforeSend: function() {
										
						 },		
						 complete: function() {
									
						 },
						 success: updatejobdata31,  
						 error: function(response, d, a){
							/*jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data3.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
							
						 } 
					   });
					}
				}
			});
			var q="SELECT * FROM job_schedule WHERE user_id=? AND updateonsite=? ORDER BY id ASC";
			var cond=[uid,'0'];
			tx.executeSql(q, cond, function(tx, res){
				if(parseInt(res.rows.length)>0){
					for(var i = 0; i < res.rows.length; i++)
					{
						var job_id=res.rows.item(i).job_id;
						var id=res.rows.item(i).id;
						var startfrom=res.rows.item(i).startfrom;
						var endto=res.rows.item(i).endto;
						var job_date=res.rows.item(i).job_date;
						var last_job_id=res.rows.item(i).last_job_id;
						var cdate=res.rows.item(i).cdate;
						var url=siteurl+'/api/jobs/updatejob_schedule';
						jQuery.ajax({  
						 type: 'POST',  
						 url: url,  
						 dataType: 'json',
						 data: {id:id, user_id:uid, job_id:job_id, startfrom:startfrom, endto:endto, job_date:job_date, last_job_id:last_job_id, cdate:cdate},  
						 crossDomain: true,  
						 beforeSend: function() {
										
						 },		
						 complete: function() {
									
						 },
						 success: updatejobdata4,  
						 error: function(response, d, a){
							/*jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data4.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
							
						 } 
					   });
					}
				}
			});
			
			var q="SELECT * FROM job_forms WHERE add_by=? AND form_title=? AND updateonsite=?";
			var cond=[uid,'jobform','0'];
			tx.executeSql(q, cond, function(tx, res2){
				if(parseInt(res2.rows.length)>0){
					
					for(var i = 0; i < res2.rows.length; i++)
					{
						var form_id=res2.rows.item(i).id;
						var job_id=res2.rows.item(i).job_id;
						var form_title=res2.rows.item(i).form_title;
						var cdate=res2.rows.item(i).cdate;
						var udate=res2.rows.item(i).udate;
						var q2="SELECT * FROM job_form_values WHERE form_id=?";
						var cond2=[form_id];
						tx.executeSql(q2, cond2, function(tx, res3){
							if(parseInt(res3.rows.length)>0){
								
								var formdata=[];
								for(var j = 0; j < res3.rows.length; j++)
								{
									var singlerow={field_key:res3.rows.item(j).field_key, field_value:res3.rows.item(j).field_value, field_type:res3.rows.item(j).field_type};
									formdata.push(singlerow);
								}
								
								var url=siteurl+'/api/jobs/addjobforms';
								jQuery.ajax({  
								 type: 'POST',  
								 url: url,  
								 dataType: 'json',
								 data: {form_id:form_id, user_id:uid, job_id:job_id, form_title:form_title, cdate:cdate, udate:udate, formdata:formdata},  
								 crossDomain: true,  
								 beforeSend: function() {
												
								 },		
								 complete: function() {
											
								 },
								 success: updatejobdata5,  
								 error: function(response, d, a){
									/*jQuery('body .showmessage').remove();
									var html='<div class="showmessage">Server Error in update data5.</div>';
									jQuery('body').append(html);
									setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
									
								 } 
							   });
							}
						});
					}
					
				}
			});
			
			var q="SELECT * FROM job_forms WHERE add_by=? AND form_title=? AND updatenow=? AND updateonsite=?";
			var cond=[uid,'jobform','1','1'];
			tx.executeSql(q, cond, function(tx, res2){
				if(parseInt(res2.rows.length)>0){
					
					for(var i = 0; i < res2.rows.length; i++)
					{
						var form_id=res2.rows.item(i).id;
						var job_id=res2.rows.item(i).job_id;
						var form_title=res2.rows.item(i).form_title;
						var cdate=res2.rows.item(i).cdate;
						var udate=res2.rows.item(i).udate;
						var site_form_id=res2.rows.item(i).site_form_id;
						var q2="SELECT * FROM job_form_values WHERE form_id=?";
						var cond2=[form_id];
						tx.executeSql(q2, cond2, function(tx, res3){
							if(parseInt(res3.rows.length)>0){
								
								var formdata=[];
								for(var j = 0; j < res3.rows.length; j++)
								{
									var singlerow={field_key:res3.rows.item(j).field_key, field_value:res3.rows.item(j).field_value, field_type:res3.rows.item(j).field_type};
									formdata.push(singlerow);
								}
								//alert(JSON.stringify(formdata));
								var url=siteurl+'/api/jobs/updatejobforms';
								jQuery.ajax({  
								 type: 'POST',  
								 url: url,  
								 dataType: 'json',
								 data: {form_id:form_id, user_id:uid, job_id:job_id, form_title:form_title, cdate:cdate, udate:udate, formdata:formdata, site_form_id:site_form_id},  
								 crossDomain: true,  
								 beforeSend: function() {
												
								 },		
								 complete: function() {
											
								 },
								 success: updatejobdata6,  
								 error: function(response, d, a){
									/*jQuery('body .showmessage').remove();
									var html='<div class="showmessage">Server Error in update data5.</div>';
									jQuery('body').append(html);
									setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
									
								 } 
							   });
							}
						});
					}
					
				}
			});
			
			var q="SELECT * FROM job_totaltime WHERE staff_id=? AND updateonsite=?";
			var cond=[uid,'0'];
			tx.executeSql(q, cond, function(tx, res2){
				if(parseInt(res2.rows.length)>0){
					
					for(var i = 0; i < res2.rows.length; i++)
					{
						var time_id=res2.rows.item(i).id;
						var job_id=res2.rows.item(i).job_id;
						var staff_id=res2.rows.item(i).staff_id;
						var job_date=res2.rows.item(i).job_date;
						var start_time=res2.rows.item(i).start_time;
						var end_time=res2.rows.item(i).end_time;
						var cdate=res2.rows.item(i).cdate;
						
						var url=siteurl+'/api/jobs/updatejobtotaltime';
						jQuery.ajax({  
						 type: 'POST',  
						 url: url,  
						 dataType: 'json',
						 data: {time_id:time_id, staff_id:staff_id, job_id:job_id, job_date:job_date, start_time:start_time, end_time:end_time, cdate:cdate},  
						 crossDomain: true,  
						 beforeSend: function() {
										
						 },		
						 complete: function() {
									
						 },
						 success: updatejobdata7,  
						 error: function(response, d, a){
							/*jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data5.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
							
						 } 
					   });
							
					}
					
				}
			});
			
			var q="SELECT * FROM job_daytimes WHERE user_id=? AND updateonsite=? AND status=?";
			var cond=[uid,'0','complete'];
			tx.executeSql(q, cond, function(tx, res2){
				if(parseInt(res2.rows.length)>0){
					
					for(var i = 0; i < res2.rows.length; i++)
					{
						var id=res2.rows.item(i).id;
						var start_date=res2.rows.item(i).start_date;
						var user_id=res2.rows.item(i).user_id;
						var start_time=res2.rows.item(i).start_time;
						var end_time=res2.rows.item(i).end_time;
						
						var url=siteurl+'/api/jobs/updatejobdaytimes';
						jQuery.ajax({  
						 type: 'POST',  
						 url: url,  
						 dataType: 'json',
						 data: {id:id, start_date:start_date, user_id:user_id, start_time:start_time, end_time:end_time},  
						 crossDomain: true,  
						 beforeSend: function() {
										
						 },		
						 complete: function() {
									
						 },
						 success: updatejobdata8,  
						 error: function(response, d, a){
							/*jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data5.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
							
						 } 
					   });
							
					}
					
				}
			});
		}
	}
}
//updategardenerdata();
function updatejobdata8(res){
	var id=res['id'];
	var site_id=res['site_id'];
	if(id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_daytimes SET updateonsite='"+site_id+"' WHERE id='"+id+"'");
		});
	}
}
function updatejobdata7(res){
	var time_id=res['time_id'];
	var site_id=res['site_id'];
	var total_time=res['total_time'];
	if(time_id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_totaltime SET updateonsite='"+site_id+"', total_time='"+total_time+"' WHERE id='"+time_id+"'");
		});
	}
}
function updatejobdata6(res){
	var form_id=res['form_id'];
	
	if(form_id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_forms SET updatenow='0' WHERE id='"+form_id+"'");
		});
	}
}
function updatejobdata5(res){
	var form_id=res['form_id'];
	if(form_id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_forms SET updateonsite='1', site_form_id='"+res['fid']+"' WHERE id='"+form_id+"'");
		});
	}
}
function updatejobdata4(res){
	var id=res['id'];
	if(id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_schedule SET updateonsite='1' WHERE id='"+id+"'");
		});
	}
}
function updatejobdata3(res){
	var id=res['id'];
	var site_job_time_id=res['site_job_time_id'];
	if(id!='0' && site_job_time_id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_times SET updateonsite='1', site_job_time_id='"+site_job_time_id+"' WHERE id='"+id+"'");
		});
	}
}
function updatejobdata31(res){
	var id=res['id'];
	if(id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_times SET updatedendtime='1' WHERE id='"+id+"'");
		});
	}
}
function updatejobdata2(res){
	var id=res['id'];
	if(id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_notifications SET updateonsite='1' WHERE id='"+id+"'");
		});
	}
}
function updatejobdata1(res){
	var id=res['id'];
	if(id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE jobs SET updateonsite='1' WHERE id='"+id+"'");
		});
	}
}
function checkfornewupdates(){
	
	var uid=localStorage.getItem('StaffMem_ID');
	if(typeof uid!='undefine' && uid!='' && uid!=null){
			
		var url=siteurl+'/api/jobs/assignedusers';
		jQuery.ajax({  
			type: 'POST',  
			url: url,           
			dataType: 'json',  
			crossDomain: true,
			data: {assigned_to:uid, status:'Assigned'}, 
			beforeSend: function() {
			
			},		
			complete: function() {
			}, 
			crossDomain: true,  
			success: Updatejobdata,  
			error: function(response, d, a){
			
			/*jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error1.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
			return false; 
			}
		});
	
		var url=siteurl+'/api/jobs/unassignedjobs';
		jQuery.ajax({  
			type: 'POST',  
			url: url,           
			dataType: 'json',  
			crossDomain: true,
			data: {}, 
			beforeSend: function() {
			
			},		
			complete: function() {
			}, 
			crossDomain: true,  
			success: Updateremovejobdata,  
			error: function(response, d, a){
			
			/*jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error2.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
			return false; 
			}
		});
		db.transaction(function(tx){
		
			var q="SELECT * FROM jobs WHERE status!=?";
			tx.executeSql(q, ['Completed'], function(tx, rest){
				var jobids='';
			 	if(parseInt(rest.rows.length)>0){
					for(var i = 0; i < rest.rows.length; i++)
					{
						if(i==0){jobids=rest.rows.item(i).job_id;}
						else{jobids+=','+rest.rows.item(i).job_id;}
					}
				}
				if(jQuery.trim(jobids)!=''){
					var url=siteurl+'/api/jobs/jobnotes';
						jQuery.ajax({  
							type: 'POST',  
							url: url,           
							dataType: 'json',  
							crossDomain: true,
							data: {job_ids:jobids}, 
							beforeSend: function() {
							
							},		
							complete: function() {
							}, 
							crossDomain: true,  
							success: Updatejobnotesdata,  
							error: function(response, d, a){
							
							/*jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error3</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
							return false; 
							}
						});
				}
			});
		},  function(){
			//alert('Error in job notes update');
			}, successDB);
		
		db.transaction(function(tx){
		
			var q="SELECT * FROM jobs WHERE user_id=?";
			tx.executeSql(q, [uid], function(tx, rest){
				var jobids='';
			 	if(parseInt(rest.rows.length)>0){
					for(var i = 0; i < rest.rows.length; i++)
					{
						if(i==0){jobids=rest.rows.item(i).job_id;}
						else{jobids+=','+rest.rows.item(i).job_id;}
					}
				}
				if(jQuery.trim(jobids)!=''){
					var url=siteurl+'/api/jobs/checkforjobexists';
						jQuery.ajax({  
							type: 'POST',  
							url: url,           
							dataType: 'json',  
							crossDomain: true,
							data: {job_ids:jobids,uid:uid}, 
							beforeSend: function() {
							},		
							complete: function() {
							}, 
							crossDomain: true,  
							success: Updatejobexists,  
							error: function(response, d, a){
							
							jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error3</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
							return false; 
							}
						});
				}
			});
		},  function(){
			//alert('Error in exist jobs update');
			}, successDB);
		
		db.transaction(function(tx){
		
			var q="SELECT * FROM jobs WHERE status!=?";
			tx.executeSql(q, ['Assigned'], function(tx, rest){
				var jobids='';
			 	if(parseInt(rest.rows.length)>0){
					for(var i = 0; i < rest.rows.length; i++)
					{
						if(i==0){jobids=rest.rows.item(i).job_id;}
						else{jobids+=','+rest.rows.item(i).job_id;}
					}
				}
				if(jQuery.trim(jobids)!=''){
					var url=siteurl+'/api/jobs/jobformdata';
						jQuery.ajax({  
							type: 'POST',  
							url: url,           
							dataType: 'json',  
							crossDomain: true,
							data: {job_ids:jobids, add_by:uid}, 
							beforeSend: function() {
							
							},		
							complete: function() {
							}, 
							crossDomain: true,  
							success: Updatejobformsdata,  
							error: function(response, d, a){
							
							/*jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error3</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
							return false; 
							}
						});
				}
			});
		},  function(){
			//alert('Error in job form update');
			}, successDB);
		
		var url=siteurl+'/api/jobs/job_timesheets';
		jQuery.ajax({  
			type: 'POST',  
			url: url,           
			dataType: 'json',  
			crossDomain: true,
			data: {user_id:uid}, 
			beforeSend: function() {
			
			},		
			complete: function() {
			}, 
			crossDomain: true,  
			success: Updatejob_timesheets,  
			error: function(response, d, a){
			
			/*jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error4.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
			return false; 
			}
		});
		
		var url=siteurl+'/api/jobs/job_totaltime';
		jQuery.ajax({  
			type: 'POST',  
			url: url,           
			dataType: 'json',  
			crossDomain: true,
			data: {user_id:uid}, 
			beforeSend: function() {
			
			},		
			complete: function() {
			}, 
			crossDomain: true,  
			success: Updatejob_totaltime,  
			error: function(response, d, a){
			
			/*jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error4.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
			return false; 
			}
		});
		/*var synjobs=localStorage.getItem('StaffMem_synjobs');
		if(typeof synjobs!='undefined' || synjobs=='' || synjobs==null){
			setTimeout(checkfornewupdates,30000);
		}*/
	}
}
function Updatejob_totaltime(res){
	db.transaction(function(tx){
		if(typeof res['data']!='undefined')
		{
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM job_totaltime WHERE updateonsite=?";
					var id=res['data'][index]['ID'];
					tx.executeSql(q, [id], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							tx.executeSql("UPDATE job_totaltime SET total_time='"+res['data'][index]['total_time']+"' WHERE updateonsite='"+id+"'");
						}
						
					});
				}
			});
			
		}
						 
		},  function(){
			//alert('Error in exist job update');
			}, successDB);
}
//checkfornewupdates();
function Updatejobexists(res){
	//alert(JSON.stringify(res));
	db.transaction(function(tx){
		if(typeof res['jobs']!='undefined')
		{
			jQuery(res['jobs']).each(function(index){
				if(typeof res['jobs'][index]!='undefined'){
					var q="SELECT * FROM jobs WHERE job_id=? AND user_id=?";
					var job_id=res['jobs'][index]['job_id'];
					tx.executeSql(q, [job_id,uid], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							tx.executeSql("DELETE FROM jobs WHERE job_id='"+job_id+"' AND user_id='"+uid+"'");	
							tx.executeSql("DELETE FROM job_times WHERE job_id='"+job_id+"' AND assigned_to='"+uid+"'");
							tx.executeSql("DELETE FROM job_daytimes WHERE job_id='"+job_id+"' AND user_id='"+uid+"'");
							tx.executeSql("DELETE FROM job_schedule WHERE job_id='"+job_id+"' AND user_id='"+uid+"'");
							tx.executeSql("DELETE FROM job_forms WHERE job_id='"+job_id+"' AND add_by='"+uid+"'");
							tx.executeSql("DELETE FROM job_notifications WHERE job_id='"+job_id+"' AND user_id='"+uid+"'");
							tx.executeSql("DELETE FROM job_timesheets WHERE job_id='"+job_id+"' AND user_id='"+uid+"'");
							tx.executeSql("DELETE FROM job_totaltime WHERE job_id='"+job_id+"' AND staff_id='"+uid+"'");
						}
						
					});
				}
			});
			
		}
						 
		},  function(){
			//alert('Error in exist job update');
			}, successDB);
}
function Updatejob_timesheets(res){
     db.transaction(function(tx){
		if(res['data'])
		{
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM job_timesheets WHERE job_time_id=? AND user_id=?";
					tx.executeSql(q, [res['data'][index]['ID'],uid], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							tx.executeSql("UPDATE job_timesheets SET address='"+res['data'][index]['address']+"',from_address='"+res['data'][index]['address_from']+"',address_to='"+res['data'][index]['address_to']+"', mileage='"+res['data'][index]['mileage']+"', end_time='"+res['data'][index]['end_time']+"', reimburse='"+res['data'][index]['reimburse']+"', lastone='"+res['data'][index]['lastone']+"', customer_name='"+res['data'][index]['customer_name']+"' WHERE id='"+res['data'][index]['updateonapp']+"' AND user_id='"+uid+"'");	
						}
						else{
							tx.executeSql('INSERT INTO job_timesheets (job_id, customer_id, user_id, job_date, address, customer_name, time_type, start_time, end_time, work_time, mileage, reimburse, job_time_id, from_address, address_to,lastone) VALUES ("'+res['data'][index]['job_id']+'", "'+res['data'][index]['customer_id']+'", "'+res['data'][index]['assigned_to']+'", "'+res['data'][index]['pu_date']+'", "'+res['data'][index]['address']+'", "'+res['data'][index]['full_name']+'", "'+res['data'][index]['time_type']+'", "'+res['data'][index]['start_time']+'", "'+res['data'][index]['end_time']+'", "'+res['data'][index]['work_time']+'", "'+res['data'][index]['mileage']+'", "'+res['data'][index]['reimburse']+'", "'+res['data'][index]['ID']+'", "'+res['data'][index]['address_from']+'", "'+res['data'][index]['address_to']+'", "'+res['data'][index]['lastone']+'")');	
						}
					});
				}
			});
			
		}
						 
		},  function(){
			//alert('Error in job timesheet update');
			}, successDB);
}
function Updatejobformsdata(res){
	
	db.transaction(function(tx){
		if(typeof res['data']!='undefined')
		{
			
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM job_forms WHERE site_form_id=? AND job_id=?";
					//alert(res['data'][index]['ID']);
					//alert(JSON.stringify(res['data'][index]));
					tx.executeSql(q, [res['data'][index]['ID'],res['data'][index]['job_id']], function(tx, rest){
							if(parseInt(rest.rows.length)>0){
								var fid=rest.rows.item(0).id;
								var q="UPDATE job_forms SET udate='"+res['data'][index]['udate']+"' WHERE site_form_id='"+res['data'][index]['ID']+"' AND id='"+fid+"'";
								//alert(q);
								tx.executeSql(q);	
								jQuery(res['data'][index]['formdata']).each(function(index2){
									if(typeof res['data'][index]['formdata'][index2]!='undefined'){
										//job_id integer, form_id integer, field_key text, field_type text, field_value
										var field_key=res['data'][index]['formdata'][index2]['field_key'];
										var field_value=res['data'][index]['formdata'][index2]['field_value'];
										var q="UPDATE job_form_values SET field_value='"+field_value+"' WHERE field_key='"+field_key+"' AND form_id='"+fid+"'";
										//alert(q);
										tx.executeSql(q);
									}
								});
							}
							
					});
				}
			});
			
		}
						 
	},  function(){
		//alert('Error in job form update');
		}, successDB);
}
function Updatejobnotesdata(res){
     db.transaction(function(tx){
		if(res['data'])
		{
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM job_notifications WHERE job_notification_id=?";
					tx.executeSql(q, [res['data'][index]['ID']], function(tx, rest){
						if(res['data'][index]['title']!='Form' && res['data'][index]['nfrom']!='app'){
							if(parseInt(rest.rows.length)>0){
								tx.executeSql("UPDATE job_notifications SET title='"+res['data'][index]['title']+"', message='"+res['data'][index]['message']+"', add_by='"+res['data'][index]['add_by']+"' WHERE job_notification_id='"+res['data'][index]['ID']+"'");	
							}
							else{
								tx.executeSql('INSERT INTO job_notifications (job_id, job_notification_id, title, message, add_by, cdate, nfrom, user_id) VALUES ("'+res['data'][index]['job_id']+'", "'+res['data'][index]['ID']+'", "'+res['data'][index]['title']+'", "'+res['data'][index]['message']+'", "'+res['data'][index]['add_by']+'", "'+res['data'][index]['cdate']+'", "site", "'+res['data'][index]['user_id']+'")');	
							}
						}
					});
				}
			});
			
		}
						 
	},  function(){
		//alert('Error in job note update');
		}, successDB);
}
function Updatejobdata(res){
     db.transaction(function(tx){
		if(typeof res['data']!='undefined')
		{
			//alert(JSON.stringify(res['data']));
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM jobs WHERE job_id=?";
					//alert(uid+'='+res['data'][index]['ID']);
					var jobassigned=res['data'][index]['jobassigned'];
					//alert(JSON.stringify(res['data'][index]['jobassigned']))
					tx.executeSql(q, [res['data'][index]['ID']], function(tx, rest){
						var for_u=0;
						var assignedto=0;
						
						if(parseInt(rest.rows.length)>0){
							var qr="UPDATE jobs SET address='"+res['data'][index]['address']+"', customer_id='"+res['data'][index]['customer_id']+"', description='"+res['data'][index]['description']+"', contact_fname='"+res['data'][index]['contact_fname']+"', contact_lname='"+res['data'][index]['contact_lname']+"', contact_email='"+res['data'][index]['contact_email']+"', contact_phone='"+res['data'][index]['contact_phone']+"', job_date='"+res['data'][index]['job_date']+"', start_time='"+res['data'][index]['start_time']+"', lati='"+res['data'][index]['lati']+"', longi='"+res['data'][index]['longi']+"', listtype='"+res['data'][index]['listtype']+"', for_u='"+for_u+"', jobstatus='"+res['data'][index]['status']+"', sales_person_id='"+res['data'][index]['sales_person_id']+"' WHERE job_id='"+res['data'][index]['ID']+"'";
							//alert(qr);
							tx.executeSql(qr);	
						}
						else{
							var qr='INSERT INTO jobs (job_id, customer_id, address, description, status, contact_fname, contact_lname, contact_email, contact_phone, job_date, start_time,user_id,lati, longi, listtype, add_by, for_u, jobstatus, sales_person_id) VALUES ("'+res['data'][index]['ID']+'", "'+res['data'][index]['customer_id']+'", "'+res['data'][index]['address']+'", "'+res['data'][index]['description']+'", "'+res['data'][index]['status']+'", "'+res['data'][index]['contact_fname']+'", "'+res['data'][index]['contact_lname']+'", "'+res['data'][index]['contact_email']+'", "'+res['data'][index]['contact_phone']+'", "'+res['data'][index]['job_date']+'", "'+res['data'][index]['start_time']+'", "'+assignedto+'", "'+res['data'][index]['lati']+'", "'+res['data'][index]['longi']+'", "'+res['data'][index]['listtype']+'", "'+res['data'][index]['add_by']+'", "'+for_u+'", "'+res['data'][index]['status']+'", "'+res['data'][index]['sales_person_id']+'")';
							tx.executeSql(qr);	
						}
						var q="DELETE FROM job_assigned WHERE job_id='"+res['data'][index]['ID']+"'";
						tx.executeSql(q);
						if(typeof jobassigned!='undefined'){
							jQuery(jobassigned).each(function(index2){
								if(uid==jobassigned[index2]['assigned_to'])
								{
									var qr="UPDATE jobs SET for_u='1', user_id='"+uid+"' WHERE job_id='"+res['data'][index]['ID']+"'";
									tx.executeSql(qr);
								}
								var qr='INSERT INTO job_assigned (job_id, assigned_to, pu_date, start_time, end_time, staffname) VALUES ("'+jobassigned[index2]['job_id']+'", "'+jobassigned[index2]['assigned_to']+'", "'+jobassigned[index2]['pu_date']+'", "'+jobassigned[index2]['start_time']+'", "'+jobassigned[index2]['end_time']+'", "'+jobassigned[index2]['staffname']+'")';
								tx.executeSql(qr);
							});
						}
					});
				}
			});
			
		}
						 
		},  function(){
			//alert('Error in job data update');
			}, successDB);
}
/*function Updatejobdata(res){
     db.transaction(function(tx){
		if(typeof res['data']!='undefined')
		{
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM jobs WHERE job_id=? AND user_id=?";
					//alert(uid+'='+res['data'][index]['ID']);
					tx.executeSql(q, [res['data'][index]['ID'],uid], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							var qr="UPDATE jobs SET address='"+res['data'][index]['address']+"', customer_id='"+res['data'][index]['customer_id']+"', description='"+res['data'][index]['description']+"', contact_fname='"+res['data'][index]['contact_fname']+"', contact_lname='"+res['data'][index]['contact_lname']+"', contact_email='"+res['data'][index]['contact_email']+"', contact_phone='"+res['data'][index]['contact_phone']+"', job_date='"+res['data'][index]['job_date']+"', start_time='"+res['data'][index]['start_time']+"', lati='"+res['data'][index]['lati']+"', longi='"+res['data'][index]['longi']+"', listtype='"+res['data'][index]['listtype']+"' WHERE job_id='"+res['data'][index]['ID']+"' AND user_id='"+uid+"'";
							//alert(qr);
							tx.executeSql(qr);	
						}
						else{
							var qr='INSERT INTO jobs (job_id, customer_id, address, description, status, contact_fname, contact_lname, contact_email, contact_phone, job_date, start_time,user_id,lati, longi, listtype, add_by) VALUES ("'+res['data'][index]['ID']+'", "'+res['data'][index]['customer_id']+'", "'+res['data'][index]['address']+'", "'+res['data'][index]['description']+'", "'+res['data'][index]['status']+'", "'+res['data'][index]['contact_fname']+'", "'+res['data'][index]['contact_lname']+'", "'+res['data'][index]['contact_email']+'", "'+res['data'][index]['contact_phone']+'", "'+res['data'][index]['job_date']+'", "'+res['data'][index]['start_time']+'", "'+uid+'", "'+res['data'][index]['lati']+'", "'+res['data'][index]['longi']+'", "'+res['data'][index]['listtype']+'", "'+res['data'][index]['add_by']+'")';
							
							tx.executeSql(qr);	
						}
					});
				}
			});
			
		}
						 
		},  function(){
			//alert('Error in job data update');
			}, successDB);
}*/
function Updateremovejobdata(res){
     db.transaction(function(tx){
		if(res['data'])
		{
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="DELETE FROM jobs WHERE job_id='"+res['data'][index]['ID']+"' AND user_id='"+uid+"'";
					tx.executeSql(q);
				}
			});
			
		}
						 
		},  importerrorDB, successDB);
}

function errorDB(tx, err) {
	//alert("Error processing SQL: "+err);
	//alert("Error processing SQL: "+err.message);
}
function importerrorDB(tx, err) {
	//alert("Import Error processing SQL: "+err);
	//alert("Error processing SQL: "+err.message);
}
function updateerrorDB(tx, err) {
	//alert("Update Error processing SQL: "+err);
	//alert("Error processing SQL: "+err.message);
}

// Transaction success callback
//
function successDB() {
   // alert("success!");
}