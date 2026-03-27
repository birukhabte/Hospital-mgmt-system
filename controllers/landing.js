var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var db = require.main.require ('./models/supabase_controller');
var router = express.Router();

// Landing page route
router.get('/',function(req,res){
    res.render('landing.ejs');
});

// Home route (redirect to landing)
router.get('/index.html',function(req,res){
    res.redirect('/');
});

// About page route
router.get('/about.html',function(req,res){
    // For now, redirect to landing page with about section
    // You can create a separate about.ejs template later
    res.redirect('/#about');
});

// Doctors page route (redirect to doctors section on landing page)
router.get('/Doctor.html',function(req,res){
    res.redirect('/#doctors');
});

// Services page route
router.get('/services.html',function(req,res){
    res.redirect('/#services');
});

// Departments page route
router.get('/dep.html',function(req,res){
    res.redirect('/home/departments');
});

// Blog routes (placeholder)
router.get('/blog.html',function(req,res){
    res.redirect('/#blog');
});

router.get('/single-blog.html',function(req,res){
    res.redirect('/#blog');
});

// Elements page route
router.get('/elements.html',function(req,res){
    res.redirect('/');
});

module.exports = router;