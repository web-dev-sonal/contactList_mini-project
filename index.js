const express=require('express');   //import express library

const path=require('path');   //import path  module
const port=3000;


const db = require('./config/mongoose');  // it should be before firing the express application as here
const contacts = require('./model/contact'); //import database collection .. // using this contacts we will create documents ..

const app=express();  //create an application using express

app.set('view engine','ejs');   //it sets template engine ejs and express will know now

app.set('views',path.join(__dirname,'views'));   //it joins two path and set it to views

app.use(express.urlencoded());   //using a middle ware function working as a parser function for input data

app.use(express.static('assets'));  //add this middleware function for accessing static files

//my own middleware function
// app.use(function(req,res,next){
//     // console.log("middleware 1 is called");

//     req.myname="subhash";
//     next();  //it send to another middleware or some other routes
// });

// //another middleware function
// app.use(function(req,res,next){
//     console.log(req);
//     console.log(req.myname);
//     // console.log("middleware 2 is called");
//     next();  //it send to another middleware or some other routes
// });

// var contactList = [
//     {
//         name: "subhash",
//         phone: "8584856565"
//     },
//     {
//         name: "sam",
//         phone: "8582826564"
//     },
//     {
//         name: "suman",
//         phone: "9893154565"
//     }
// ];

app.get('/', (req, res) => {     //get is one of a request method
    // res.send('Hello World!')     //send is one of the response method
    // return res.render('home');
    
    //fetching data from database
    contacts.find({},function(err,allContacts){   //in paranthesis we pass query
        if(err){
            console.log('error');
            return;
        }

        return res.render('home',{
            // title : "My Contact List",
            contact_list : allContacts
        });
    })
  });

// app.get('/practice',(req,res) => {
//     return res.render('practice',{title:"practice"});
// });

app.post('/create-contact',(req,res) => {
    // return res.redirect('/practice');
    //  console.log(req.body);   // for showing my input data

    // contactList.push(req.body);  //req.body is an array element and we simply pushed or appended

    contacts.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error');
        }
        console.log('******',newContact);
        return res.redirect('back');
    });

    //  res.redirect('/');  //it send to some specific url after submitting this form
    //return  res.redirect(back);  //it simply send to same url where we submitted our form
});

// always delete using get request
app.get('/delete-contact',(req,res) => {
    // console.log(req.query);  
    // let phone = req.query.phone;
    // let contact_index = contactList.findIndex(contact => contact.phone == phone);  //here contact is an object of contactList....findIndex is a methods
    // if(contact_index != -1){
    //     contactList.splice(contact_index,1);    //splice is a method which delete any index starting from that index and delete till x index forward
    // }

    let id = req.query.id;
    console.log(id);
    contacts.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error!');
            return ;
        }
    });

    return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log(err);
        return ;
    }
    // console.log('server is running on port no. ${port}');
    // console.log(__dirname);    //it will print  current directory path  \nodews\module_nodews_js\contact-list
})