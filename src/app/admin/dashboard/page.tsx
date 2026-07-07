import React from 'react'
import Sidebar from '@/components/Admin_pages/Sidebar'
import Navbar from '@/components/Researcher_pages/ResearcherNavBar'


export default function page() {
  return (
    <div>

      <Navbar admin = { true } />
      <Sidebar />

    </div>
  )
}
 