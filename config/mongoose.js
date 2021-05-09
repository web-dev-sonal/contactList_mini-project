//add mongoose library
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contacts_list_db');  //it connect mongoose to mongodb databse ....contact_list_db is our databse name

const db = mongoose.connection;  //acquiring the conection (to check if it is successful)

db.on('error',console.error.bind(console,'error connecting to database'));  //if error in connection...error is an event

db.once('open',function(){
    console.log('successful connection !');   //if server is up ansd running
});
