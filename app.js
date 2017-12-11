const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection 
mongoose.connection.on('connectd',()=>{
    console.log('connected to database '+ config.database)
});

//On Error
mongoose.connection.on('error',(err)=>{ 
    console.log('Database Error ' + err)
});  
 
const app = express();
const users=require('./routes/users');
// PORT Number
const port=process.env.PORT || 3000;

// Allow CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname , '/public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/users',users);

// Index Route
app.get('/',function(req,res){
    res.send('<h1> Hello World<h1>');
});



// Start the Server
app.listen(port,()=>{
    console.log("Server started on port:" + port );
})
