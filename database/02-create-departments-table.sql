-- Create Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL,
    department_desc TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_departments_name ON departments(department_name);

INSERT INTO departments (department_name, department_desc) VALUES
('Intensive Care Unit (ICU)', 'What is an intensive care unit (ICU)? Intensive care refers to the specialised treatment given to patients who are acutely unwell and require critical medical care. An intensive care unit (ICU) provides the critical care and life support for acutely ill a'),
('Neurology', 'Neurology is a branch of medicine dealing with disorders of the nervous system. Neurology deals with the diagnosis and treatment of all categories of conditions and disease involving the central and peripheral nervous systems, including their coverings'),
('Opthalmology', 'dfvgbhjnkml'),
('Orthopedics', 'dfyuyuo'),
('Cancer Department', 'asyckuauhcioa'),
('ENT department', 'savcjaub'),
('Emergency', 'Emergency and urgent care services for immediate medical attention'),
('Cardiology', 'Heart and cardiovascular system diagnosis and treatment'),
('Pediatrics', 'Medical care for infants, children, and adolescents'),
('Radiology', 'Medical imaging and diagnostic services'),
('Laboratory', 'Clinical laboratory testing and pathology services'),
('Pharmacy', 'Medication dispensing and pharmaceutical care')
ON CONFLICT DO NOTHING;
