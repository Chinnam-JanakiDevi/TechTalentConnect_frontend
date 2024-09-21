import React, { useState, useEffect } from 'react';
import './Mbook.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Mbook = () => {
  const location = useLocation();
  const { serviceName, artistName, demoImages, email } = location.state || {}; // Get email from location.state

  const [message, setMessage] = useState('');
  const [handType, setHandType] = useState('half');
  const [numberOfHands, setNumberOfHands] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profEmail, setProfEmail] = useState(email || ''); // Correctly set profEmail
  const [isNavActive, setIsNavActive] = useState(false);
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };
  // console.log(email);
  const calculateTotal = () => {
    const price = handType === 'half' ? 50 : 100;
    setTotalPrice(price * numberOfHands);
  };
  const handleBooking = async () => {
    const formData = {
      handType,
      numberOfHands,
      address,
      startTime,
      endTime,
      userEmail,
      profEmail
    };

    try {
      const response = await axios.post('http://localhost:5000/book', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('Registration successful');
      setTimeout(() => {
        setMessage('');
        setHandType('')
        setNumberOfHands('')
        setAddress('')
        setHandType('')
        setStartTime('')
        setEndTime('')
        setUserEmail('')
      }, 1000);
    } catch (error) {
      alert('Error sending booking request');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <h1 style={{ fontFamily: "Courier New', Courier, monospace", fontSize: '27px' }}>
            SkillBridge
          </h1>
        </div>
        <div className="nav-right">
          <ul className={`nav-links ${isNavActive ? 'active' : ''}`} id="navLinks">
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/shorts">Shorts</Link></li>
            <li><Link to="/services">Services</Link></li>
            {/* <li><Link to="/booked-services">Booked Services</Link></li> */}
            <li><Link to="/">LogOut</Link></li>
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
      <div className="mbook-container">
        {/* Left Section */}
        <div className="left-section">
          <h1 style={{ color: "#55AD9B" }}>Book {serviceName}</h1>
          <div className='image-display'>
            {demoImages && demoImages.length > 0 ? (
              demoImages.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={`http://localhost:5000/uploads/${image}`}
                  alt={`Image ${imgIndex}`}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="service-info">
            <p>Service By: {artistName}</p>
            <p>Email: {email}</p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="right-section">
          <div className="form-container">
            <form>
              <div className="form-group">
                <label htmlFor="handType">Select Hand Type:</label>
                <select id="handType" value={handType} onChange={(e) => setHandType(e.target.value)}>
                  <option value="half">Half Hand</option>
                  <option value="full">Full Hand</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="numberOfHands">Number of Hands:</label>
                <input
                  type="number"
                  id="numberOfHands"
                  min="1"
                  value={numberOfHands}
                  onChange={(e) => setNumberOfHands(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Enter Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="startTime">Start Date & Time:</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Date & Time:</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="userEmail">Your Email:</label>
                <input
                  type="email"
                  id="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className='MButtons'>
                <button type="button" className='b12' onClick={calculateTotal}>Calculate Total Price</button>
                <button type="button" className='b12' onClick={handleBooking}>Submit Booking</button>
              </div>
              {totalPrice > 0 && <div className="total-price">Total Price: ${totalPrice}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mbook;