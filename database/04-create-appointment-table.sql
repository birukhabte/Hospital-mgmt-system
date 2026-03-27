-- Create Appointment Table
CREATE TABLE IF NOT EXISTS appointment (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    time VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointment_date ON appointment(date);
CREATE INDEX IF NOT EXISTS idx_appointment_department ON appointment(department);
CREATE INDEX IF NOT EXISTS idx_appointment_doctor ON appointment(doctor_name);

INSERT INTO appointment (patient_name, department, doctor_name, date, time, email, phone) VALUES
('Test', 'Orthopedics', 'B.rabbit', '26/03/2020', '10:43 AM', 'gmhs13@yopmail.com', '7865641399'),
('Test123', 'Orthopedics', 'doc test', '18/03/2020', '1:41 AM', 'gmhs13@yopmail.com', '7865641399'),
('John Doe', 'Cardiology', 'John Smith', '15/12/2024', '9:00 AM', 'john.doe@email.com', '555-1001'),
('Jane Smith', 'Neurology', 'Sarah Johnson', '16/12/2024', '10:30 AM', 'jane.smith@email.com', '555-1002'),
('Mike Wilson', 'Emergency', 'Robert Wilson', '17/12/2024', '2:15 PM', 'mike.wilson@email.com', '555-1003'),
('Sarah Davis', 'Pediatrics', 'Emily Davis', '18/12/2024', '11:00 AM', 'sarah.davis@email.com', '555-1004'),
('Tom Brown', 'Orthopedics', 'Michael Brown', '19/12/2024', '3:30 PM', 'tom.brown@email.com', '555-1005'),
('Lisa Johnson', 'Opthalmology', 'Lisa Anderson', '20/12/2024', '1:00 PM', 'lisa.johnson@email.com', '555-1006'),
('David Miller', 'Cancer Department', 'David Taylor', '21/12/2024', '4:00 PM', 'david.miller@email.com', '555-1007'),
('Emma Wilson', 'ENT department', 'Jennifer Martinez', '22/12/2024', '9:30 AM', 'emma.wilson@email.com', '555-1008')
ON CONFLICT DO NOTHING;
