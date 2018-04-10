
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
	var db = window.openDatabase("Database", "1.0", "gardensbylouise", 200000);
	db.transaction(populateDB, errorCB, successCB);
}

    // Populate the database 
    //
    function populateDB(tx) {
         tx.executeSql('CREATE TABLE IF NOT EXISTS jobs (id integer primary key, job_id integer, address text, description text, status text, contact_fname text, contact_lname text, contact_email text, contact_phone text, job_date text, start_time text)');
         tx.executeSql('INSERT INTO jobs (job_id, address, description, status, contact_fname, contact_lname, contact_email, contact_phone, job_date, start_time) VALUES (1, "Mohali, punjab, India", "Test", "Assigned", "Rinku", "kamboj", "rikamboj@fmail.com", "6456542", "2018-04-04", "13:00:00")');
         tx.executeSql('INSERT INTO jobs (job_id, address, description, status, contact_fname, contact_lname, contact_email, contact_phone, job_date, start_time) VALUES (2, "Mohali, punjab, India", "Test", "Assigned", "Rinku", "kamboj", "rikamboj@fmail.com", "6456542", "2018-04-04", "13:00:00")');
		 tx.executeSql("SELECT * FROM jobs", [1], function(tx, res){
                    for(var iii = 0; iii < res.rows.length; iii++)
                    {
                        alert(res.rows.item(iii).id);
                        alert(res.rows.item(iii).job_id);
                        alert(res.rows.item(iii).address);
                    }
                })
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }
