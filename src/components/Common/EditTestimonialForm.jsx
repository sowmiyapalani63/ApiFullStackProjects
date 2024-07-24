import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const EditTestimonialForm = ({ testimonial, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: testimonial.name,
    role: testimonial.role,
    testimonial: testimonial.testimonial,
    rating: testimonial.rating,
    image: testimonial.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label className="font-14 fw-bold">Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="font-14 fw-bold">Role</Form.Label>
        <Form.Control
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="font-14 fw-bold">Testimonial</Form.Label>
        <Form.Control
          as="textarea"
          name="testimonial"
          value={formData.testimonial}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="font-14 fw-bold">Rating</Form.Label>
        <Form.Control
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="font-14 fw-bold">Image</Form.Label>
        <Form.Control
          type="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="danger" onClick={onCancel} className="me-2 " >Cancel</Button>
        <Button variant="primary" type="submit" className=' '>Save</Button>
      </div>
    </Form>
  );
};

EditTestimonialForm.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    testimonial: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTestimonialForm;
