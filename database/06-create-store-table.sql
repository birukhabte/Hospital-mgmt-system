-- Create Store Table (Pharmacy Inventory)
CREATE TABLE IF NOT EXISTS store (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    p_date VARCHAR(255) NOT NULL,
    expire VARCHAR(255) NOT NULL,
    expire_end VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    quantity VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_store_name ON store(name);
CREATE INDEX IF NOT EXISTS idx_store_expire ON store(expire_end);

INSERT INTO store (name, p_date, expire, expire_end, price, quantity) VALUES
('Napa', '20/03/2020', '2', '19/03/2020', '8', '100'),
('Seclo', '24/03/2020', '2', '24/03/2020', '5', '200'),
('Napa', '24/03/2020', '1', '19/03/2020', '10', '20'),
('max', '11/03/2020', '1', '12/03/2020', '10', '100'),
('Paracetamol', '01/01/2024', '2', '01/01/2026', '12', '500'),
('Amoxicillin', '15/02/2024', '3', '15/02/2027', '25', '300'),
('Ibuprofen', '10/03/2024', '2', '10/03/2026', '18', '250'),
('Aspirin', '20/04/2024', '3', '20/04/2027', '15', '400'),
('Omeprazole', '05/05/2024', '2', '05/05/2026', '30', '150'),
('Metformin', '12/06/2024', '3', '12/06/2027', '22', '200'),
('Lisinopril', '18/07/2024', '2', '18/07/2026', '28', '180'),
('Atorvastatin', '25/08/2024', '3', '25/08/2027', '35', '120'),
('Amlodipine', '30/09/2024', '2', '30/09/2026', '20', '220'),
('Losartan', '15/10/2024', '3', '15/10/2027', '32', '160'),
('Insulin', '01/11/2024', '1', '01/11/2025', '85', '50'),
('Warfarin', '10/11/2024', '2', '10/11/2026', '45', '80'),
('Prednisone', '20/11/2024', '3', '20/11/2027', '38', '100'),
('Gabapentin', '01/12/2024', '2', '01/12/2026', '42', '90'),
('Sertraline', '15/12/2024', '3', '15/12/2027', '55', '75')
ON CONFLICT DO NOTHING;
