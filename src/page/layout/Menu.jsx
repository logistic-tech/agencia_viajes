import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown,DropdownItem,DropdownHeader } from "flowbite-react";
import {
  FaHome, FaPlane, FaBriefcase, FaUser, FaUsers,
  FaAddressBook, FaSignOutAlt, FaBars, FaTimes
} from "react-icons/fa";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import logo from '/src/assets/blancologo.webp';
import { useTranslation } from 'react-i18next';
export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavigation = () => navigate('/profile');
  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang); 
  };

  return (
    <nav className="bg-blue-900 h-16 w-full shadow-lg">
      <section className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <img className="h-12 w-auto" src={logo} alt="Logo" />

        <section className="hidden md:flex space-x-8 text-white mx-auto">
          <Link to="/" className="hover:text-blue-200 transition duration-300 hover:scale-110">
            <FaHome className="inline mr-2" /> {t('home')}
          </Link>
          <Link to="/packages" className="hover:text-blue-200 transition duration-300 hover:scale-110">
            <FaBriefcase className="inline mr-2" /> {t('tickets')}
          </Link>
          <Link to="/tours" className="hover:text-blue-200 transition duration-300 hover:scale-110">
            <FaPlane className="inline mr-2 transform rotate-45" /> {t('tours')}
          </Link>
          <Link to="/aboutus" className="hover:text-blue-200 transition duration-300 hover:scale-110">
            <FaUsers className="inline mr-2" /> {t('aboutUs')}
          </Link>
          <Link to="/contactus" className="hover:text-blue-200 transition duration-300 hover:scale-110">
            <FaAddressBook className="inline mr-2" /> {t('contactUs')}
          </Link>
        </section>

        <div className="hidden md:flex items-center space-x-4">
          <Dropdown
            label={<span className="text-white font-medium">🌐 {language.toUpperCase()}</span>}
            inline
          >
            <DropdownItem onClick={() => handleLanguageChange('en')}>🇺🇸 English</DropdownItem>
            <DropdownItem onClick={() => handleLanguageChange('es')}>🇪🇸 Español</DropdownItem>
          </Dropdown>

          <Dropdown
            arrowIcon
            inline
            label={
              <div className="flex items-center space-x-2 cursor-pointer">
                <FaUser className="w-8 h-8 text-white border-2 border-blue-400 shadow-md p-1 rounded-full hover:text-blue-800 hover:bg-blue-200" />
                {user && (
                  <span className="text-white font-medium hidden lg:inline">
                    {user.displayName || user.email.split('@')[0]}
                  </span>
                )}
              </div>
            }
          >
            <DropdownHeader>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.displayName || 'Invitado'}
                </p>
                <p className="text-xs text-gray-500">{user?.email || 'No autenticado'}</p>
              </div>
            </DropdownHeader>

            {user ? (
              <>
                <DropdownItem onClick={handleNavigation} className="text-black hover:bg-blue-100">
                  {t('profile')}
                </DropdownItem>
                <DropdownItem onClick={handleLogout} className="text-black hover:bg-blue-100">
                  {t('logout')}
                </DropdownItem>
              </>
            ) : (
              <>
                <DropdownItem className="text-black hover:bg-blue-100">
                  <Link to="/login" className="block w-full">{t('login')}</Link>
                </DropdownItem>
                <DropdownItem className="text-black hover:bg-blue-100">
                  <Link to="/register" className="block w-full font-semibold text-blue-700">Crear cuenta</Link>
                </DropdownItem>
              </>
            )}
          </Dropdown>
        </div>

        <div className="md:hidden">
          <button aria-label='menu-movil' onClick={toggleMenu} className="text-white">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </section>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-t from-blue-600 to-blue-400 z-50 backdrop-blur-lg border-t border-white pt-4 px-6">
          <div className="flex justify-end">
            <button onClick={toggleMenu} className="text-white">
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          <div className="py-4 space-y-4 text-black">
            <Link to="/" className="block hover:bg-blue-200 py-2 px-4 rounded-md"><FaHome className="inline mr-2" /> {t('home')}</Link>
            <Link to="/packages" className="block hover:bg-blue-200 py-2 px-4 rounded-md"><FaBriefcase className="inline mr-2" /> {t('tickets')}</Link>
            <Link to="/tours" className="block hover:bg-blue-200 py-2 px-4 rounded-md"><FaPlane className="inline mr-2 transform rotate-45" /> {t('tours')}</Link>
            <Link to="/aboutus" className="block hover:bg-blue-200 py-2 px-4 rounded-md"><FaUsers className="inline mr-2" /> {t('aboutUs')}</Link>
            <Link to="/contactus" className="block hover:bg-blue-200 py-2 px-4 rounded-md"><FaAddressBook className="inline mr-2" /> {t('contactUs')}</Link>

            {user ? (
              <>
                <Link to="/profile" className="block hover:bg-blue-200 py-2 px-4 rounded-md"><FaUser className="inline mr-2" /> {t('profile')}</Link>
                <button onClick={handleLogout} className="block w-full text-left hover:bg-blue-200 py-2 px-4 rounded-md">
                  <FaSignOutAlt className="inline mr-2" /> {t('logout')}
                </button>
              </>
            ) : (
              <Link to="/login" className="block hover:bg-blue-200 py-2 px-4 rounded-md"><FaUser className="inline mr-2" /> {t('login')}</Link>
            )}

            {/* Language Selector Mobile */}
            <div className="pt-4 border-t border-white">
              <p className="text-white font-semibold mb-2">{t('language')}</p>
              <button onClick={() => handleLanguageChange('en')} className="block hover:bg-blue-200 py-2 px-4 rounded-md">🇺🇸 English</button>
              <button onClick={() => handleLanguageChange('es')} className="block hover:bg-blue-200 py-2 px-4 rounded-md">🇪🇸 Español</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
