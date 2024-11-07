import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import IncidentReport from './IncidentReport';
import IncidentList from './IncidentList';
import UpdateIncidentStatus from './UpdateIncidentStatus';
import ResourceList from './ResourceList;
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
    <ResourceList/>
    <Volunteer />
    <Contact />
    <Footer />
  </div>
);

export default App;
