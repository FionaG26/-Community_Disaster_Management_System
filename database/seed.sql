-- Sample Users
INSERT INTO users (username, password, role, contact_info) VALUES
('admin_user', 'hashed_password', 'admin', 'admin@example.com'),
('volunteer_1', 'hashed_password', 'volunteer', 'volunteer1@example.com');

-- Sample Incidents
INSERT INTO incidents (user_id, location, description, severity) VALUES
(1, 'Nairobi', 'Severe flooding due to heavy rains', 'high'),
(1, 'Kisumu', 'Landslide affecting several homes', 'medium'),
(1, 'Garissa', 'Drought causing water shortages', 'high'),
(1, 'Mombasa', 'Coastal erosion impacting local communities', 'medium'),
(1, 'Eldoret', 'Roads impassable due to landslides', 'high');

-- Sample Resources
INSERT INTO resources (name, quantity, location) VALUES
('Medical Supplies', 100, 'Warehouse 1, Nairobi'),
('Water Bottles', 500, 'Warehouse 2, Nairobi'),
('Food Supplies', 300, 'Warehouse 3, Kisumu'),
('Blankets', 150, 'Warehouse 4, Mombasa'),
('Emergency Kits', 200, 'Warehouse 5, Eldoret');

-- Sample Volunteers
INSERT INTO volunteers (user_id, availability) VALUES
(2, TRUE);

-- Sample Notifications
INSERT INTO notifications (user_id, incident_id, message) VALUES
(1, 1, 'New flooding incident reported in Nairobi'),
(1, 2, 'Landslide reported in Kisumu, urgent response needed'),
(1, 3, 'Drought conditions worsening in Garissa, resources needed'),
(1, 4, 'Coastal erosion reported in Mombasa, assess impact'),
(1, 5, 'Roads blocked due to landslides in Eldoret, update required');
