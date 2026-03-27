-- Create Doctor Table
CREATE TABLE IF NOT EXISTS doctor (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dob VARCHAR(20) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    image TEXT,
    department VARCHAR(50) NOT NULL,
    biography TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_doctor_department ON doctor(department);
CREATE INDEX IF NOT EXISTS idx_doctor_email ON doctor(email);
CREATE INDEX IF NOT EXISTS idx_doctor_name ON doctor(first_name, last_name);

INSERT INTO doctor (first_name, last_name, email, dob, gender, address, phone, image, department, biography) VALUES
('AV', 'Stranger', 'gmhs13@yopmail.com', '18/03/2020', 'male', '3125 Elkview Drive, Miami, 33169', '7865641399', 'user-02.jpg', 'Intensive Care Unit (ICU)', 'dawfesgrthy'),
('SHAHID AFRIDI', 'ZIHAD', 'gmhs13@yopmail.com', '18/03/2020', 'male', '3125 Elkview Drive, Miami, 33169', '7865641399', 'reservation.png', 'Intensive Care Unit (ICU)', 'awdsaef'),
('John', 'Smith', 'john.smith@hospital.com', '15/01/1980', 'male', '123 Medical Street, City', '555-0101', 'doctor1.jpg', 'Cardiology', 'Experienced cardiologist with 15 years of practice specializing in heart surgery and cardiovascular diseases'),
('Sarah', 'Johnson', 'sarah.johnson@hospital.com', '20/05/1975', 'female', '456 Health Avenue, City', '555-0102', 'doctor2.jpg', 'Neurology', 'Specialist in neurological disorders and brain surgery with expertise in stroke treatment'),
('Michael', 'Brown', 'michael.brown@hospital.com', '10/08/1985', 'male', '789 Care Boulevard, City', '555-0103', 'doctor3.jpg', 'Orthopedics', 'Orthopedic surgeon specializing in joint replacement and sports medicine'),
('Emily', 'Davis', 'emily.davis@hospital.com', '25/12/1982', 'female', '321 Wellness Road, City', '555-0104', 'doctor4.jpg', 'Pediatrics', 'Pediatrician with 12 years experience in child healthcare and development'),
('Robert', 'Wilson', 'robert.wilson@hospital.com', '03/07/1978', 'male', '654 Treatment Lane, City', '555-0105', 'doctor5.jpg', 'Emergency', 'Emergency medicine specialist with trauma care expertise'),
('Lisa', 'Anderson', 'lisa.anderson@hospital.com', '18/11/1983', 'female', '987 Healing Street, City', '555-0106', 'doctor6.jpg', 'Opthalmology', 'Eye specialist with advanced training in retinal surgery and vision correction'),
('David', 'Taylor', 'david.taylor@hospital.com', '22/04/1979', 'male', '147 Recovery Avenue, City', '555-0107', 'doctor7.jpg', 'Cancer Department', 'Oncologist specializing in cancer treatment and chemotherapy'),
('Jennifer', 'Martinez', 'jennifer.martinez@hospital.com', '14/09/1981', 'female', '258 Cure Boulevard, City', '555-0108', 'doctor8.jpg', 'ENT department', 'ENT specialist with expertise in ear, nose, and throat disorders')
ON CONFLICT DO NOTHING;
