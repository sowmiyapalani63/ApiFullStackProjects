import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addTestimonial } from '../../featrues/testimonialSlice';

const TestimonialForm = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({ name: '', role: '', testimonial: '', rating: 0 });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTestimonial(formData));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Submit Your Testimonial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="testimonial">
            <Form.Label>Testimonial</Form.Label>
            <Form.Control
              as="textarea"
              name="testimonial"
              value={formData.testimonial}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.5"
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TestimonialForm;
