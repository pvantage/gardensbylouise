
//document.addEventListener("deviceready", onDeviceReady, false);
// Cordova is ready
//function onDeviceReady() {
	db.transaction(populateDB, errorCB, successCB);
//}

    // Populate the database 
    //
    function populateDB(tx) {
		/*tx.executeSql('DROP TABLE IF EXISTS jobs');
		tx.executeSql('DROP TABLE IF EXISTS job_times');
		tx.executeSql('DROP TABLE IF EXISTS job_mileage');
		tx.executeSql('DROP TABLE IF EXISTS job_daytimes');
		tx.executeSql('DROP TABLE IF EXISTS job_forms');
		tx.executeSql('DROP TABLE IF EXISTS job_form_values');
		tx.executeSql('DROP TABLE IF EXISTS job_notifications');
		tx.executeSql('DROP TABLE IF EXISTS userlogin');
		tx.executeSql('DROP TABLE IF EXISTS job_schedule');
		tx.executeSql('DROP TABLE IF EXISTS job_timesheets');*/
		
		tx.executeSql('CREATE TABLE IF NOT EXISTS userlogin (id integer primary key autoincrement, user_id integer, lastlogin_time datetime, loggedin integer, fname text, lname text, user_type text)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS jobs (id integer primary key autoincrement, job_id integer, customer_id integer, address text, description text, status text, contact_fname text, contact_lname text, contact_email text, contact_phone text, job_date date, start_time time, real_date date DEFAULT "0000:00:00", real_start_time time DEFAULT "00:00:00", real_end_time time DEFAULT "00:00:00", lati text, longi text, user_id integer, updateonsite integer DEFAULT "0")');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS job_times (id integer primary key autoincrement, job_id integer DEFAULT "0", assigned_to integer, pu_date date, start_time time, end_time time DEFAULT "00:00:00", time_type text, cdate datetime, updateonsite integer DEFAULT "0", site_job_time_id integer DEFAULT "0", updatedendtime integer DEFAULT "0")');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS job_daytimes (id integer primary key autoincrement, job_id integer DEFAULT "0", start_date date, start_time time, end_time time DEFAULT "00:00:00", user_id integer, updateonsite integer DEFAULT "0", status text DEFAULT "pending")');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS job_schedule (id integer primary key autoincrement, job_id integer, startfrom text, job_date date, last_job_id integer, user_id integer, cdate datetime, updateonsite integer DEFAULT "0")');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS job_forms (id integer primary key autoincrement, job_id integer, add_by integer, form_title text, cdate datetime, udate datetime DEFAULT "0000:00:00 00:00:00", updateonsite integer DEFAULT "0")');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS job_form_values (id integer primary key autoincrement, job_id integer, form_id integer, field_key text, field_type text, field_value text)');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS job_notifications (id integer primary key autoincrement, job_id integer, job_notification_id integer, title text, message text, add_by text, cdate datetime, nfrom text, user_id integer, updateonsite integer DEFAULT "0")');
		 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS job_timesheets (id integer primary key autoincrement, job_id integer, customer_id integer, user_id integer, job_date date, address text, customer_name text, time_type text, start_time time, end_time time, work_time time, mileage float, reimburse float, job_time_id integer DEFAULT "0")');
         
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL1: "+err);
		alert("Error processing SQL2: "+err.code);
		alert("Error processing SQL3: "+err.message);
    }

    // Transaction success callback
    //
    function successCB() {
       // alert("success!");
    }
