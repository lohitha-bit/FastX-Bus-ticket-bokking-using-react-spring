import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './components/common/HomePage';
import ProtectedRoute from './components/common/ProtectedRoute';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import UserDashboard from './components/user/UserDashboard';
import SeatBooking from './components/user/SeatBooking';
import Payment from './components/user/Payment';
import BookingHistory from './components/user/BookingHistory';
import PassengerInfo from './components/user/PassengerInfo';
import Ticket from './components/user/Ticket';


import ManageBus from './components/busOperator/ManageBus';
import ManageRoute from './components/busOperator/ManageRoute';

import ManageUsers from './components/admin/ManageUsers';
import ManageBuses from './components/admin/ManageBuses';
import ManageRoutes from './components/admin/ManageRoutes';
import AdminDashboard from './components/admin/AdminDashboard';

import './App.css';
import BusSearch from './components/user/BusSearch';
import ViewBooking from './components/busOperator/ViewBooking';
import Booking from './components/user/Booking';
import ForgotPassword from './components/auth/ForgotPassword';
import Profile from './components/user/Profile';
import ManageAmenities from './components/admin/ManageAmenities';
import ManageBookings from './components/admin/ManageBookings';
import BusOperatorDashboard from './components/busOperator/BusOperatorDashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container fluid style={{ marginTop: '7em', minHeight: '80vh' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* User Routes */}
          <Route path="/user/dashboard" element={<ProtectedRoute role="USER"><UserDashboard /></ProtectedRoute>} />
          <Route path="/user/book" element={<ProtectedRoute role="USER"><SeatBooking /></ProtectedRoute>} />
          <Route path="/user/payment" element={<ProtectedRoute role="USER"><Payment /></ProtectedRoute>} />
          <Route path="/user/history" element={<ProtectedRoute role="USER"><BookingHistory /></ProtectedRoute>} />
          <Route path="/user/search" element={<ProtectedRoute role="USER"><BusSearch /></ProtectedRoute>} />
          <Route path="/user/booking" element={<ProtectedRoute role="USER"><Booking/></ProtectedRoute>} />
          <Route path="/user/passenger-info" element={<ProtectedRoute role="USER"><PassengerInfo /></ProtectedRoute>} />
          <Route path="/user/ticket" element={<ProtectedRoute role="USER"><Ticket /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute role="USER"><Profile /></ProtectedRoute>} />


          {/* Bus Operator Routes */}
          <Route path="/operator/dashboard" element={<ProtectedRoute role="BUS_OPERATOR"><BusOperatorDashboard/></ProtectedRoute>} />
          <Route path="/operator/manage-bus" element={<ProtectedRoute role="BUS_OPERATOR"><ManageBus /></ProtectedRoute>} />
          <Route path="/operator/manage-route" element={<ProtectedRoute role="BUS_OPERATOR"><ManageRoute /></ProtectedRoute>} />
          <Route path="/operator/bookings" element={<ProtectedRoute role="BUS_OPERATOR"><ViewBooking /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard/></ProtectedRoute>} />
          <Route path="/admin/manage-users" element={<ProtectedRoute role="ADMIN"><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/manage-buses" element={<ProtectedRoute role="ADMIN"><ManageBuses /></ProtectedRoute>} />
          <Route path="/admin/manage-routes" element={<ProtectedRoute role="ADMIN"><ManageRoutes /></ProtectedRoute>} />
          <Route path="/admin/manage-amenities" element={<ProtectedRoute role="ADMIN"><ManageAmenities /></ProtectedRoute>} />
          <Route path="/admin/manage-bookings" element={<ProtectedRoute role="ADMIN"><ManageBookings/></ProtectedRoute>} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
        