-- Temp Table - Password Reset Tokens
-- This table stores temporary password reset tokens for user account recovery

CREATE TABLE IF NOT EXISTS temp (
    id INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample password reset token data
INSERT INTO temp (id, email, token) VALUES
(1, 'john@example.com', 'reset_token_abc123def456'),
(2, 'jane@example.com', 'reset_token_ghi789jkl012'),
(3, 'michael@example.com', 'reset_token_mno345pqr678'),
(4, 'sarah@example.com', 'reset_token_stu901vwx234'),
(5, 'robert@example.com', 'reset_token_yza567bcd890'),
(6, 'emily@example.com', 'reset_token_efg123hij456'),
(7, 'david@example.com', 'reset_token_klm789nop012'),
(8, 'lisa@example.com', 'reset_token_qrs345tuv678')
ON CONFLICT DO NOTHING;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_temp_email ON temp(email);
CREATE INDEX IF NOT EXISTS idx_temp_token ON temp(token);
CREATE INDEX IF NOT EXISTS idx_temp_created_at ON temp(created_at);
