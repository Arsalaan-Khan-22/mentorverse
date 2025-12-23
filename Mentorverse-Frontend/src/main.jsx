import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StrictMode } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import MentorRegistration from "./pages/mentor/MentorRegistration";
import LearnerRegistration from "./pages/learner/LearnerRegistration";
import Login from "./pages/Login";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import CourseCreatePage from "./pages/mentor/CourseCreatePage";
import CourseManagement from "./pages/mentor/CourseManagement";
import CourseUpdate from "./pages/mentor/CourseUpdate";
import ViewCourse from "./pages/mentor/ViewCourse";
import MentorBookings from "./pages/mentor/MentorBookings";
import MentorProfile from "./pages/mentor/MentorProfile";
import Students from "./pages/mentor/Students";
import LearnerDashboard from "./pages/learner/LearnerDashboard";
import AddVideos from "./pages/mentor/AddVideos";
import UpdateVideos from "./pages/mentor/UpdateVideos";
import LearnerBookings from "./pages/learner/LearnerBookings";
import MyCourses from "./pages/learner/MyCourses";
import LearnerLayout from "./pageLayouts/LearnerLayout";
import MentorLayout from "./pageLayouts/MentorLayout";
import LearnerProfile from "./pages/learner/LearnerProfile";
import Courses from "./pages/learner/Courses";
import Mentors from "./pages/learner/Mentors";
import LearnerCourseView from "./pages/learner/LearnerCourseView";
import MentorView from "./pages/learner/MentorView";
import BookSession from "./pages/learner/BookSession";
import WatchCourse from "./pages/learner/WatchCourse";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import ViewMentorReviews from "./pages/learner/ViewMentorReviews";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";

const allRoutes = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Home />,
  //     },
  //     {
  //       path: "/mentor/register",
  //       element: <MentorRegistration />,
  //     },
  //     {
  //       path: "/learner/register",
  //       element: <LearnerRegistration />,
  //     },
  //     {
  //       path: "/login",
  //       element: <Login />,
  //     },
  //     {
  //       path: "/mentor/dashboard",
  //       element: <MentorDashboard />,
  //     },
  //     {
  //       path: "/mentor/course/create",
  //       element: <CourseCreatePage />,
  //     },
  //     {
  //       path: "/mentor/courses",
  //       element: <CourseManagement />,
  //     },
  //     {
  //       path: "/mentor/course/update/:courseId",
  //       element: <CourseUpdate />
  //     },
  //     {
  //       path: "/mentor/course/view/:courseId",
  //       element: <ViewCourse />
  //     },
  //     {
  //       path: "/mentor/bookings",
  //       element: <MentorBookings />
  //     },
  //     {
  //       path: "/mentor/profile",
  //       element: <MentorProfile />
  //     },
  //     {
  //       path: "/mentor/students",
  //       element: <Students />
  //     },
  //     {
  //       path: "/mentor/course/:courseId/add-videos",
  //       element: <AddVideos />
  //     },
  //     {
  //       path: "/mentor/course/:courseId/update-videos",
  //       element: <UpdateVideos />
  //     },
  //     {
  //       path: "/learner/dashboard",
  //       element: <LearnerDashboard />
  //     },
  //     {
  //       path: "/learner/bookings",
  //       element: <LearnerBookings />
  //     },
  //     {
  //       path: "/learner/my-courses",
  //       element: <MyCourses />
  //     },
  //   ],
  // },
  // {
  //   path: "/",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Home />,
  //     },
  //     {
  //       path: "/mentor/register",
  //       element: <MentorRegistration />,
  //     },
  //     {
  //       path: "/learner/register",
  //       element: <LearnerRegistration />,
  //     },
  //     {
  //       path: "/login",
  //       element: <Login />,
  //     },
  //   ],
  // },
  // {
  //   path: "/mentor",
  //   element: <MentorLayout />,
  //   children: [
  //     {
  //       path: "/mentor",
  //       element: <Navigate to={"/mentor/dashboard"} replace />,
  //     },
  //     {
  //       path: "dashboard",
  //       element: <MentorDashboard />,
  //     },
  //     {
  //       path: "course/create",
  //       element: <CourseCreatePage />,
  //     },
  //     {
  //       path: "courses",
  //       element: <CourseManagement />,
  //     },
  //     {
  //       path: "course/update/:courseId",
  //       element: <CourseUpdate />,
  //     },
  //     {
  //       path: "course/view/:courseId",
  //       element: <ViewCourse />,
  //     },
  //     {
  //       path: "bookings",
  //       element: <MentorBookings />,
  //     },
  //     {
  //       path: "profile",
  //       element: <MentorProfile />,
  //     },
  //     {
  //       path: "students",
  //       element: <Students />,
  //     },
  //     {
  //       path: "course/:courseId/add-videos",
  //       element: <AddVideos />,
  //     },
  //     {
  //       path: "course/:courseId/update-videos",
  //       element: <UpdateVideos />,
  //     },
  //   ],
  // },
  // {
  //   path: "/learner",
  //   element: <LearnerLayout />,
  //   children: [
  //     {
  //       path: "/learner",
  //       element: <Navigate to={"/learner/dashboard"} replace />,
  //     },
  //     {
  //       path: "dashboard",
  //       element: <LearnerDashboard />,
  //     },
  //     {
  //       path: "bookings",
  //       element: <LearnerBookings />,
  //     },
  //     {
  //       path: "my-courses",
  //       element: <MyCourses />,
  //     },
  //     {
  //       path: "profile",
  //       element: <LearnerProfile />,
  //     },
  //     {
  //       path: "courses",
  //       element: <Courses />,
  //     },
  //     {
  //       path: "mentors",
  //       element: <Mentors />,
  //     },
  //     {
  //       path: "courses/view/:courseId",
  //       element: <LearnerCourseView />,
  //     },
  //     {
  //       path: "mentors/view/:mentorId",
  //       element: <MentorView />,
  //     },
  //     {
  //       path: "book-session/:mentorId",
  //       element: <BookSession />,
  //     },
  //     {
  //       path: "courses/watch/:courseId",
  //       element: <WatchCourse />,
  //     },
  //   ],
  // },

  //Guest routes
  {
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    { path: "/", element: <Home /> },
    {
      element: <GuestRoute />, // <-- protect guest routes
      children: [
        { path: "/login", element: <Login /> },
        { path: "/mentor/register", element: <MentorRegistration /> },
        { path: "/learner/register", element: <LearnerRegistration /> },
      ],
    },
  ],
},

// Mentor routes
{
  path: "/mentor",
  element: <ProtectedRoute role="mentor" />, // protect all mentor routes
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <MentorLayout />,
      children: [
        {path: "", element: <Navigate to={"/mentor/dashboard"} />},
        { path: "dashboard", element: <MentorDashboard /> },
        { path: "course/create", element: <CourseCreatePage /> },
        { path: "courses", element: <CourseManagement /> },
        { path: "course/update/:courseId", element: <CourseUpdate /> },
        { path: "course/view/:courseId", element: <ViewCourse /> },
        { path: "bookings", element: <MentorBookings /> },
        { path: "profile", element: <MentorProfile /> },
        { path: "students", element: <Students /> },
        { path: "course/:courseId/add-videos", element: <AddVideos /> },
        { path: "course/:courseId/update-videos", element: <UpdateVideos /> },
      ]
    }
  ]
},

// Learner routes
{
  path: "/learner",
  element: <ProtectedRoute role="learner" />, // protect all learner routes
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <LearnerLayout />,
      children: [
        { path: "dashboard", element: <LearnerDashboard /> },
        { path: "bookings", element: <LearnerBookings /> },
        { path: "my-courses", element: <MyCourses /> },
        { path: "profile", element: <LearnerProfile /> },
        { path: "courses", element: <Courses /> },
        { path: "mentors", element: <Mentors /> },
        { path: "courses/view/:courseId", element: <LearnerCourseView /> },
        { path: "mentors/view/:mentorId", element: <MentorView /> },
        { path: "book-session/:mentorId", element: <BookSession /> },
        { path: "courses/watch/:courseId", element: <WatchCourse /> },
        { path: "mentors/:mentorId/reviews", element: <ViewMentorReviews /> },
        { path: "courses/:courseId/reviews", element: <ViewMentorReviews /> },
      ]
    }
  ]
}, 

]);

createRoot(document.getElementById("root")).render(
  
  <AuthProvider>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <RouterProvider router={allRoutes} />
  </AuthProvider>
);
