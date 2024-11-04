CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'user', 'volunteer')),
    contact_info VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    location VARCHAR(100),
    description TEXT,
    severity VARCHAR(10) CHECK (severity IN ('low', 'medium', 'high')),
    status VARCHAR(20) DEFAULT 'reported',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    quantity INTEGER,
    location VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    availability BOOLEAN DEFAULT TRUE,
    assigned_incident_id INTEGER REFERENCES incidents(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    incident_id INTEGER REFERENCES incidents(id),
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
