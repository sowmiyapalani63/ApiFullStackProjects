import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeadingLayout from './Common/HeadingLayout';
import { handleHeading } from '../api';
import { TestimonialCard } from '../components/Common/TestimonialCard';
import { fetchTestimonials } from '../featrues/testimonialSlice';
import TestimonialForm from '../components/Common/NewTestimonialForm';

export const Testimonial = () => {
  const dispatch = useDispatch();
  const { testimonials = [], loading, error } = useSelector((state) => state.testimonials);
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchTestimonials());
    if (user && user.flag === false) {
      setShowModal(true); 
    }
  }, [dispatch, user]);

  const handleClose = () => {
    setShowModal(false);
    setTestimonialSubmitted(true);
  };

  const handleShowForm = () => setShowModal(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading testimonials: {error}</p>;

  const testimonialsToDisplay = user
    ? testimonials.filter(testimonial => testimonial.id === user.userid.toString())
    : testimonials;

  return (
    <div className='layout-max-width p-160 mx-auto padding-md p-sm-60'>
      <div className='container'>
        <div className="row gap-1">
          <HeadingLayout id="4" handleHeading={handleHeading} />
          <div className="row">
            {testimonialSubmitted ? (
              <div className='text-center mt-5'>
                <p>Thank you for the testimonial, <span className='fw-bold primary-color'>{user?.username}!</span></p>
              </div>
            ) : (
              <>
                {testimonialsToDisplay.length > 0 ? (
                  testimonialsToDisplay.map((testimonial, index) => (
                    <div className="col-md-4 col-lg-4 col-sm-12" key={index}>
                      <TestimonialCard testimonial={testimonial} isLoggedIn={!!user} />
                    </div>
                  ))
                ) : (
                  <div className='text-center mt-5'>
                    <p className='fw-normal'>
                      Enter your testimonial <span className='fw-normal text-primary' onClick={handleShowForm} style={{ cursor: 'pointer' }}>here</span>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {!testimonialSubmitted && <TestimonialForm show={showModal} handleClose={handleClose} />}
    </div>
  );
};
