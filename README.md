# Mentorverse

<div align="center">

![Mentorverse Banner](https://img.shields.io/badge/Mentorverse-Learning_Platform-6366f1?style=for-the-badge)

**A comprehensive online learning platform connecting learners with expert mentors through courses and personalized 1-on-1 sessions.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://mentorverse.netlify.app)
[![Frontend](https://img.shields.io/badge/Frontend-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://www.netlify.com/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com/)
[![Database](https://img.shields.io/badge/Database-Aiven-FF3E00?style=for-the-badge&logo=aiven)](https://aiven.io/)

</div>

---

## 📖 Overview

**Mentorverse** is a full-stack web application designed to bridge the gap between learners and mentors. The platform enables:

- 🎓 **Learners** to discover and enroll in comprehensive courses, book 1-on-1 mentoring sessions, track their progress, and leave reviews
- 👨‍🏫 **Mentors** to create and manage courses, upload video content, set availability for sessions, and interact with students

The application features secure authentication and a modern, responsive user interface.
<!-- , integrated payment processing via Razorpay -->

---

## ✨ Key Features

### For Learners
- **Browse & Enroll in Courses**: Explore a wide range of courses across various categories
- **Watch Video Lectures**: Stream course content with progress tracking
- **Book Mentoring Sessions**: Schedule personalized 1-on-1 sessions with mentors
<!-- - **Secure Payments**: Integrated Razorpay payment gateway for course enrollment and session bookings -->
- **Track Progress**: Monitor your learning journey and course completion
- **Leave Reviews**: Rate and review courses and mentors
- **Personal Dashboard**: View enrolled courses, upcoming sessions, and learning statistics

### For Mentors
- **Create & Manage Courses**: Design comprehensive courses with detailed descriptions
- **Upload Video Content**: Add, update, and organize video lectures for courses
- **Set Availability**: Define time slots for 1-on-1 mentoring sessions
- **Manage Bookings**: View and manage session bookings from learners
- **Track Students**: Monitor enrolled students and their progress
- **Profile Management**: Update expertise, bio, and professional information
- **Analytics Dashboard**: View teaching statistics and student engagement

### General Features
- **Secure Authentication**: JWT-based authentication with role-based access control (Learner/Mentor)
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Email Notifications**: Automated email confirmations for bookings and enrollments
- **Search & Filter**: Find courses and mentors easily with advanced filtering
- **Real-time Updates**: Toast notifications for user actions and system feedback

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.5
- **Styling**: Tailwind CSS 4.1.16
- **HTTP Client**: Axios 1.13.2
- **Form Handling**: React Hook Form 7.66.0
- **Icons**: React Icons 5.5.0
- **File Upload**: React Dropzone 14.3.8
- **Notifications**: React Toastify 11.0.5
<!-- - **Payment Integration**: Razorpay 2.9.6 -->

### Backend
- **Framework**: Spring Boot 3.5.7
- **Language**: Java 17
- **Database**: MySQL (Hosted on Aiven)
- **ORM**: Spring Data JPA
- **Authentication**: Spring Security + JWT (JSON Web Tokens)
- **Validation**: Spring Boot Validation
<!-- - **Payment Gateway**: Razorpay Java SDK 1.4.4 -->
- **Email Service**: Spring Boot Starter Mail
- **Build Tool**: Maven

### Deployment
- **Frontend**: Netlify
- **Backend**: Render
- **Database**: Aiven (MySQL)

---

<!-- ## 🚀 Getting Started

### Prerequisites
- **Java** (JDK 17 or higher)
- **Maven** (for backend build)
- **MySQL** (or access to a MySQL database)
- **Razorpay Account** (for payment integration)

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd Mentorverse-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the root of the frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd Mentorverse-Backend
   ```

2. **Configure application properties:**
   
   Create/update `src/main/resources/application.properties`:
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:mysql://your-database-host:port/mentorverse
   spring.datasource.username=your_database_username
   spring.datasource.password=your_database_password
   
   # JPA/Hibernate
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
   
   # JWT Configuration
   jwt.secret=your_jwt_secret_key
   jwt.expiration=86400000
   
   # Razorpay Configuration
   razorpay.key.id=your_razorpay_key_id
   razorpay.key.secret=your_razorpay_key_secret
   
   # Email Configuration
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your_email@gmail.com
   spring.mail.password=your_app_password
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   ```

3. **Build the application:**
   ```bash
   ./mvnw clean install
   ```
   
   Or on Windows:
   ```bash
   mvnw.cmd clean install
   ```

4. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   Or on Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```
   
   The backend will be available at `http://localhost:8080`

--- -->

## 📁 Project Structure

### Frontend Structure
```
Mentorverse-Frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API service configurations
│   ├── components/     # Reusable React components
│   │   ├── learnerComponents/   # Learner-specific components
│   │   ├── mentorComponents/    # Mentor-specific components
│   │   └── sharedComponents/    # Shared components
│   ├── context/        # React Context (AuthContext)
│   ├── pages/          # Page components
│   │   ├── learner/    # Learner pages
│   │   └── mentor/     # Mentor pages
│   ├── pageLayouts/    # Layout wrappers
│   ├── routes/         # Route protection components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
└── vite.config.js
```

### Backend Structure
```
Mentorverse-Backend/
├── src/
│   ├── main/
│   │   ├── java/com/arsalaan/
│   │   │   ├── auth/              # Authentication logic
│   │   │   ├── configurations/    # Spring configurations
│   │   │   ├── controllers/       # REST API endpoints
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── enums/             # Enumeration types
│   │   │   ├── jwt/               # JWT utilities
│   │   │   ├── models/            # JPA entities
│   │   │   ├── repositories/      # Data repositories
│   │   │   ├── services/          # Business logic
│   │   │   ├── specifications/    # JPA specifications
│   │   │   └── utils/             # Utility classes
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── Dockerfile
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register/mentor` - Register as a mentor
- `POST /api/auth/register/learner` - Register as a learner
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/{id}` - Get course details
- `POST /api/courses` - Create a course (Mentor only)
- `PUT /api/courses/{id}` - Update a course (Mentor only)
- `DELETE /api/courses/{id}` - Delete a course (Mentor only)

### Videos
- `GET /api/courses/{courseId}/videos` - Get all videos for a course
- `POST /api/courses/{courseId}/videos` - Add video to a course (Mentor only)
- `PUT /api/videos/{id}` - Update video (Mentor only)
- `DELETE /api/videos/{id}` - Delete video (Mentor only)

### Enrollments
- `POST /api/enrollments` - Enroll in a course
- `GET /api/enrollments/learner/{learnerId}` - Get learner's enrollments

### Bookings
- `GET /api/bookings` - Get all bookings (role-based)
- `POST /api/bookings` - Create a booking
- `PUT /api/bookings/{id}/status` - Update booking status

### Reviews
- `GET /api/reviews/course/{courseId}` - Get course reviews
- `GET /api/reviews/mentor/{mentorId}` - Get mentor reviews
- `POST /api/reviews` - Submit a review

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

---

## 🎨 Screenshots

> **Note**: Add screenshots of your application here to showcase the UI and key features.

---
<!-- 
## 🚢 Deployment

### Frontend (Netlify)
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard
4. Set the build command: `npm run build`
5. Set the publish directory: `dist`

### Backend (Render)
1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Create a new Web Service on Render
3. Connect your repository
4. Configure environment variables
5. Set the build command: `./mvnw clean install`
6. Set the start command: `java -jar target/Mentorverse-Backend-3.5.6.jar`

### Database (Aiven)
1. Create a MySQL database instance on Aiven
2. Note the connection details (host, port, username, password)
3. Update the backend `application.properties` with the connection details
4. Allow connections from Render's IP addresses in Aiven's firewall settings -->

---

## 👨‍💻 Author

**Arsalaan Khan**

- GitHub: [@Arsalaan-Khan-22](https://github.com/Arsalaan-Khan-22)
<!-- - LinkedIn: [Connect with me](https://www.linkedin.com/in/arsalaan-khan-22) -->

---

## 🙏 Acknowledgments

- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework
- [React](https://react.dev/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
<!-- - [Razorpay](https://razorpay.com/) - Payment gateway -->
- [Netlify](https://www.netlify.com/) - Frontend hosting
- [Render](https://render.com/) - Backend hosting
- [Aiven](https://aiven.io/) - Database hosting

---

<div align="center">

**Made with ❤️ by Arsalaan Khan**

[⬆ Back to Top](#mentorverse)

</div>
