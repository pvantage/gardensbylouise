var builder = require('mongo-sql');

//Job Table
var usersQuery = {
  type: 'create-table'
, table: 'jobs'
, ifNotExists: true
, definition: {
    id:         { type: 'serial', primaryKey: true }
  , job_id:    { type: 'int' }
  , address:       { type: 'text' }
  , description:       { type: 'text' }
  , status:       { type: 'text' }
  , contact_fname:       { type: 'text' }
  , contact_lname:       { type: 'text' }
  , contact_email:       { type: 'text' }
  , contact_phone:       { type: 'text' }
  , job_date:       { type: 'text' }
  , start_time:       { type: 'text' }
  , cdate:  { type: 'timestamp', default: 'now()' }
  }
};
var result = builder.sql(usersQuery);

var usersQuery = {
  type: 'select'
, table: 'users'
, where: { $or: { id: 5, name: 'Bob' } }
};
 
var result = builder.sql(usersQuery);
alert(result);
result.values     // Array of values
alert(result.values);
result.toString();
alert(result.toString());