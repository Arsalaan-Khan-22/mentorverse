import React from 'react'
import MentorNavbar from '../components/mentorComponents/MentorNavbar'
import { Outlet } from 'react-router-dom'

const MentorLayout = () => {
  return (
    <>
        <MentorNavbar />
        <Outlet />
    </>
  )
}

export default MentorLayout
