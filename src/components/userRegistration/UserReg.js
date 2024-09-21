import './userReg.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUserTie, faSignInAlt } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const UserReg = () => {
    const [message, setMessage] = useState('');
    const [passmsg, setpassmsg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [InterestedAreas, setInterestedAreas] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for the POST request
        const data = {
            name,
            email,
            phone_number,
            password,
            confirmPassword,
            gender,
            InterestedAreas
        };
        try {
            if (password != confirmPassword) {

            }
            const response = await axios.post('http://localhost:5000/userReg', data);
            console.log(response.data); // Handle the response
            setTimeout(() => {
                setMessage('Registration successful');
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('There was an error uploading the data!', error);
        }
    };

    return (
        <>
            {/* {message && <p>{message}</p>} */}
            <div className="body">
                <div className="wrapper">
                    {message && <h2 className='msg'>{message}</h2>}
                    <div className="reg-buttons">
                        <button onClick={() => navigate('/userReg')} className="nav-btn">
                        <FontAwesomeIcon icon={faIdCard } />                       </button>
                        <button className="nav-btn" onClick={() => navigate('/profReg')}>
                            <FontAwesomeIcon icon={faUserTie} /> 
                        </button>
                        <button className="nav-btn" onClick={() => navigate('/')}>
                            <FontAwesomeIcon icon={faSignInAlt} /> 
                        </button>
                    </div>

                    {/* <div className="reg-buttons">
                        <button onClick={() => navigate('/userReg')} className="nav-btn">
                            User Registration
                        </button>
                        <button onClick={() => navigate('/profReg')} className="nav-btn">
                            Professional Registration
                        </button>
                        <button onClick={() => navigate('/')} className="nav-btn">
                            Login
                        </button>
                    </div> */}
                    <h1 className="title" style={{ color: "black", textShadow: "none" ,fontSize:"30px"}}>User Registration</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="info">
                            <div className="input-box">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    placeholder="Enter Phone Number"
                                    value={phone_number}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <label>Interested Areas</label>
                                <textarea
                                    name="InterestedAreas"
                                    rows="4"
                                    cols="50"
                                    placeholder="Enter interested areas"
                                    value={InterestedAreas}
                                    onChange={(e) => setInterestedAreas(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="btn1">
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UserReg;
