Student Management Application

Overview
This project is a student management web application built with Angular. It provides a simple interface for managing students, courses, and enrollment records in a single dashboard. The application is organized into tabs so users can quickly switch between student management, course management, and student-course enrollment.

Features
- Manage student records with add, edit, and delete operations
- Manage course records with add, edit, and delete operations
- Enroll students in courses from a dedicated enrollment screen
- View and update student, course, and enrollment data through the UI
- Angular Material-based design for a modern user interface
- REST API integration for persistent data operations

Application Modules
1. Students
   - Add new students
   - Edit existing student details
   - Delete students
   - View the list of all students

2. Courses
   - Add new courses
   - Edit course information
   - Delete courses
   - View all courses in the system

3. Enrollments
   - Select a student
   - Choose one or more courses
   - Enroll the student in selected courses
   - Remove existing enrollments as needed

Technology Stack
- Angular 22
- Angular Material
- TypeScript
- RxJS
- HTML and CSS
- REST API communication via HttpClient

Project Structure
- src/app/components/student-list/        Student list and management UI
- src/app/components/student-form/        Student add/edit form
- src/app/components/course-list/         Course list and management UI
- src/app/components/course-form/         Course add/edit form
- src/app/components/enrollment/          Enrollment management UI
- src/app/services/                      API service classes for students, courses, and enrollments
- src/app/models/                        Data models for Student, Course, and Enrollment

Backend API
The frontend application communicates with a backend service running at:
http://localhost:8080

Expected API endpoints include:
- Students
  - GET /api/students/getAllStudents
  - GET /api/students/{id}
  - POST /api/students/create
  - PUT /api/students/update/{id}
  - DELETE /api/students/delete/{id}

- Courses
  - GET /api/courses/getAllCourses
  - GET /api/courses/{id}
  - POST /api/courses/create
  - PUT /api/courses/update/{id}
  - DELETE /api/courses/delete/{id}

- Enrollments
  - GET /api/enrollments?studentId={id}
  - POST /api/enrollments/create
  - DELETE /api/enrollments/delete/{id}

Setup Instructions
1. Open the terminal in the project folder.
2. Install dependencies:
   npm install
3. Start the Angular application:
   npm start
4. Open the browser and visit:
   http://localhost:4200

Note
Make sure the backend API is running and available on port 8080 before using the application, otherwise the UI will not be able to fetch or save student, course, and enrollment data.

Summary
This application is a practical Angular-based school administration tool that helps manage student records, course information, and student enrollments in one place. It is suitable for educational or training use, and it demonstrates full CRUD functionality integrated with a REST backend.
