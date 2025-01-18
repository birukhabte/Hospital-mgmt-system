var express = require ('express');
var router = express.Router();
var db = require.main.require ('./models/supabase_controller');
var bodyParser = require ('body-parser');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/',function(req,res){
    console.log('🏠 Home page accessed by user:', req.cookies['username']);
    
    // Try to get doctors with error handling
    db.getAllDoc(function(err, doctorResult){
        if (err) {
            console.error('❌ Error getting doctors:', err.message);
            // If doctors table doesn't exist, show simple home page
            return res.send(`
                <h1>🏥 Welcome to Hospital Management System</h1>
                <p>Hello, ${req.cookies['username']}!</p>
                <p>✅ Login successful!</p>
                <hr>
                <h3>📊 Dashboard</h3>
                <p>⚠️ Database tables are being set up...</p>
                <ul>
                    <li><a href="/home/departments">Departments</a></li>
                    <li><a href="/home/profile">Profile</a></li>
                    <li><a href="/doctors">Doctors</a></li>
                    <li><a href="/employee">Employees</a></li>
                    <li><a href="/appointment">Appointments</a></li>
                    <li><a href="/store">Pharmacy</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
                <hr>
                <p><strong>Note:</strong> Some features may not work until all database tables are created.</p>
                <p><a href="https://supabase.com/dashboard/project/lojzhgkzbcblmryyebxb" target="_blank">Go to Supabase Dashboard</a> to create missing tables.</p>
            `);
        }
        
        console.log('✅ Found', doctorResult ? doctorResult.length : 0, 'doctors');
        
        // Try to get appointments
        db.getallappointment(function(err, appointmentResult){
            if (err) {
                console.error('❌ Error getting appointments:', err.message);
                // Show home page with just doctors data
                return res.send(`
                    <h1>🏥 Welcome to Hospital Management System</h1>
                    <p>Hello, ${req.cookies['username']}!</p>
                    <p>✅ Login successful!</p>
                    <hr>
                    <h3>📊 Dashboard</h3>
                    <p>👨‍⚕️ Doctors: ${doctorResult ? doctorResult.length : 0}</p>
                    <p>📅 Appointments: Loading...</p>
                    <ul>
                        <li><a href="/home/departments">Departments</a></li>
                        <li><a href="/home/profile">Profile</a></li>
                        <li><a href="/doctors">Doctors</a></li>
                        <li><a href="/employee">Employees</a></li>
                        <li><a href="/appointment">Appointments</a></li>
                        <li><a href="/store">Pharmacy</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                `);
            }
            
            console.log('✅ Found', appointmentResult ? appointmentResult.length : 0, 'appointments');
            
            var total_doc = doctorResult ? doctorResult.length : 0;
            var appointment = appointmentResult ? appointmentResult.length : 0;
            
            // Try to render the EJS template
            try {
                res.render('home-root.ejs', {
                    doc: total_doc, 
                    doclist: doctorResult || [], 
                    appointment: appointment, 
                    applist: appointmentResult || []
                });
            } catch (templateError) {
                console.error('❌ EJS Template error:', templateError.message);
                // Fallback to simple HTML
                res.send(`
                    <h1>🏥 Welcome to Hospital Management System</h1>
                    <p>Hello, ${req.cookies['username']}!</p>
                    <p>✅ Login successful!</p>
                    <hr>
                    <h3>📊 Dashboard</h3>
                    <p>👨‍⚕️ Doctors: ${total_doc}</p>
                    <p>📅 Appointments: ${appointment}</p>
                    <ul>
                        <li><a href="/home/departments">Departments</a></li>
                        <li><a href="/home/profile">Profile</a></li>
                        <li><a href="/doctors">Doctors</a></li>
                        <li><a href="/employee">Employees</a></li>
                        <li><a href="/appointment">Appointments</a></li>
                        <li><a href="/store">Pharmacy</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                    <hr>
                    <p><strong>Note:</strong> EJS template error - using fallback display</p>
                `);
            }
        });
    });
});

router.get('/departments',function(req,res){
    console.log('🏥 Departments page accessed');
    
    db.getalldept(function(err,result){
        if (err) {
            console.error('❌ Error getting departments:', err.message);
            return res.send(`
                <h1>🏥 Departments</h1>
                <p>⚠️ Departments table not found. Please create it in Supabase.</p>
                <p><a href="/home">← Back to Home</a></p>
                <hr>
                <p><a href="https://supabase.com/dashboard/project/lojzhgkzbcblmryyebxb" target="_blank">Go to Supabase Dashboard</a></p>
            `);
        }
        
        try {
            res.render('departments.ejs', {list: result || []});
        } catch (templateError) {
            console.error('❌ Departments template error:', templateError.message);
            res.send(`
                <h1>🏥 Departments</h1>
                <p>Found ${result ? result.length : 0} departments</p>
                <p><a href="/home">← Back to Home</a></p>
            `);
        }
    });
});

router.get('/add_departments',function(req,res){
    try {
        res.render('add_departments.ejs');
    } catch (err) {
        res.send(`
            <h1>Add Department</h1>
            <form method="POST" action="/home/add_departments">
                <p>Department Name: <input type="text" name="dpt_name" required></p>
                <p>Description: <textarea name="desc" required></textarea></p>
                <p><button type="submit">Add Department</button></p>
            </form>
            <p><a href="/home/departments">← Back to Departments</a></p>
        `);
    }
});

router.post('/add_departments',function(req,res){
    var name = req.body.dpt_name;
    var desc = req.body.desc;
    db.add_dept(name,desc,function(err,result){
        if (err) {
            console.error('❌ Error adding department:', err.message);
            res.send('Error adding department: ' + err.message);
        } else {
            res.redirect('/home/departments');
        }
    });
});

router.get('/profile',function(req,res){
    var username = req.cookies['username'];
    console.log('👤 Profile accessed by:', username);
    
    db.getuserdetails(username,function(err,result){
        if (err) {
            console.error('❌ Error getting user details:', err.message);
            return res.send(`
                <h1>👤 Profile</h1>
                <p>Error loading profile: ${err.message}</p>
                <p><a href="/home">← Back to Home</a></p>
            `);
        }
        
        try {
            res.render('profile.ejs', {list: result});
        } catch (templateError) {
            console.error('❌ Profile template error:', templateError.message);
            res.send(`
                <h1>👤 Profile</h1>
                <p>Username: ${result ? result.username : 'Unknown'}</p>
                <p>Email: ${result ? result.email : 'Unknown'}</p>
                <p><a href="/home">← Back to Home</a></p>
            `);
        }
    });
});

// Copy other routes from original home.js...
router.get('/delete_department/:id',function(req,res){
    var id = req.params.id;
    db.getdeptbyId(id,function(err,result){
        if (err) {
            return res.send('Error: ' + err.message);
        }
        try {
            res.render('delete_department.ejs',{list:result});
        } catch (err) {
            res.send(`Delete department ${id}? <a href="/home/departments">Cancel</a>`);
        }
    });
});

router.post('/delete_department/:id',function(req,res){
    var id = req.params.id;
    db.delete_department(id,function(err,result){
        if (err) {
            return res.send('Error deleting department: ' + err.message);
        }
        res.redirect('/home/departments');
    });
});

router.get('/edit_department/:id',function(req,res){
    var id = req.params.id;
    db.getdeptbyId(id,function(err,result){
        if (err) {
            return res.send('Error: ' + err.message);
        }
        try {
            res.render('edit_department.ejs',{list:result});
        } catch (err) {
            res.send(`Edit department ${id} - Template error`);
        }
    })
});

router.post('/edit_department/:id',function(req,res){
    db.edit_dept(req.params.id,req.body.dpt_name,req.body.desc,function(err,result){
        if (err) {
            return res.send('Error updating department: ' + err.message);
        }
        res.redirect('/home/departments');
    });
});

router.post('/profile',function(req,res){
    var username = req.cookies['username'];
    db.getuserdetails(username,function(err,result){
        if (err) {
            return res.send('Error: ' + err.message);
        }
        
        var id = result.id;
        var password = result.password;
        var currentUsername = result.username; 
        
        if (password == req.body.password){
            db.edit_profile(id,req.body.username,req.body.email,req.body.new_password,function(err,result1){
                if (err) {
                    return res.send('Error updating profile: ' + err.message);
                }
                if (result1){
                    res.send("Profile edited successfully");
                } else {
                    res.send("Failed to update profile");
                }
            });
        } else {
            res.send("Old password did not match");
        }
    });
});

module.exports = router;// Updated: 2026-03-27 08:54:46
// Updated: 2026-03-27 08:54:46
