import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  // Estados y refs para dropdowns personalizados
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const langRef = useRef(null);
  const userRef = useRef(null);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavigation = () => {
    setUserOpen(false);
    navigate('/profile');
  };
  const handleLogout = () => {
    setUserOpen(false);
    auth.signOut();
    navigate('/login');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  return (
    <nav className="bg-blue-900 h-16 w-full shadow-lg text">
      <section className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
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

        {/* Dropdown idioma */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-white font-medium cursor-pointer select-none"
              aria-haspopup="true"
              aria-expanded={langOpen}
              type="button"
            >
              🌐 {language.toUpperCase()}
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  type="button"
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => handleLanguageChange('es')}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  type="button"
                >
                  🇪🇸 Español
                </button>
              </div>
            )}
          </div>

          {/* Dropdown usuario */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center space-x-2 cursor-pointer select-none"
              aria-haspopup="true"
              aria-expanded={userOpen}
              type="button"
            >
              <FaUser className="w-8 h-8 text-white border-2 border-blue-400 shadow-md p-1 rounded-full hover:text-blue-800 hover:bg-blue-200" />
              {user && (
                <span className="text-white font-medium hidden lg:inline">
                  {user.displayName || user.email.split('@')[0]}
                </span>
              )}
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
                {/* Header */}
                <div className="text-center p-4 border-b">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.displayName || 'Invitado'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || 'No autenticado'}
                  </p>
                </div>

                {/* Opciones según usuario */}
                {user ? (
                  <>
                    <button
                      onClick={handleNavigation}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-blue-100"
                      type="button"
                    >
                      {t('profile')}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-blue-100"
                      type="button"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-black hover:bg-blue-100"
                      onClick={() => setUserOpen(false)}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 font-semibold text-blue-700 hover:bg-blue-100"
                      onClick={() => setUserOpen(false)}
                    >
                      Crear cuenta
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Botón menú móvil */}
        <div className="md:hidden">
          <button aria-label='menu-movil' onClick={toggleMenu} className="text-white">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Menú móvil */}
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

            {/* Selector idioma móvil */}
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
