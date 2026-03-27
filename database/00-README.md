# Hospital Management System - Database Schema

This folder contains all SQL files needed to set up the complete database schema for the Hospital Management System in Supabase.

## Files Overview

| File | Table | Purpose |
|------|-------|---------|
| `01-create-users-table.sql` | users | User accounts for login/signup |
| `02-create-departments-table.sql` | departments | Hospital departments |
| `03-create-doctor-table.sql` | doctor | Doctor information and profiles |
| `04-create-appointment-table.sql` | appointment | Patient appointments |
| `05-create-employee-table.sql` | employee | Staff/employee management |
| `06-create-store-table.sql` | store | Pharmacy/medicine inventory |
| `07-create-complain-table.sql` | complain | Patient complaints and feedback |
| `08-create-leaves-table.sql` | leaves | Employee leave requests |
| `09-create-temp-table.sql` | temp | Password reset tokens |
| `10-create-verify-table.sql` | verify | Email verification tokens |
| `11-create-login-table.sql` | login | Admin user credentials |

## Setup Instructions

### Option 1: Run All Files in Order (Recommended)

1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Run each SQL file in order from `01-create-users-table.sql` to `11-create-login-table.sql`
4. Each file will create its table and insert sample data

### Option 2: Run Individual Files

You can run any individual SQL file independently. Each file is self-contained with:
- Table creation with proper schema
- Sample data insertion
- Index creation for performance optimization

## Database Tables

### 1. Users Table
- Stores user account information for login/signup
- Fields: id, username, email, password, email_status, created_at, updated_at

### 2. Departments Table
- Stores hospital departments
- Fields: id, department_name, department_desc, created_at, updated_at

### 3. Doctor Table
- Stores doctor information and profiles
- Fields: id, first_name, last_name, email, dob, gender, address, phone, image, department, biography, created_at, updated_at

### 4. Appointment Table
- Stores patient appointments
- Fields: id, patient_name, department, doctor_name, date, time, email, phone, created_at, updated_at

### 5. Employee Table
- Stores staff/employee information
- Fields: id, name, email, contact, join_date, role, salary, created_at, updated_at

### 6. Store Table
- Stores pharmacy/medicine inventory
- Fields: id, name, p_date, expire, expire_end, price, quantity, created_at, updated_at

### 7. Complain Table
- Stores patient complaints and feedback
- Fields: id, message, name, email, subject, created_at

### 8. Leaves Table
- Stores employee leave requests
- Fields: id, employee, emp_id, leave_type, date_from, date_to, reason, created_at

### 9. Temp Table
- Stores temporary password reset tokens
- Fields: id, email, token, created_at

### 10. Verify Table
- Stores email verification tokens for new registrations
- Fields: id, username, email, token, created_at

### 11. Login Table
- Stores admin user credentials
- Fields: id, username, password, email, created_at

## Sample Data

Each SQL file includes sample data to help you get started:
- 3 test users in the users table
- 12 departments
- 10 doctors across different departments
- 10 appointments
- 13 employees
- 19 medicines in the store
- 12 patient complaints
- 11 leave requests
- 8 password reset tokens
- 12 email verification tokens
- 3 admin users

## Important Notes

1. **Passwords**: In production, all passwords should be hashed using bcrypt or similar algorithms
2. **Email Verification**: The system currently bypasses email verification for testing
3. **Row Level Security (RLS)**: RLS is not enabled by default. Enable it in production for security
4. **Indexes**: Each table has indexes on commonly queried fields for performance optimization

## Troubleshooting

If you encounter errors:
1. Ensure you're running files in the correct order
2. Check that your Supabase project is properly configured
3. Verify your database connection credentials in `.env`
4. Check the Supabase logs for detailed error messages

## Next Steps

After setting up the database:
1. Update your `.env` file with Supabase credentials
2. Ensure `models/supabase_controller.js` is properly configured
3. Start the application server
4. Test the login/signup functionality
