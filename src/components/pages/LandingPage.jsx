import React from 'react'
import Footer from '../Footer'
import Discover from '../Discover'
import Testimonial from '../Testimonial'
import NavWithHero from '../Backgroundimg/NavWithHero'
import Category from '../Category'
import Work from '../Work'
import Choose from '../Choose'
import Events from '../Events'

const LandingPage = () => {
  return (
    <div>
        <NavWithHero/>
        <Events/>
        <Category/>
        <Work/>
        <Choose/>
        <Testimonial/>
        <Discover/>
        <Footer/>
    </div>
  )
}

export default LandingPage