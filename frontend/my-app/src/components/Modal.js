import React from 'react';
import './Modal.css'; // Assuming you will add some custom styles for the modal

const Modal = ({ show, close }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Volunteer Registration</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Info</label>
            <input type="text" id="contact" className="form-control" />
          </div>
          <button type="submit" className="cta-button">Submit</button>
        </form>
        <button className="cta-button close-button" onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
