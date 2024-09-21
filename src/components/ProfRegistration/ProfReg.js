import React, { useState } from 'react';
import axios from 'axios';
import './ProfReg.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faSignInAlt } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const ProfReg = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        skills: '',
        price: '',
        gender: '',
        about: '',
        state: '',
        district: '',
        city: ''
    });

    const [files, setFiles] = useState({
        demoImages: [],
        demoVideos: []
    });

    // Sample data for states, districts, and cities
    const stateDistrictCityData = {
        "Andhra Pradesh": {
            "Guntur": ["Guntur", "Narasaraopet", "Tenali"],
            "Vijayawada": ["Vijayawada", "Mangalagiri", "Kankipadu"]
        },
        "Maharashtra": {
            "Mumbai": ["Mumbai", "Andheri", "Bandra"],
            "Pune": ["Pune", "Kothrud", "Baner"]
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles({
            ...files,
            [name]: Array.from(selectedFiles)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        // Append form data and files to send via API
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        files.demoImages.forEach(image => data.append('demoImages', image));
        files.demoVideos.forEach(video => data.append('demoVideos', video));

        try {
            const response = await axios.post('http://localhost:5000/ProfReg', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTimeout(() => {
                setMessage('');
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Error uploading the data!', error);
        }
    };

    // Dynamically populate districts and cities based on selected state
    const districts = formData.state ? Object.keys(stateDistrictCityData[formData.state]) : [];
    const cities = formData.state && formData.district ? stateDistrictCityData[formData.state][formData.district] : [];

    return (
        <>
            {message && <p>{message}</p>} {/* Display success or error message */}

            <div className='body'>
                <div className="wrapper">
                    <div className="reg-buttons">
                        <button onClick={() => navigate('/userReg')} className="nav-btn">
                            <FontAwesomeIcon icon={faUser} /> 
                        </button>
                        <button className="nav-btn" onClick={() => navigate('/profReg')}>
                            <FontAwesomeIcon icon={faUserTie} /> 
                        </button>
                        <button className="nav-btn" onClick={() => navigate('/')}>
                            <FontAwesomeIcon icon={faSignInAlt} /> 
                        </button>
                    </div>
                    {message && <p>{message}</p>} {/* Display success or error message */}

                    <h1 className="title" style={{ color: "black", textShadow: "none" ,fontSize:"30px"}}>Professional Registration</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="info">
                            {/* Other Input Fields */}


                            <div className="input-box">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email Address"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <label>Gender</label>
                                <select name="gender" onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Proficient In / Skills</label>
                                <select name="skills" onChange={handleChange} required>
                                    <option value="">Select Skill</option>
                                    <option value="Mehandi Artists">Mehandi Artists</option>
                                    <option value="Painters">Painters</option>
                                    <option value="Photographers">Photographers</option>
                                    <option value="Hair Stylists">Hair Stylists</option>
                                    <option value="Event Planners">Event Planners</option>
                                    <option value="Caterers and Chefs">Caterers and Chefs</option>
                                    <option value="Wedding Planners">Wedding Planners</option>
                                    <option value="Interior Decorators">Interior Decorators</option>
                                    <option value="Electricians">Electricians</option>
                                    <option value="Drivers">Drivers</option>
                                    <option value="Carpenters">Carpenters</option>
                                    <option value="Plumbers">Plumbers</option>
                                    <option value="Fashion Stylists">Fashion Stylists</option>
                                    <option value="Personal Chefs">Personal Chefs</option>
                                    <option value="Paper Craft Artists">Paper Craft Artists</option>
                                    <option value="Jewelry Designers">Jewelry Designers</option>
                                    <option value="Personal Fitness Trainers">Personal Fitness </option>
                                </select>
                            </div>

                            <div className="input-box">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter Price"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <label>State</label>
                                <select name="state" onChange={handleChange} required>
                                    <option value="">Select State</option>
                                    {Object.keys(stateDistrictCityData).map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-box">
                                <label>District</label>
                                <select name="district" onChange={handleChange} required>
                                    <option value="">Select District</option>
                                    {districts.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-box">
                                <label>City</label>
                                <select name="city" onChange={handleChange} required>
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>

                                    ))}
                                </select>
                            </div>
                            <div className="input-box1">
                                <label>Demo Pictures</label>
                                <input
                                    type="file"
                                    name="demoImages"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

                            <div className="input-box1">
                                <label>Demo Videos</label>
                                <input
                                    type="file"
                                    name="demoVideos"
                                    accept="video/*"
                                    multiple
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

                            <div className="input-box1">
                                <label>About</label>
                                <textarea
                                    id="textarea"
                                    rows="4"
                                    cols="50"
                                    name="about"
                                    placeholder="Tell us about yourself"
                                    onChange={handleChange}
                                />
                            </div>


                            {/* Continue with other input fields */}
                        </div>

                        <div className="btn1">
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfReg;