# Employee Management System (Backend)

A secure and scalable **Employee Management System Backend** built using **Java**, **Spring Boot**, **Spring Security**, **JWT Authentication**, **Spring Data JPA**, and **PostgreSQL/MySQL**. The application provides RESTful APIs for employee management with secure authentication and role-based authorization.

---

## 🚀 Features

- User Registration & Login
- JWT-based Authentication & Authorization
- Role-Based Access Control (Admin/User)
- Employee CRUD Operations
- Input Validation using Jakarta Validation
- Global Exception Handling
- RESTful API Design
- Password Encryption using BCrypt
- Swagger/OpenAPI Documentation
- Database Integration with Spring Data JPA
- Docker Support
- Production Ready Configuration

---

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate

### Database
- PostgreSQL
- MySQL

### Authentication
- JWT (JSON Web Token)
- BCrypt Password Encoder

### Tools
- Maven
- Docker
- Swagger/OpenAPI
- Postman
- Git & GitHub

---

## 📁 Project Structure

```
src
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
├── service
│   ├── impl
├── config
└── EmployeeManagementAppApplication.java
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Harshsahu11/EmployeeManagementApp.git
```

```bash
cd EmployeeManagementApp
```

---

### Configure Environment Variables

```
DB_URL=your_database_url
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
```

---

### Build the Project

```bash
mvn clean install
```

---

### Run the Application

```bash
mvn spring-boot:run
```

Application will start at:

```
http://localhost:8080
```

---

## 🐳 Docker

### Build Docker Image

```bash
docker build -t employee-management-app .
```

### Run Docker Container

```bash
docker run -p 8080:8080 employee-management-app
```

---

## 📚 API Documentation

After running the application Live Hosted:

```
[http://localhost:8080/swagger-ui/index.html](https://employeemanagementapp-v03m.onrender.com/swagger-ui/index.html)
```

---

## 🔐 Authentication

The application uses **JWT Authentication**.

### Workflow

1. Register User
2. Login
3. Receive JWT Token
4. Add Token in Authorization Header

```
Authorization: Bearer <your_token>
```

---

## 📌 Main APIs

### Authentication

- Register User
- Login User

### Employee

- Create Employee
- Get Employee by ID
- Get All Employees
- Update Employee
- Delete Employee

---

## 🧪 Testing APIs

Use:

- Postman
- Swagger UI

---

## 📂 Database

Supports:

- PostgreSQL
- MySQL

Database schema is automatically created/updated using Hibernate.

---

## 👨‍💻 Author

**Harsh Sahu**

GitHub: https://github.com/Harshsahu11

---

## ⭐ If you found this project useful, consider giving it a Star.
