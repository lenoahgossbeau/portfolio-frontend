import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/Researcher_pages/ResearcherNavBar"
import Tabbar from '@/components/Researcher_pages/ResearcherTabBar'

export default function page() {
  return (
    <div>
        {/** For creating new researcher */}
        <Navbar />
        <Tabbar admin={true} mode="create" />
    
    </div>
  )
}