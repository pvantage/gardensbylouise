
document.addEventListener("deviceready", onDeviceReady, false);
var db;
// Cordova is ready
function onDeviceReady() {
	db = window.openDatabase("Gardensbylouise", "1.0", "Gardens By Louise LLC", 200000);
	db.transaction(populateDB, errorCB, successCB);
}

    // Populate the database 
    //
    function populateDB(tx) {
		alert('start');
         tx.executeSql('CREATE TABLE IF NOT EXISTS jobs (job_id integer, address text, description text, status text, contact_fname text, contact_lname text, contact_email text, contact_phone text, job_date text, start_time text)');
         tx.executeSql('INSERT INTO jobs (job_id, address, description, status, contact_fname, contact_lname, contact_email, contact_phone, job_date, start_time) VALUES ("1", "Mohali, punjab, India", "Test", "Assigned", "Rinku", "kamboj", "rikamboj@fmail.com", "6456542", "2018-04-04", "13:00:00"), ("2", "Mohali, punjab, India2", "Test2", "Assigned", "Rinku2", "kamboj2", "rikamboj@fmail.com", "6456542", "2018-04-04", "13:00:00")');
		 tx.executeSql("SELECT * FROM jobs", [], function(tx, res){
                    for(var iii = 0; iii < res.rows.length; iii++)
                    {
                        alert(res.rows.item(iii).job_id+'='+res.rows.item(iii).address);
                    }
                });
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
		alert("Error processing SQL: "+err.code);
		alert("Error processing SQL: "+err.message);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }
