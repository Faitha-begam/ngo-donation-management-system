import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Impact from './components/Impact'
import FeaturedCampaigns from './components/FeaturedCampaigns'
import SuccessStories from './components/SuccessStories'

const App = () => {
  return (
    <>
      <Navbar/>
      
      <Hero/>

      <Impact/>

      <FeaturedCampaigns/>

      <SuccessStories/>
      
      <Footer/>
    </>
  )
}

export default App
