import React from 'react';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">
      <img src="/images/logo.png" alt="CDMS Logo" width="40" height="40" style={{ verticalAlign: 'middle' }} />
      CDMS
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
        <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
        <li className="nav-item"><a className="nav-link" href="#volunteer">Volunteer</a></li>
        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
