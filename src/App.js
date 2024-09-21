import './App.css';
import { Routes, Route } from "react-router-dom"
import UserReg from './components/userRegistration/UserReg';
import ProfReg from './components/ProfRegistration/ProfReg';
import Login from './components/loginPage/login';
import Home from './components/Home/Home';
import Mbook from './components/Mbook/Mbook';
import Services from './components/Services/Services';
import Shorts from './components/Shorts/shorts';
import AHome from './components/AHome/AHome';
import Notifications from './components/notifications/notifications';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';
import { Myworks } from './components/myworks/myworks';
import AServices from './components/AServices/AServices';
import AShorts from './components/AShorts/AShorts';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/UserReg' element={<UserReg />} />
        <Route exact path='/ProfReg' element={<ProfReg />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="Aservices" element={<AServices />} />
        <Route path="/booked-services" element={<Mbook />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/Ashorts" element={<AShorts />} />

        <Route path="/AHome" element={<AHome />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/service/:name" element={<ServiceDetails />} /> {/* Name-based routing */}
        <Route path="/myworks" element={<Myworks />} />

      </Routes>
    </>
  );
}

export default App;
