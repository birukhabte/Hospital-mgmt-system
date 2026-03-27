-- Create Employee Table
CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    join_date VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    salary VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employee_role ON employee(role);
CREATE INDEX IF NOT EXISTS idx_employee_email ON employee(email);

INSERT INTO employee (name, email, contact, join_date, role, salary) VALUES
('user2', 'gmhs13@yopmail.com', '1568496', '26/03/2020', 'Receptionist', '3000'),
('abc', 'gmhs13@yopmail.com', '7865641399', '26/03/2020', 'Pharmacist', '3000'),
('Abc', 'gmhs13@yopmail.com', '0159653', '26/03/2020', 'Pharmacist', '651320'),
('Alice Johnson', 'alice.johnson@hospital.com', '555-2001', '01/01/2023', 'Nurse', '4500'),
('Bob Smith', 'bob.smith@hospital.com', '555-2002', '15/02/2023', 'Lab Technician', '3800'),
('Carol Davis', 'carol.davis@hospital.com', '555-2003', '10/03/2023', 'Radiologist', '7500'),
('Daniel Wilson', 'daniel.wilson@hospital.com', '555-2004', '20/04/2023', 'Security Guard', '2800'),
('Eva Martinez', 'eva.martinez@hospital.com', '555-2005', '05/05/2023', 'Administrative Assistant', '3200'),
('Frank Brown', 'frank.brown@hospital.com', '555-2006', '12/06/2023', 'Maintenance Staff', '2500'),
('Grace Lee', 'grace.lee@hospital.com', '555-2007', '18/07/2023', 'Head Nurse', '5500'),
('Henry Taylor', 'henry.taylor@hospital.com', '555-2008', '25/08/2023', 'IT Support', '4200'),
('Iris Anderson', 'iris.anderson@hospital.com', '555-2009', '30/09/2023', 'Accountant', '4800'),
('Jack Miller', 'jack.miller@hospital.com', '555-2010', '15/10/2023', 'Cleaner', '2200')
ON CONFLICT DO NOTHING;
