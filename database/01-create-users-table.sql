-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email_status VARCHAR(20) NOT NULL DEFAULT 'verified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

INSERT INTO users (username, email, password, email_status) VALUES
('admin', 'admin@hospital.com', 'admin123', 'verified'),
('doctor1', 'doctor@hospital.com', 'doctor123', 'verified'),
('testuser', 'test@hospital.com', 'test123', 'verified')
ON CONFLICT (email) DO UPDATE SET email_status = 'verified';
