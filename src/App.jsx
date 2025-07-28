import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import AboutUs from './page/subpages/AboutUs';
import Packages from './page/subpages/Packages';
import ContactUs from './page/subpages/ContactUs';
import Tours from './page/subpages/Tours';
import TourDetails from './page/subpages/ToursDetails';
import BuyTours from './page/subpages/BuyTours';
import NationalPackages from './page/subpages/NationalPackages';
import InternationalPackages from './page/subpages/InternationalPackages';
import Login from './page/login/Login';
import Register from './page/login/Register';
import ResetPassword from './page/login/ResetPassword';
import Profile from './page/subpages/Profile';
import ProtectedRoutes from './page/authentication/ProtectedRoutes';
import NationalDetails from './page/subpages/NationalDetails';
import BuyNational from './page/subpages/BuyNational';
import InternationalDetails from './page/subpages/InternationalDetails';
import BuyInternational from './page/subpages/BuyInternational';
import PaymentOption from './page/subpages/PaymentOption';
import InvoiceView from './page/subpages/InvoiceView';
import ProfileAdmin from './page/subpages/ProfileAdmin';
import Layout from './page/layout/Layout';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/nationalpackages" element={<NationalPackages />} />
        <Route path="/national/:id" element={<NationalDetails />} />
        <Route path="/internationalpackages" element={<InternationalPackages />} />
        <Route path="/international/:id" element={<InternationalDetails />} />
        <Route path="/payment-option/:purchaseId" element={<PaymentOption />} />
        <Route path="/invoice/:purchaseId" element={<InvoiceView />} />
        <Route path="/admin" element={<ProfileAdmin />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/buyinternational/:id" element={<BuyInternational />} />
          <Route path="/buynational/:id" element={<BuyNational />} />
          <Route path="/buytours/:id" element={<BuyTours />} />
        </Route>
      </Route>
    </Routes>
  );
}
