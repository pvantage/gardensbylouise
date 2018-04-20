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

function users_menus()
{
	var menu='<ul>';
	menu+='<li><a href="startday.html" class="startdaymenu"><img src="images/timesheet.png" alt="Timer" /><br>Timer </a></li>';
	menu+='<li><a href="my-schedule.html" class="myschedulemenu"><img src="images/job.png" alt="Jobs" /><br>Jobs</a></li>';
	menu+='<li><a href="timesheets.html" class="notificationmenu"><img src="images/tsheet.png" alt="Timesheets" /><br>Timesheets </a></li>';
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
			else if(page=='my-schedule.html'){jQuery('.bottom-nav-bar a.myschedulemenu').addClass('active'); jQuery('.bottom-nav-bar a.myschedulemenu img').attr('src','images/job1.png');}
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
							jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data1.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
							
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
							jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data2.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
							
						 } 
					   });
					}
				}
			});
			
			var q="SELECT * FROM job_times WHERE assigned_to=? AND updateonsite=?";
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
			
			var q="SELECT * FROM job_schedule WHERE user_id=? AND updateonsite=?";
			var cond=[uid,'0'];
			tx.executeSql(q, cond, function(tx, res){
				if(parseInt(res.rows.length)>0){
					for(var i = 0; i < res.rows.length; i++)
					{
						var job_id=res.rows.item(i).job_id;
						var id=res.rows.item(i).id;
						var startfrom=res.rows.item(i).startfrom;
						var job_date=res.rows.item(i).job_date;
						var last_job_id=res.rows.item(i).last_job_id;
						var cdate=res.rows.item(i).cdate;
						var url=siteurl+'/api/jobs/updatejob_schedule';
						jQuery.ajax({  
						 type: 'POST',  
						 url: url,  
						 dataType: 'json',
						 data: {id:id, user_id:uid, job_id:job_id, startfrom:startfrom, job_date:job_date, last_job_id:last_job_id, cdate:cdate},  
						 crossDomain: true,  
						 beforeSend: function() {
										
						 },		
						 complete: function() {
									
						 },
						 success: updatejobdata4,  
						 error: function(response, d, a){
							jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data4.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
							
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
								
								var url=siteurl+'/api/jobs/updatejobforms';
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
									jQuery('body .showmessage').remove();
									var html='<div class="showmessage">Server Error in update data5.</div>';
									jQuery('body').append(html);
									setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
									
								 } 
							   });
							}
						});
					}
					
				}
			});
			
		}
	}
}
updategardenerdata();
function updatejobdata5(res){
	var form_id=res['form_id'];
	if(form_id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_forms SET updateonsite='1' WHERE id='"+form_id+"'");
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
	if(id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_times SET updateonsite='1' WHERE id='"+id+"'");
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
			
		var url=siteurl+'/api/jobs/myassignedjobs';
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
		},  function(){alert('Error in job notes update');}, successDB);
		
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
		
		setTimeout(checkfornewupdates,60000);
	}
}
checkfornewupdates();
function Updatejob_timesheets(res){
     db.transaction(function(tx){
		if(res['data'])
		{
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM job_timesheets WHERE job_time_id=? AND user_id=?";
					tx.executeSql(q, [res['data'][index]['ID'],uid], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							tx.executeSql("UPDATE job_timesheets SET address='"+res['data'][index]['address']+"', mileage='"+res['data'][index]['mileage']+"', reimburse='"+res['data'][index]['reimburse']+"' WHERE job_time_id='"+res['data'][index]['ID']+"' AND user_id='"+uid+"'");	
						}
						else{
							tx.executeSql('INSERT INTO job_timesheets (job_id, customer_id, user_id, job_date, address, customer_name, time_type, start_time, end_time, work_time, mileage, reimburse, job_time_id) VALUES ("'+res['data'][index]['job_id']+'", "'+res['data'][index]['customer_id']+'", "'+res['data'][index]['assigned_to']+'", "'+res['data'][index]['pu_date']+'", "'+res['data'][index]['address']+'", "'+res['data'][index]['full_name']+'", "'+res['data'][index]['time_type']+'", "'+res['data'][index]['start_time']+'", "'+res['data'][index]['end_time']+'", "'+res['data'][index]['work_time']+'", "'+res['data'][index]['mileage']+'", "'+res['data'][index]['reimburse']+'", "'+res['data'][index]['ID']+'")');	
						}
					});
				}
			});
			
		}
						 
		},  function(){alert('Error in job timesheet update');}, successDB);
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
						 
		},  function(){alert('Error in job note update');}, successDB);
}
function Updatejobdata(res){
     db.transaction(function(tx){
		if(res['data'])
		{
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM jobs WHERE job_id=? AND user_id=?";
					tx.executeSql(q, [res['data'][index]['ID'],uid], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							tx.executeSql("UPDATE jobs SET address='"+res['data'][index]['address']+"', customer_id='"+res['data'][index]['customer_id']+"', description='"+res['data'][index]['description']+"', contact_fname='"+res['data'][index]['contact_fname']+"', contact_lname='"+res['data'][index]['contact_lname']+"', contact_email='"+res['data'][index]['contact_email']+"', contact_phone='"+res['data'][index]['contact_phone']+"', job_date='"+res['data'][index]['job_date']+"', start_time='"+res['data'][index]['start_time']+"', lati='"+res['data'][index]['lati']+"', longi='"+res['data'][index]['longi']+"' WHERE job_id='"+res['data'][index]['ID']+"' AND user_id='"+uid+"'");	
						}
						else{
							tx.executeSql('INSERT INTO jobs (job_id, customer_id, address, description, status, contact_fname, contact_lname, contact_email, contact_phone, job_date, start_time,user_id,lati, longi) VALUES ("'+res['data'][index]['ID']+'", "'+res['data'][index]['customer_id']+'", "'+res['data'][index]['address']+'", "'+res['data'][index]['description']+'", "'+res['data'][index]['status']+'", "'+res['data'][index]['contact_fname']+'", "'+res['data'][index]['contact_lname']+'", "'+res['data'][index]['contact_email']+'", "'+res['data'][index]['contact_phone']+'", "'+res['data'][index]['job_date']+'", "'+res['data'][index]['start_time']+'", "'+uid+'", "'+res['data'][index]['lati']+'", "'+res['data'][index]['longi']+'")');	
						}
					});
				}
			});
			
		}
						 
		},  function(){alert('Error in job data update');}, successDB);
}
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
	alert("Error processing SQL: "+err);
	alert("Error processing SQL: "+err.message);
}
function importerrorDB(tx, err) {
	alert("Import Error processing SQL: "+err);
	alert("Error processing SQL: "+err.message);
}
function updateerrorDB(tx, err) {
	alert("Update Error processing SQL: "+err);
	alert("Error processing SQL: "+err.message);
}

// Transaction success callback
//
function successDB() {
   // alert("success!");
}