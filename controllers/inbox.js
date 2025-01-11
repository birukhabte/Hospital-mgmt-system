var express = require ('express');
var router = express.Router();
var db = require.main.require ('./models/supabase_controller');
var bodyPaser = require ('body-parser');
router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/',function(req,res){
    db.getcomplain(function(err,result){
        res.render('inbox.ejs',{list :result});
    })
});











module.exports =router;

// Updated: 2026-03-27 08:54:45
// Updated: 2026-03-27 08:54:45
// Updated: 2026-03-27 08:54:45
// Updated: 2026-03-27 08:54:45
