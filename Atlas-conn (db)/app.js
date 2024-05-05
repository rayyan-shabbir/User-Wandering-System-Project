const app = require('express')();

const http = require('http').Server(app);

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://bitf20m535:OL2iEFfD9sGLTh7m@test-pro-db.8xqbc5d.mongodb.net/?retryWrites=true&w=majority")

const User = require('./models/userModel');

http.listen(3000, function(){
    console.log('Server is running');
})