var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var router = express.Router();
var app = express();
var io = require("socket.io");


router.get('/',function(req,res){
    res.render('chat.ejs');
});





module.exports = router;


// Updated: 2026-03-27 08:54:45
// Updated: 2026-03-27 08:54:46
