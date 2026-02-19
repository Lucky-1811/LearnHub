import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const CourseCard = ({
  course,
  userLoggedIn,
  showModal,
  onStartCourse,
  onClose,
  onSubmitPayment,
  cardDetails,
  onCardChange,
}) => {
  const description = course?.sections?.[0]?.S_description || "Hands-on modules with expert guidance.";

  return (
    <div className="course-card fade-in">
      <div className="course-media">
        <div className="course-badge">{course.C_categories}</div>
      </div>
      <div className="course-body">
        <h4 className="course-title">{course.C_title}</h4>
        <p className="course-meta">by {course.C_educator}</p>
        <p className="course-desc">{description}</p>
        <div className="course-stats">
          <span>{course.sections.length} sections</span>
          <span>{course.enrolled} enrolled</span>
          <span>{course.C_price}</span>
        </div>
        <div className="course-actions">
          {userLoggedIn ? (
            <Button className="btn-gradient" onClick={onStartCourse}>
              Start Course
            </Button>
          ) : (
            <Link to="/login" className="btn-gradient">Start Course</Link>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment for {course.C_title} Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="payment-meta">Educator: {course.C_educator}</p>
          <p className="payment-meta">Price: {course.C_price}</p>
          <Form onSubmit={onSubmitPayment}>
            <MDBInput
              className="mb-2"
              label="Card Holder Name"
              name="cardholdername"
              value={cardDetails.cardholdername}
              onChange={onCardChange}
              type="text"
              size="md"
              placeholder="Cardholder's Name"
              contrast
              required
            />
            <MDBInput
              className="mb-2"
              name="cardnumber"
              value={cardDetails.cardnumber}
              onChange={onCardChange}
              label="Card Number"
              type="number"
              size="md"
              minLength="0"
              maxLength="16"
              placeholder="1234 5678 9012 3457"
              required
            />
            <MDBRow className="mb-4">
              <MDBCol md="6">
                <MDBInput
                  name="expmonthyear"
                  value={cardDetails.expmonthyear}
                  onChange={onCardChange}
                  className="mb-2"
                  label="Expiration"
                  type="text"
                  size="md"
                  placeholder="MM/YYYY"
                  required
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  name="cvvcode"
                  value={cardDetails.cvvcode}
                  onChange={onCardChange}
                  className="mb-2"
                  label="Cvv"
                  type="number"
                  size="md"
                  minLength="3"
                  maxLength="3"
                  placeholder="***"
                  required
                />
              </MDBCol>
            </MDBRow>
            <div className="d-flex justify-content-end">
              <Button className="mx-2" variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Pay Now
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CourseCard;
