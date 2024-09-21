// import React, { useState, useEffect } from 'react';
// import './myworks.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';

// export const Myworks = () => {
//     const [acceptedWorks, setAcceptedWorks] = useState([]);
//     // const profEmail = "nikki@gmail.com"; // Replace with dynamic email, or use context/state to get the logged-in user's email
//     const location = useLocation();
//     const { data } = location.state || {};
//     console.log(data);
//     const profEmail = data; // Replace with dynamic email, or use context/state to get the logged-in user's email

//     useEffect(() => {
//         const fetchAcceptedWorks = async () => {
//             try {
//                 const response = await axios.post('http://localhost:5000/myworks', { profEmail });
//                 setAcceptedWorks(response.data); // Set the accepted works in state
//             } catch (error) {
//                 console.error('Error fetching accepted works:', error);
//             }
//         };

//         fetchAcceptedWorks();
//     }, [profEmail]);

//     return (
//         <>
//             <nav className="navbar">
//                 <div className="logo">
//                     <h1 style={{ fontFamily: "Courier New', Courier, monospace", fontSize: '27px' }}>
//                         SkillBridge
//                     </h1>
//                 </div>
//                 <div className="nav-right">
//                     <ul className="nav-links">
//                         <li><Link to="/AHome" state={{ data: data }}>Home</Link></li>
//                         <li><Link to="/myworks" state={{ data: data }}>My Works</Link></li>
//                         <li><Link to="/Ashorts" state={{ data: data }}>Shorts</Link></li>
//                         <li><Link to="/Aservices" state={{ data: data }}>Services</Link></li>
//                         <li>
//                             <Link to="/notifications" state={{ data: data }} className="notification-link">
//                                 <FontAwesomeIcon icon={faBell} />
//                             </Link>
//                         </li>
//                     </ul>
//                     <div className="profile">
//                         <img
//                             src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
//                             alt="Profile"
//                             className="profile-img"
//                         />
//                     </div>
//                 </div>
//             </nav>
//             <div className='myworks-container'>
//                 <h1>My Works</h1>
//                 {acceptedWorks.length > 0 ? (
//                     <ul>
//                         {acceptedWorks.map((work, index) => (
//                             <li key={index}>
//                                 <p>Hand Type: {work.handType}</p>
//                                 <p>Number of Hands: {work.numberOfHands}</p>
//                                 <p>Address: {work.address}</p>
//                                 <p>Start Time: {work.startTime}</p>
//                                 <p>End Time: {work.endTime}</p>
//                                 <p>Total Price: {work.totalPrice}</p>
//                                 <p>User Email: {work.userEmail}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No accepted works yet.</p>
//                 )}
//             </div>
//         </>
//     );
// };


import React, { useState, useEffect } from 'react';
import './myworks.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export const Myworks = () => {
    const [acceptedWorks, setAcceptedWorks] = useState([]);
    // const profEmail = "nikki@gmail.com"; // Replace with dynamic email, or use context/state to get the logged-in user's email
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);
    const profEmail = data; // Replace with dynamic email, or use context/state to get the logged-in user's email

    useEffect(() => {
        const fetchAcceptedWorks = async () => {
            try {
                const response = await axios.post('http://localhost:5000/myworks', { profEmail });
                setAcceptedWorks(response.data); // Set the accepted works in state
            } catch (error) {
                console.error('Error fetching accepted works:', error);
            }
        };

        fetchAcceptedWorks();
    }, [profEmail]);

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <h1 style={{ fontFamily: "Courier New', Courier, monospace", fontSize: '27px' }}>
                        SkillBridge
                    </h1>
                </div>
                <div className="nav-right">
                    <ul className="nav-links">
                        <li><Link to="/AHome" state={{ data: data }}>Home</Link></li>
                        <li><Link to="/myworks" state={{ data: data }}>My Works</Link></li>
                        <li><Link to="/Ashorts" state={{ data: data }}>Shorts</Link></li>
                        <li><Link to="/Aservices" state={{ data: data }}>Services</Link></li>
                        <li>
                            <Link to="/notifications" state={{ data: data }} className="notification-link">
                                <FontAwesomeIcon icon={faBell} />
                            </Link>
                        </li>
                        <li><Link to="/" state={{ data: data }}>LogOut</Link></li>

                    </ul>
                    <div className="profile">
                        <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt="Profile"
                            className="profile-img"
                        />
                    </div>
                </div>
            </nav>
            <div className='myworks-container'>
                <h1>My Works</h1>
                {acceptedWorks.length > 0 ? (
                    <table>
                        <tr>
                            <th>Hand Type</th>
                            <th>Number of Hands</th>
                            <th>Address </th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Total Price</th>
                            {/* <th>User Email</th> */}
                        </tr>
                        {acceptedWorks.map((work, index) => (
                            <tr key={index}>
                                <td data-label="Hand Type">{work.handType}</td>
                                <td data-label="Number of Hands">{work.numberOfHands}</td>
                                <td data-label="Address">{work.address}</td>
                                <td data-label="Start Time">{work.startTime}</td>
                                <td data-label="End Time">{work.endTime}</td>
                                <td data-label="Total Price">{work.totalPrice}</td>
                                {/* <td data-label="User Email">{work.userEmail}</td> */}
                            </tr>
                        ))}
                    </table>

                ) : (
                    <p>No accepted works yet.</p>
                )}
            </div>
        </>
    );
};
