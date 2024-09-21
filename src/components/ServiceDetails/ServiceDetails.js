import React, { useState, useEffect } from 'react';
import { useParams, Link,useLocation } from 'react-router-dom';
import axios from 'axios';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './ServiceDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const ServiceDetails = () => {
  const { name } = useParams();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { data } = location.state || {};
  // States for filters
  const [isNavActive, setIsNavActive] = useState(false);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/service/${name}`);
        const data = response.data;
        setServices(Array.isArray(data) ? data : [data]);
        setFilteredServices(Array.isArray(data) ? data : [data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError('Failed to fetch service details');
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [name]);

  const filterServices = () => {
    let filtered = services;
    if (selectedState) {
      filtered = filtered.filter(service => service.state === selectedState);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(service => service.district === selectedDistrict);
    }
    if (selectedCity) {
      filtered = filtered.filter(service => service.city === selectedCity);
    }
    setFilteredServices(filtered);
  };

  useEffect(() => {
    filterServices();
  }, [selectedState, selectedDistrict, selectedCity, services]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (services.length === 0) return <div>No services found for {name}</div>;

  const uniqueStates = [...new Set(services.map(service => service.state))];
  const uniqueDistricts = [...new Set(services.map(service => service.district))];
  const uniqueCities = [...new Set(services.map(service => service.city))];

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '27px' }}>
            SkillBridge
          </h1>
        </div>
        <div className="nav-right">
          <ul className={`nav-links ${isNavActive ? 'active' : ''}`} id="navLinks">
            <li><Link to="/Home" >Home</Link></li>
            <li><Link to="/shorts" >Shorts</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/">LogOut</Link></li>
            {/* <li>
              <Link to="/notifications" state={{ data: data }} className="notification-link">
                <FontAwesomeIcon icon={faBell} />
              </Link>
            </li> */}
          </ul>
          <div className="profile">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Profile"
              className="profile-img"
            />
          </div>
          <div className="hamburger" id="hamburger" onClick={toggleNav}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
      {/* {/* <h1>{name} Artists</h1> */}
      <h2 style={{ textAlign: "center"}}>Number of {name} artists: {filteredServices.length}</h2>

      {/* Filters in a row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <label>
          State:
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
            <option value="">All States</option>
            {uniqueStates.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </label>

        <label>
          District:
          <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
            <option value="">All Districts</option>
            {uniqueDistricts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
        </label>

        <label>
          City:
          <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            <option value="">All Cities</option>
            {uniqueCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Display filtered services in previous style */}
      {filteredServices.map((service, index) => (
        <div key={index} className="service-box">
          <div className="media-section">
            <div className="media-column">
              {/* <h4>Images:</h4> */}
              {service.demoImages && service.demoImages.length > 0 ? (
                service.demoImages.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`http://localhost:5000/uploads/${image}`}
                    alt={`Image ${imgIndex}`}
                    className="service-image"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>

            {/* <div className="media-column">
              <h4>Videos:</h4>
              {service.demoVideos && service.demoVideos.length > 0 ? (
                service.demoVideos.map((video, videoIndex) => (
                  <video
                    key={videoIndex}
                    controls
                    src={`http://localhost:5000/uploads/${video}`}
                    className="service-video"
                  >
                    Your browser does not support the video tag.
                  </video>
                ))
              ) : (
                <p>No videos available</p>
              )}
            </div> */}
          </div>

          <div className="details-section">
            <pre> <p><strong></strong><h3>{service.fullName}</h3></p></pre>
            {/* <p><strong>Email:</strong> {service.email}</p> */}
            <p><strong>Gender:</strong> {service.gender}</p>
            <p><strong>Price:</strong> {service.price}$</p>
            <p><strong>About:</strong> {service.about}</p>
            <p>
              <strong>Location <faMapMarkerAlt /> :</strong> {service.city}, {service.district}, {service.state}, India
            </p>
            <Link className='bookbutton'
            to={`/booked-services`} 
            state={{ 
              serviceName: name, 
              artistName: service.fullName, 
              demoImages: service.demoImages, 
              email: service.email 
            }}
          >   <button className="btncal">Book Service</button>
          </Link>
          </div>

          {/* <Link to="/booked-services" state={{ service }}>
            <button className="btncal">Book Service</button>
          </Link> */}
        </div>
      ))}
    </div>
  );
};

export default ServiceDetails;