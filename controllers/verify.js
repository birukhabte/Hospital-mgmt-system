var express = require ('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/supabase_controller');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


module.exports = router;

router.get('/',function(req,res){
    res.render('verify.ejs');
});

router.post('/',function(req,res){
    var id = req.body.id;
    var token = req.body.token;
    db.matchtoken(id,token,function(err,result){
        console.log(result);
        if (result.length > 0){
            var email = result[0].email;
            var email_status = "verified";
            db.updateverify (email,email_status,function(err,result1){
                res.redirect('/login');
            });
        }
        else {
            res.send('Token did not match');
        }
    });

});// Updated: 2026-03-27 08:54:45
// Updated: 2026-03-27 08:54:45
// Updated: 2026-03-27 08:54:46
