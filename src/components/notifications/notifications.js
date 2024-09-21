
// import React, { useState, useEffect } from 'react';
// import './notifications.css';
// import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';

// const Notifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const [pendingNotifications, setPendingNotifications] = useState([]);
//     const [acceptedNotifications, setAcceptedNotifications] = useState([]);
//     const [rejectedNotifications, setRejectedNotifications] = useState([]);
//     const [clickedButtons, setClickedButtons] = useState({});

//     const location = useLocation();
//     const { data } = location.state || {};

//     const fetchNotifications = async () => {
//         try {
//             if (data) {
//                 const response = await axios.get(`http://localhost:5000/getNotifications/${data}`);
//                 setNotifications(response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//         }
//     };

//     useEffect(() => {
//         if (data) {
//             fetchNotifications();
//         }
//     }, [data]);

//     useEffect(() => {
//         const pending = notifications.filter(notification => notification.status === 'pending');
//         const accepted = notifications.filter(notification => notification.status === 'accepted');
//         const rejected = notifications.filter(notification => notification.status === 'rejected');

//         setPendingNotifications(pending);
//         setAcceptedNotifications(accepted);
//         setRejectedNotifications(rejected);
//     }, [notifications]);

//     const handleAccept = async (notification) => {
//         try {
//             await axios.post('http://localhost:5000/acceptBooking', {
//                 userEmail: notification.userEmail
//             });
//             console.log('Booking accepted');

//             setPendingNotifications(prev => prev.filter(n => n._id !== notification._id));
//             setAcceptedNotifications(prev => [...prev, { ...notification, status: 'accepted' }]);

//             setClickedButtons(prevState => ({
//                 ...prevState,
//                 [notification._id]: 'accepted',
//             }));
//         } catch (error) {
//             console.error('Error accepting booking:', error);
//         }
//     };

//     const handleReject = async (notification) => {
//         try {
//             await axios.post('http://localhost:5000/rejectBooking', {
//                 userEmail: notification.userEmail
//             });
//             console.log('Booking rejected');

//             setPendingNotifications(prev => prev.filter(n => n._id !== notification._id));
//             setRejectedNotifications(prev => [...prev, { ...notification, status: 'rejected' }]);

//             setClickedButtons(prevState => ({
//                 ...prevState,
//                 [notification._id]: 'rejected',
//             }));
//         } catch (error) {
//             console.error('Error rejecting booking:', error);
//         }
//     };

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
//                     <li><Link to="/AHome" state={{ data: data }}>Home</Link></li>
//                     <li><Link to="/myworks" state={{ data: data }}>My Works</Link></li>
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

//             <div className="Notifications-container">
//                 <h2>Pending Notifications</h2>
//                 <ul>
//                     {pendingNotifications.length > 0 ? (
//                         pendingNotifications.map((notification) => (
//                             <li key={notification._id} className="notification-item">
//                                 <p><strong>Hand Type:</strong> {notification.handType}</p>
//                                 <p><strong>Number of Hands:</strong> {notification.numberOfHands}</p>
//                                 <p><strong>Address:</strong> {notification.address}</p>
//                                 <p><strong>Start Time:</strong> {new Date(notification.startTime).toLocaleString()}</p>
//                                 <p><strong>End Time:</strong> {new Date(notification.endTime).toLocaleString()}</p>
//                                 <p><strong>Total Price:</strong> ${notification.totalPrice}</p>
//                                 <div className="notification-buttons">
//                                     <button
//                                         className="accept-button"
//                                         onClick={() => handleAccept(notification)}
//                                         disabled={clickedButtons[notification._id] === 'accepted'}
//                                     >
//                                         Accept
//                                     </button>
//                                     <button
//                                         className="reject-button"
//                                         onClick={() => handleReject(notification)}
//                                         disabled={clickedButtons[notification._id] === 'rejected'}
//                                     >
//                                         Reject
//                                     </button>
//                                 </div>
//                             </li>
//                         ))
//                     ) : (
//                         <p>No pending notifications</p>
//                     )}
//                 </ul>

//                 <h2>Accepted Notifications</h2>
//                 <ul>
//                     {acceptedNotifications.length > 0 ? (
//                         acceptedNotifications.map((notification) => (
//                             <li key={notification._id} className="notification-item">
//                                 <p><strong>Hand Type:</strong> {notification.handType}</p>
//                                 <p><strong>Number of Hands:</strong> {notification.numberOfHands}</p>
//                                 <p><strong>Address:</strong> {notification.address}</p>
//                                 <p><strong>Start Time:</strong> {new Date(notification.startTime).toLocaleString()}</p>
//                                 <p><strong>End Time:</strong> {new Date(notification.endTime).toLocaleString()}</p>
//                                 <p><strong>Total Price:</strong> ${notification.totalPrice}</p>
//                                 <p>Status: Accepted</p>
//                             </li>
//                         ))
//                     ) : (
//                         <p>No accepted notifications</p>
//                     )}
//                 </ul>

//                 <h2>Rejected Notifications</h2>
//                 <ul>
//                     {rejectedNotifications.length > 0 ? (
//                         rejectedNotifications.map((notification) => (
//                             <li key={notification._id} className="notification-item">
//                                 <p><strong>Hand Type:</strong> {notification.handType}</p>
//                                 <p><strong>Number of Hands:</strong> {notification.numberOfHands}</p>
//                                 <p><strong>Address:</strong> {notification.address}</p>
//                                 <p><strong>Start Time:</strong> {new Date(notification.startTime).toLocaleString()}</p>
//                                 <p><strong>End Time:</strong> {new Date(notification.endTime).toLocaleString()}</p>
//                                 <p><strong>Total Price:</strong> ${notification.totalPrice}</p>
//                                 <p>Status: Rejected</p>
//                             </li>
//                         ))
//                     ) : (
//                         <p>No rejected notifications</p>
//                     )}
//                 </ul>
//             </div>
//         </>
//     );
// };

// export default Notifications;


import React, { useState, useEffect } from 'react';
import './notifications.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [pendingNotifications, setPendingNotifications] = useState([]);
    const [acceptedNotifications, setAcceptedNotifications] = useState([]);
    const [rejectedNotifications, setRejectedNotifications] = useState([]);
    const [clickedButtons, setClickedButtons] = useState({});

    const location = useLocation();
    const { data } = location.state || {};

    const fetchNotifications = async () => {
        try {
            if (data) {
                const response = await axios.get(`http://localhost:5000/getNotifications/${data}`);
                setNotifications(response.data);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        if (data) {
            fetchNotifications();
        }
    }, [data]);

    useEffect(() => {
        const pending = notifications.filter(notification => notification.status === 'pending');
        const accepted = notifications.filter(notification => notification.status === 'accepted');
        const rejected = notifications.filter(notification => notification.status === 'rejected');

        setPendingNotifications(pending);
        setAcceptedNotifications(accepted);
        setRejectedNotifications(rejected);
    }, [notifications]);

    const handleAccept = async (notification) => {
        try {
            await axios.post('http://localhost:5000/acceptBooking', {
                userEmail: notification.userEmail
            });
            console.log('Booking accepted');

            setPendingNotifications(prev => prev.filter(n => n._id !== notification._id));
            setAcceptedNotifications(prev => [...prev, { ...notification, status: 'accepted' }]);

            setClickedButtons(prevState => ({
                ...prevState,
                [notification._id]: 'accepted',
            }));
        } catch (error) {
            console.error('Error accepting booking:', error);
        }
    };

    const handleReject = async (notification) => {
        try {
            await axios.post('http://localhost:5000/rejectBooking', {
                userEmail: notification.userEmail
            });
            console.log('Booking rejected');

            setPendingNotifications(prev => prev.filter(n => n._id !== notification._id));
            setRejectedNotifications(prev => [...prev, { ...notification, status: 'rejected' }]);

            setClickedButtons(prevState => ({
                ...prevState,
                [notification._id]: 'rejected',
            }));
        } catch (error) {
            console.error('Error rejecting booking:', error);
        }
    };

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
                        <li><Link to="/">LogOut</Link></li>
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
            <div className="notifications-wrapper">
                <div className="notification-column">
                    <h2>Pending Notifications</h2>
                    <ul>
                        {pendingNotifications.length > 0 ? (
                            pendingNotifications.map((notification) => (
                                <li key={notification._id} className="notification-item">
                                    <p><strong>Hand Type:</strong> {notification.handType}</p>
                                    <p><strong>Number of Hands:</strong> {notification.numberOfHands}</p>
                                    <p><strong>Address:</strong> {notification.address}</p>
                                    <p><strong>Start Time:</strong> {new Date(notification.startTime).toLocaleString()}</p>
                                    <p><strong>End Time:</strong> {new Date(notification.endTime).toLocaleString()}</p>
                                    <p><strong>Total Price:</strong> ${notification.totalPrice}</p>
                                    <div className="notification-buttons">
                                        <button
                                            className="accept-button"
                                            onClick={() => handleAccept(notification)}
                                            disabled={clickedButtons[notification._id] === 'accepted'}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="reject-button"
                                            onClick={() => handleReject(notification)}
                                            disabled={clickedButtons[notification._id] === 'rejected'}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No pending notifications</p>
                        )}
                    </ul>
                </div>

                <div className="notification-column">
                    <h2>Accepted Notifications</h2>
                    <ul>
                        {acceptedNotifications.length > 0 ? (
                            acceptedNotifications.map((notification) => (
                                <li key={notification._id} className="notification-item">
                                    <p><strong>Hand Type:</strong> {notification.handType}</p>
                                    <p><strong>Number of Hands:</strong> {notification.numberOfHands}</p>
                                    <p><strong>Address:</strong> {notification.address}</p>
                                    <p><strong>Start Time:</strong> {new Date(notification.startTime).toLocaleString()}</p>
                                    <p><strong>End Time:</strong> {new Date(notification.endTime).toLocaleString()}</p>
                                    <p><strong>Total Price:</strong> ${notification.totalPrice}</p>
                                    <p>Status: Accepted</p>
                                </li>
                            ))
                        ) : (
                            <p>No accepted notifications</p>
                        )}
                    </ul>
                </div>

                <div className="notification-column">
                    <h2>Rejected Notifications</h2>
                    <ul>
                        {rejectedNotifications.length > 0 ? (
                            rejectedNotifications.map((notification) => (
                                <li key={notification._id} className="notification-item">
                                    <p><strong>Hand Type:</strong> {notification.handType}</p>
                                    <p><strong>Number of Hands:</strong> {notification.numberOfHands}</p>
                                    <p><strong>Address:</strong> {notification.address}</p>
                                    <p><strong>Start Time:</strong> {new Date(notification.startTime).toLocaleString()}</p>
                                    <p><strong>End Time:</strong> {new Date(notification.endTime).toLocaleString()}</p>
                                    <p><strong>Total Price:</strong> ${notification.totalPrice}</p>
                                    <p>Status: Rejected</p>
                                </li>
                            ))
                        ) : (
                            <p>No rejected notifications</p>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Notifications;