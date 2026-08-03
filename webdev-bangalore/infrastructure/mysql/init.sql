-- MySQL Initialization Script for PixelCraft Studio

CREATE DATABASE IF NOT EXISTS webdev_users CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS webdev_contacts CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS webdev_projects CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS webdev_audit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create application user
CREATE USER IF NOT EXISTS 'webdev'@'%' IDENTIFIED BY 'webdev123';
GRANT ALL PRIVILEGES ON webdev_users.*   TO 'webdev'@'%';
GRANT ALL PRIVILEGES ON webdev_contacts.* TO 'webdev'@'%';
GRANT ALL PRIVILEGES ON webdev_projects.* TO 'webdev'@'%';
GRANT ALL PRIVILEGES ON webdev_audit.*   TO 'webdev'@'%';
FLUSH PRIVILEGES;

-- Seed some sample projects
USE webdev_projects;
INSERT IGNORE INTO projects (id, title, category, description, status, client_name, created_at) VALUES
(1, 'FinTrack Pro',  'Fintech',    'Real-time portfolio tracking platform', 'LIVE', 'FinCorp India', NOW()),
(2, 'MediCare Hub',  'Healthcare', 'Patient management system',             'LIVE', 'Apollo Clinics', NOW()),
(3, 'ShopSphere',    'E-commerce', 'Multi-vendor marketplace platform',     'LIVE', 'RetailX',        NOW()),
(4, 'LogiTrack',     'Logistics',  'Fleet management dashboard',            'LIVE', 'DHL India',      NOW()),
(5, 'EduLearn',      'EdTech',     'Interactive learning platform',         'LIVE', 'LearnX',         NOW()),
(6, 'HRPulse',       'HRTech',     'Employee engagement platform',          'LIVE', 'TechCorp',       NOW());
