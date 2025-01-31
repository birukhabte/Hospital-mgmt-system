const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables. Please check your .env file.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to handle Supabase responses
const handleResponse = (callback) => {
    return (result) => {
        if (result.error) {
            return callback(result.error, null);
        }
        callback(null, result.data);
    };
};

// User Management
module.exports.signup = async function(username, email, password, status, callback) {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([{ username, email, password, email_status: status }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.findOne = async function(email, callback) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);
        
        if (error) return callback(error, null);
        
        // Return the first user if found, or null if not found
        const user = data && data.length > 0 ? data[0] : null;
        callback(null, user);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getuserid = async function(email, callback) {
    try {
        const { data, error } = await supabase
            .from('verify')
            .select('*')
            .eq('email', email);
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.verify = async function(username, email, token, callback) {
    try {
        const { data, error } = await supabase
            .from('verify')
            .insert([{ username, email, token }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.matchtoken = async function(id, token, callback) {
    try {
        const { data, error } = await supabase
            .from('verify')
            .select('*')
            .eq('token', token)
            .eq('id', id);
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.updateverify = async function(email, email_status, callback) {
    try {
        const { data, error } = await supabase
            .from('users')
            .update({ email_status })
            .eq('email', email)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

// Password Reset
module.exports.temp = async function(id, email, token, callback) {
    try {
        const { data, error } = await supabase
            .from('temp')
            .insert([{ id, email, token }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.checktoken = async function(token, callback) {
    try {
        const { data, error } = await supabase
            .from('temp')
            .select('*')
            .eq('token', token);
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.setpassword = async function(id, newpassword, callback) {
    try {
        const { data, error } = await supabase
            .from('users')
            .update({ password: newpassword })
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

// Doctor Management
module.exports.add_doctor = async function(first_name, last_name, email, dob, gender, address, phone, image, department, biography, callback) {
    try {
        const { data, error } = await supabase
            .from('doctor')
            .insert([{ first_name, last_name, email, dob, gender, address, phone, image, department, biography }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getAllDoc = async function(callback) {
    try {
        const { data, error } = await supabase
            .from('doctor')
            .select('*');
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getDocbyId = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('doctor')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.editDoc = async function(id, first_name, last_name, email, dob, gender, address, phone, image, department, biography, callback) {
    try {
        const { data, error } = await supabase
            .from('doctor')
            .update({ first_name, last_name, email, dob, gender, address, phone, image, department, biography })
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.deleteDoc = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('doctor')
            .delete()
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.searchDoc = async function(key, callback) {
    try {
        const { data, error } = await supabase
            .from('doctor')
            .select('*')
            .ilike('first_name', `%${key}%`);
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

// Employee Management
module.exports.add_employee = async function(name, email, contact, join_date, role, salary, callback) {
    try {
        const { data, error } = await supabase
            .from('employee')
            .insert([{ name, email, contact, join_date, role, salary }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getAllemployee = async function(callback) {
    try {
        const { data, error } = await supabase
            .from('employee')
            .select('*');
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getEmpbyId = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('employee')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.editEmp = async function(id, name, email, contact, join_date, role, callback) {
    try {
        const { data, error } = await supabase
            .from('employee')
            .update({ name, email, contact, join_date, role })
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.deleteEmp = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('employee')
            .delete()
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.searchEmp = async function(key, callback) {
    try {
        const { data, error } = await supabase
            .from('employee')
            .select('*')
            .ilike('name', `%${key}%`);
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

// Appointment Management
module.exports.add_appointment = async function(p_name, department, d_name, date, time, email, phone, callback) {
    try {
        const { data, error } = await supabase
            .from('appointment')
            .insert([{ patient_name: p_name, department, doctor_name: d_name, date, time, email, phone }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getallappointment = async function(callback) {
    try {
        const { data, error } = await supabase
            .from('appointment')
            .select('*');
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getappointmentbyid = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('appointment')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.editappointment = async function(id, p_name, department, d_name, date, time, email, phone, callback) {
    try {
        const { data, error } = await supabase
            .from('appointment')
            .update({ patient_name: p_name, department, doctor_name: d_name, date, time, email, phone })
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.deleteappointment = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('appointment')
            .delete()
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

// Complaint Management
module.exports.postcomplain = async function(message, name, email, subject, callback) {
    try {
        const { data, error } = await supabase
            .from('complain')
            .insert([{ message, name, email, subject }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getcomplain = async function(callback) {
    try {
        const { data, error } = await supabase
            .from('complain')
            .select('*');
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

// Store/Medicine Management
module.exports.addMed = async function(name, p_date, expire, e_date, price, quantity, callback) {
    try {
        const { data, error } = await supabase
            .from('store')
            .insert([{ name, p_date, expire, expire_end: e_date, price, quantity }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getallmed = async function(callback) {
    try {
        const { data, error } = await supabase
            .from('store')
            .select('*')
            .order('id', { ascending: false });
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getMedbyId = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('store')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.editmed = async function(id, name, p_date, expire, e_date, price, quantity, callback) {
    try {
        const { data, error } = await supabase
            .from('store')
            .update({ name, p_date, expire, expire_end: e_date, price, quantity })
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.deletemed = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('store')
            .delete()
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.searchmed = async function(key, callback) {
    try {
        const { data, error } = await supabase
            .from('store')
            .select('*')
            .ilike('name', `%${key}%`);
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

// Leave Management
module.exports.add_leave = async function(name, id, type, from, to, reason, callback) {
    try {
        const { data, error } = await supabase
            .from('leaves')
            .insert([{ employee: name, emp_id: id, leave_type: type, date_from: from, date_to: to, reason }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getAllLeave = async function(callback) {
    try {
        const { data, error } = await supabase
            .from('leaves')
            .select('*');
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getleavebyid = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('leaves')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.edit_leave = async function(id, name, leave_type, from, to, reason, callback) {
    try {
        const { data, error } = await supabase
            .from('leaves')
            .update({ employee: name, leave_type, date_from: from, date_to: to, reason })
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.deleteleave = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('leaves')
            .delete()
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

// Department Management
module.exports.add_dept = async function(name, desc, callback) {
    try {
        const { data, error } = await supabase
            .from('departments')
            .insert([{ department_name: name, department_desc: desc }])
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getalldept = async function(callback) {
    try {
        const { data, error } = await supabase
            .from('departments')
            .select('*');
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getdeptbyId = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('departments')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.edit_dept = async function(id, name, desc, callback) {
    try {
        const { data, error } = await supabase
            .from('departments')
            .update({ department_name: name, department_desc: desc })
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.delete_department = async function(id, callback) {
    try {
        const { data, error } = await supabase
            .from('departments')
            .delete()
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

// User Profile Management
module.exports.getuserdetails = async function(username, callback) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username);
        
        if (error) return callback(error, null);
        
        // Return the first user if found, or null if not found
        const user = data && data.length > 0 ? data[0] : null;
        callback(null, user);
    } catch (err) {
        callback(err, null);
    }
};

module.exports.edit_profile = async function(id, username, email, password, callback) {
    try {
        const { data, error } = await supabase
            .from('users')
            .update({ username, email, password })
            .eq('id', id)
            .select();
        
        if (error) return callback(error, null);
        callback(null, data);
    } catch (err) {
        callback(err, null);
    }
};

module.exports = module.exports;// Updated: 2026-03-27 08:54:45
// Updated: 2026-03-27 08:54:46
