import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import heroimg from '../Assests/images/herogroup.png'
import heroAnalytics from '../Assests/images/analayticsGraph.png'
import heroDashboard from '../Assests/images/analyticsDashboard.png'

const HeroBanner = () => {
    return (
        <div className="container mr-0 pr-0 hero-container">
            <div className="row d-flex align-items-center justify-content-center mr-0 pr-0">
                <div className='col-md-7 col-lg-7 col-sm-12'>
                    <div className='d-flex flex-column text-start'>
                        <span className='font-14 fw-bold primary-color responsive-font'>Welcome</span>
                        <span className='font-58 font-30 fw-bold'>Online<br></br> Appoinment</span>
                        <span className='font-16 text-muted responsive-font-subheading lh-30'>Medical Functional is most focused in helping you<br></br>
                            discover your most beauiful smile</span>
                        <div className='d-flex gap-2'>
                            <Button className='text-white primary-background-color text-white font-14 fw-normal pt-2 pl-5 pr-5 pb-2 rounded responsive-font'>Get Quote Now</Button>
                            <Button variant='none' className='btn btn-normal primary-border  font-14 primary-color pt-2 pl-3 pr-3 pb-2 rounded responsive-font btn-hover'>Learn More</Button>
                        </div>
                    </div>
                </div>
                <div className='col-md-5 col-lg-5 col-sm-12'>
                    <div className="img-wrapper">
                    <img src={heroimg} alt='heroimg' className='img-fluid heroimg'></img>
                    <img src={heroAnalytics} alt='heroAnalytics' className='heroAnalytics w-50'></img>
                    <img src={heroDashboard} alt='heroDashboard' className='heroDashboard'></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner