-- Login Table - Admin Users
-- This table stores admin user credentials for system administration

CREATE TABLE IF NOT EXISTS login (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample admin user data
-- Note: In production, passwords should be hashed using bcrypt or similar
INSERT INTO login (username, password, email) VALUES
('admin', 'admin123', 'admin@hospital.com'),
('superadmin', 'superadmin123', 'superadmin@hospital.com'),
('manager', 'manager123', 'manager@hospital.com')
ON CONFLICT DO NOTHING;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_login_username ON login(username);
CREATE INDEX IF NOT EXISTS idx_login_email ON login(email);
