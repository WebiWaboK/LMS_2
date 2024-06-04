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

CREATE TABLE uploads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    student_id INT,
    file_link VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

-- Tabla para almacenar los exámenes
CREATE TABLE exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

-- Tabla para almacenar las preguntas de los exámenes
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_id INT NOT NULL,
    question_text TEXT NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams(id)
);

-- Tabla para almacenar las respuestas a las preguntas
CREATE TABLE answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);


-- Insertar el usuario admin
INSERT INTO users (username, password, role) VALUES ('admin', '$2b$10$Z7UTMcHJykRclmfJBrSxK..yLfR7zsJV/.4CoyqVKn3Y3lnvlzCb.', 'admin');

SELECT * FROM users;
SELECT * FROM teachers;
SELECT * FROM students;
SELECT * FROM modules;
SELECT * FROM tasks;
select * FROM uploads;

DELETE FROM users;

drop table students;
drop table teachers;
DROP TABLE tasks;
drop table modules;
drop table uploads;