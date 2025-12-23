import React from 'react'
import { Outlet } from 'react-router-dom'
import LearnerNavbar from '../components/learnerComponents/LearnerNavbar'

const LearnerLayout = () => {
  return (
    <>
        <LearnerNavbar />
        <Outlet />
    </>
  )
}

export default LearnerLayout
