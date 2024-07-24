
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import EditTestimonialForm from './EditTestimonialForm';
import { updateTestimonial,deleteTestimonial } from '../../featrues/testimonialSlice';

export const TestimonialCard = ({ testimonial, isLoggedIn }) => {
  const { name, role, testimonial: testimonialText, rating, image } = testimonial;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const generateStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={fullStars + 1 + i} className="bi bi-star text-warning"></i>);
    }

    return stars;
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleSave = (updatedTestimonial) => {
    dispatch(updateTestimonial({ ...testimonial, ...updatedTestimonial }));
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      dispatch(deleteTestimonial(testimonial.id));
    }
  };

  return (
    <>
      <div className="card p-5 padding-1 border-white p-0 card-max-height">
        <div className="card-body text-center card-max-height">
          <div className="5-star-rating d-flex justify-content-center align-items-center gap-1">
            {generateStarRating(rating)}
          </div>
          <span className="card-text fw-normal font-14 text-muted responsive-font">
            {testimonialText}
          </span>
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <img src={require(`../../Assests/images/${image}`)} alt={name} />
            <div className="d-flex flex-column text-start">
              <span className="fw-bold font-14 primary-color responsive-font">{name}</span>
              <span className="fw-bold font-14 responsive-font">{role}</span>
            </div>
          </div>
          {isLoggedIn && (
            <div className='d-flex flex-row justify-content-around align-items-center mt-1 testimonial-btn'>
              <Button variant="outline-primary" className='text-primary' onClick={handleEditClick}>
                Edit <i className="bi bi-pen"></i>
              </Button>
              <Button variant='outline-danger' className='text-danger' onClick={handleDelete}>
                Delete <i className="bi bi-trash3"></i>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center fw-bold font-16 primary-color">Edit Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTestimonialForm
            testimonial={testimonial}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    testimonial: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default TestimonialCard;
