const mongoose = require('mongoose');

//create schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// create models(it's a constructor and compiled from schema definition) and also collection name will be created 
const Contact = mongoose.model('Contact',contactSchema);

//atlast export this Contact 
module.exports = Contact;