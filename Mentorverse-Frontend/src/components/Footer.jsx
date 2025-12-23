import React from "react";
import { FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-white px-24 text-gray-600 border-t border-(--primary-color)">
      <div className="mx-auto px-6 py-12 flex flex-wrap justify-between">
        <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
          <h2 className="text-[1.75rem] font-extrabold cursor-pointer relative bg-(image:--gradient-primary) text-transparent bg-clip-text leading-[200%] mb-5">MentorVerse</h2>
          <p className="mb-1">Connecting learners with expert mentors.</p>
          <p>Your journey to success starts here.</p>
          <div className="flex mt-6 space-x-4">
            <a
              href="#"
              aria-label="Twitter"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-(image:--gradient-primary) hover:text-white transition"
            >
              <FiTwitter />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-(image:--gradient-primary) hover:text-white transition"
            >
              <FiLinkedin />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-(image:--gradient-primary) hover:text-white transition"
            >
              <FiGithub />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-(image:--gradient-primary) hover:text-white transition"
            >
              <FiMail />
            </a>
          </div>
        </div>

        <div className="w-full sm:w-1/6 mb-8 sm:mb-0">
          <h3 className="font-bold mb-4">For Learners</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-(--primary-color) cursor-pointer">Find Mentors</li>
            <li className="hover:text-(--primary-color) cursor-pointer">Browse Courses</li>
            <li className="hover:text-(--primary-color) cursor-pointer">My Bookings</li>
            <li className="hover:text-(--primary-color) cursor-pointer">My Courses</li>
          </ul>
        </div>

        <div className="w-full sm:w-1/6 mb-8 sm:mb-0">
          <h3 className="font-bold mb-4">For Mentors</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-(--primary-color) cursor-pointer">Become a Mentor</li>
            <li className="hover:text-(--primary-color) cursor-pointer">Create Courses</li>
            <li className="hover:text-(--primary-color) cursor-pointer">View Earnings</li>
          </ul>
        </div>

        <div className="w-full sm:w-1/6">
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-(--primary-color) cursor-pointer">Help Center</li>
            <li className="hover:text-(--primary-color) cursor-pointer">Contact Us</li>
            <li className="hover:text-(--primary-color) cursor-pointer">Privacy Policy</li>
            <li className="hover:text-(--primary-color) cursor-pointer">Terms of Service</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 text-center text-gray-600 py-6 text-sm">
        © {new Date().getFullYear()} MentorVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
