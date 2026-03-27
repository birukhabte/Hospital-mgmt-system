-- Leaves Table - Employee Leave Requests
-- This table stores employee leave requests and approvals

CREATE TABLE IF NOT EXISTS leaves (
    id SERIAL PRIMARY KEY,
    employee VARCHAR(255) NOT NULL,
    emp_id INTEGER NOT NULL,
    leave_type VARCHAR(255) NOT NULL,
    date_from VARCHAR(255) NOT NULL,
    date_to VARCHAR(255) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample leave request data
INSERT INTO leaves (employee, emp_id, leave_type, date_from, date_to, reason) VALUES
('John Smith', 1, 'Sick Leave', '2024-03-25', '2024-03-26', 'Medical appointment'),
('Sarah Johnson', 2, 'Annual Leave', '2024-04-01', '2024-04-05', 'Vacation'),
('Michael Brown', 3, 'Casual Leave', '2024-03-28', '2024-03-28', 'Personal work'),
('Emily Davis', 4, 'Sick Leave', '2024-03-27', '2024-03-29', 'Flu'),
('Robert Wilson', 5, 'Annual Leave', '2024-04-10', '2024-04-17', 'Family trip'),
('Lisa Anderson', 6, 'Maternity Leave', '2024-05-01', '2024-08-01', 'Maternity'),
('James Taylor', 7, 'Casual Leave', '2024-03-30', '2024-03-30', 'Personal errand'),
('Patricia Thomas', 8, 'Sick Leave', '2024-04-02', '2024-04-03', 'Dental treatment'),
('Christopher Lee', 9, 'Annual Leave', '2024-04-20', '2024-04-27', 'Holiday'),
('Jennifer White', 10, 'Casual Leave', '2024-04-05', '2024-04-05', 'Family event'),
('David Miller', 11, 'Sick Leave', '2024-04-08', '2024-04-09', 'Fever')
ON CONFLICT DO NOTHING;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_leaves_emp_id ON leaves(emp_id);
CREATE INDEX IF NOT EXISTS idx_leaves_date_from ON leaves(date_from);
CREATE INDEX IF NOT EXISTS idx_leaves_leave_type ON leaves(leave_type);
