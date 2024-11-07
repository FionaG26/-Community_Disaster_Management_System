import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import IncidentReport from './IncidentReport';
import IncidentList from './IncidentList';
import UpdateIncidentStatus from './UpdateIncidentStatus';
import Volunteer from './Volunteer';
import Contact from './Contact';
import Footer from './Footer';

const App = () => (
  <div>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <IncidentReport/>
    <IncidentList/>
    <UpdateIncidentStatus/>
    <Volunteer />
    <Contact />
    <Footer />
  </div>
);

export default App;
