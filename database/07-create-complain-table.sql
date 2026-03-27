-- Complain Table - Patient Complaints
-- This table stores patient complaints and feedback

CREATE TABLE IF NOT EXISTS complain (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample complaint data
INSERT INTO complain (message, name, email, subject) VALUES
('The waiting time was too long', 'John Doe', 'john@example.com', 'Long Wait Time'),
('Doctor was very rude and unprofessional', 'Jane Smith', 'jane@example.com', 'Staff Behavior'),
('Billing charges were incorrect', 'Michael Johnson', 'michael@example.com', 'Billing Issue'),
('Cleanliness of the facility needs improvement', 'Sarah Williams', 'sarah@example.com', 'Facility Cleanliness'),
('Medication was not available', 'Robert Brown', 'robert@example.com', 'Medicine Unavailable'),
('Poor communication from staff', 'Emily Davis', 'emily@example.com', 'Communication'),
('Appointment scheduling was difficult', 'David Miller', 'david@example.com', 'Scheduling Issue'),
('Lack of privacy in consultation room', 'Lisa Anderson', 'lisa@example.com', 'Privacy Concern'),
('Equipment malfunction during treatment', 'James Taylor', 'james@example.com', 'Equipment Issue'),
('Unhygienic conditions in restroom', 'Patricia Thomas', 'patricia@example.com', 'Hygiene Issue'),
('Slow response from nursing staff', 'Christopher Lee', 'christopher@example.com', 'Staff Response'),
('Incorrect diagnosis initially', 'Jennifer White', 'jennifer@example.com', 'Diagnosis Error')
ON CONFLICT DO NOTHING;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_complain_email ON complain(email);
CREATE INDEX IF NOT EXISTS idx_complain_created_at ON complain(created_at);
