import React from 'react'
import Header from '../components/Header'
import Landing from '../components/Landing'
import LandingPicture1 from '../assets/imagesLanding/LandingPicture1.png'
import LandingPicture2 from '../assets/imagesLanding/LandingPicture2.png'
import LandingPicture3 from '../assets/imagesLanding/LandingPicture3.png'
import LandingPicture4 from '../assets/imagesLanding/LandingPicture4.png'
import LandingPicture5 from '../assets/imagesLanding/LandingPicture5.png'
import LandingPicture6 from '../assets/imagesLanding/LandingPicture6.png'
import LandingPicture7 from '../assets/imagesLanding/LandingPicture7.png'

const images = [LandingPicture1, LandingPicture2, LandingPicture3, LandingPicture4, LandingPicture5, LandingPicture6, LandingPicture7]

const InicialPage = () => {
  return (
    <div>
      <Landing images={images}/>
    </div>
  )
}

export default InicialPage
