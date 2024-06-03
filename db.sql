CREATE DATABASE lms;

USE lms;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student', 'teacher') NOT NULL
);

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL UNIQUE,
    last_name1 VARCHAR(255) NOT NULL,
    last_name2 VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('teacher') DEFAULT 'teacher'
);

CREATE TABLE students (
	id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name1 VARCHAR(255) NOT NULL,
    last_name2 VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) not null,
    role ENUM('student') DEFAULT 'student'
);

CREATE TABLE modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
	modules_id INT,
    task_name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
	FOREIGN KEY (modules_id) REFERENCES modules(id)
);

-- Insertar el usuario admin
INSERT INTO users (username, password, role) VALUES ('admin', '$2b$10$Z7UTMcHJykRclmfJBrSxK..yLfR7zsJV/.4CoyqVKn3Y3lnvlzCb.', 'admin');

SELECT * FROM users;
SELECT * FROM teachers;
SELECT * FROM students;
SELECT * FROM modules;
SELECT * FROM tasks;
select * FROM module_tasks;

DELETE FROM users;

DROP TABLE tasks;
drop table modules;