import React from 'react'

import NavwithHeroAbout from '../Backgroundimg/NavwithHeroAbout'
import Footer from '../Footer'
import Testimonial from '../Testimonial'
import Discover from '../Discover'
import Choose from '../Choose'
import Signature from '../Signature'
import Team from '../Team'
import Vision from '../Vision'

const AboutPage = () => {
  return (
    <div>
        {/* Aboutpage */}
        <NavwithHeroAbout/>
        <Vision/>
        <Choose/>
        <Team/>
        <Signature/>
        <Testimonial/>
        <Discover/>
        <Footer/>
    </div>
  )
}

export default AboutPage