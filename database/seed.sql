-- Sample Users
INSERT INTO users (username, password, role, contact_info) VALUES
('admin_user', 'hashed_password', 'admin', 'admin@example.com'),
('volunteer_1', 'hashed_password', 'volunteer', 'volunteer1@example.com');

-- Sample Incidents
INSERT INTO incidents (user_id, location, description, severity) VALUES
(1, 'Downtown', 'Flooded streets', 'high'),
(1, 'Uptown', 'Power outage', 'medium');

-- Sample Resources
INSERT INTO resources (name, quantity, location) VALUES
('Medical Supplies', 100, 'Warehouse 1'),
('Water Bottles', 500, 'Warehouse 2');

-- Sample Volunteers
INSERT INTO volunteers (user_id, availability) VALUES
(2, TRUE);

-- Sample Notifications
INSERT INTO notifications (user_id, incident_id, message) VALUES
(1, 1, 'New incident reported in Downtown');
