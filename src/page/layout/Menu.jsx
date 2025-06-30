import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';
import { FaHome, FaPlane, FaBriefcase, FaUser, FaUsers, FaAddressBook, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import logo from '/src/assets/blancologo.webp';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-900 h-16 w-full shadow-lg">
      <section className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo a la izquierda */}
        <img className="h-12 w-auto" src={logo} alt="Logo" />

        {/* Menu items centrados */}
        <section className="hidden md:flex space-x-8 text-white mx-auto">
          <Link to="/" className="hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-110">
            <FaHome className="inline mr-2" /> Home
          </Link>
          <Link to="/packages" className="hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-110">
            <FaBriefcase className="inline mr-2" /> Tickets
          </Link>
          <Link to="/tours" className="hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-110">
            <FaPlane className="inline mr-2 transform rotate-45" /> Tours
          </Link>
          <Link to="/aboutus" className="hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-110">
            <FaUsers className="inline mr-2" /> About Us
          </Link>
          <Link to="/contactus" className="hover:text-blue-200 transition duration-300 ease-in-out transform hover:scale-110">
            <FaAddressBook className="inline mr-2" /> Contact Us
          </Link>
        </section>

        {/* Usuario Dropdown */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Dropdown label={<FaUser className="w-10 h-10 rounded-full text-white border-2 border-blue-400 shadow-md hover:text-blue-800 hover:bg-blue-200 p-2" />} arrowIcon={true} inline>
              <Dropdown.Header>
                <span className="block text-black">{user.email}</span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleNavigation} className="text-black hover:bg-blue-100">Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout} className="text-black hover:bg-blue-100">Logout</Dropdown.Item>
            </Dropdown>
          ) : (
            <Dropdown label={<FaUser className="w-10 h-10 rounded-full text-white border-2 border-blue-400 shadow-md hover:text-blue-800 hover:bg-blue-200 p-2" />} arrowIcon={true} inline>
              <Dropdown.Header>
                <span className="block text-black">User</span>
              </Dropdown.Header>
              <Dropdown.Item className="text-black hover:bg-blue-100">
                <Link to="/login">Login</Link>
              </Dropdown.Item>
              <Dropdown.Item className="text-black hover:bg-blue-100">
                <Link to="/register">Register</Link>
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-t from-blue-600 to-blue-400 z-50 shadow-lg backdrop-blur-lg bg-opacity-40 border border-gray-200 rounded-lg">
          <div className="flex justify-end px-6 pt-4">
            <button onClick={toggleMenu} className="text-white">
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          <div className="px-6 py-4 space-y-4">
            <Link to="/" className="block text-black hover:bg-blue-200 py-2 px-4 rounded-md">
              <FaHome className="inline mr-2" /> Home
            </Link>
            <Link to="/packages" className="block text-black hover:bg-blue-200 py-2 px-4 rounded-md">
              <FaBriefcase className="inline mr-2" /> Tickets
            </Link>
            <Link to="/tours" className="block text-black hover:bg-blue-200 py-2 px-4 rounded-md">
              <FaPlane className="inline mr-2 transform rotate-45" /> Tours
            </Link>
            <Link to="/aboutus" className="block text-black hover:bg-blue-200 py-2 px-4 rounded-md">
              <FaUsers className="inline mr-2" /> About Us
            </Link>
            <Link to="/contactus" className="block text-black hover:bg-blue-200 py-2 px-4 rounded-md">
              <FaAddressBook className="inline mr-2" /> Contact Us
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="block text-black hover:bg-blue-200 py-2 px-4 rounded-md">
                  <FaUser className="inline mr-2" /> Profile
                </Link>
                <button onClick={handleLogout} className="block text-black hover:bg-blue-200 py-2 px-4 rounded-md">
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-black hover:bg-blue-200 py-2 px-4 rounded-md">
                  <FaUser className="inline mr-2" /> Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
