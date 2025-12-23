import React, { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import FeaturedMentors from '../components/FeaturedMentors'
import FeaturedCourses from '../components/FeaturedCourses'
import Footer from '../components/Footer'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [mentors, setMentors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMentors = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/mentors');
        console.log(response.data.data.content.slice(0,4))
        setMentors(response.data.data.content.slice(0, 4));
      } catch (err) {
        setError('Failed to fetch mentors.');
      } finally {
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/courses');
        setCourses(response.data.data.content.slice(0, 4));
      } catch (err) {
        setError('Failed to fetch mentors.');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchMentors();
    fetchCourses();
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedMentors mentors={mentors} loading={loading} error={error} onNavigate={navigate} />
      <FeaturedCourses courses={courses} loading={loading} error={error} onNavigate={navigate} />
      <Footer />
    </>
  )
}

export default Home
