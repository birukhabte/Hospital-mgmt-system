-- Verify Table - Email Verification Tokens
-- This table stores email verification tokens for new user registrations

CREATE TABLE IF NOT EXISTS verify (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample email verification token data
INSERT INTO verify (username, email, token) VALUES
('admin', 'admin@hospital.com', 'verify_token_admin_xyz789'),
('doctor1', 'doctor@hospital.com', 'verify_token_doctor1_abc123'),
('testuser', 'test@hospital.com', 'verify_token_testuser_def456'),
('john_doe', 'john@example.com', 'verify_token_john_ghi789'),
('jane_smith', 'jane@example.com', 'verify_token_jane_jkl012'),
('michael_j', 'michael@example.com', 'verify_token_michael_mno345'),
('sarah_w', 'sarah@example.com', 'verify_token_sarah_pqr678'),
('robert_b', 'robert@example.com', 'verify_token_robert_stu901'),
('emily_d', 'emily@example.com', 'verify_token_emily_vwx234'),
('david_m', 'david@example.com', 'verify_token_david_yza567'),
('lisa_a', 'lisa@example.com', 'verify_token_lisa_bcd890'),
('james_t', 'james@example.com', 'verify_token_james_efg123')
ON CONFLICT DO NOTHING;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_verify_email ON verify(email);
CREATE INDEX IF NOT EXISTS idx_verify_username ON verify(username);
CREATE INDEX IF NOT EXISTS idx_verify_token ON verify(token);
CREATE INDEX IF NOT EXISTS idx_verify_created_at ON verify(created_at);
