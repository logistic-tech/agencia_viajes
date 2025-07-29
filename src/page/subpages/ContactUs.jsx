import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Layout from '../layout/Layout';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
  const { t } = useTranslation('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send('service_f6my0vj', 'template_gu3qbt1', formData, 'jWB4cGsy7UULiIThh')
      .then(() => {
        setModalMessage(t('successMessage'));
        setModalVisible(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setModalMessage(t('errorMessage'));
        setModalVisible(true);
      });
  };

  return (
    <section>
      <section className="container mx-auto px-6 py-12">
        <section className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-8 rounded-3xl shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">{t('title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white text-black p-8 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">{t('formTitle')}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-lg font-medium mb-2">{t('fullName')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-lg border-2 border-gray-300"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-lg font-medium mb-2">{t('email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-lg border-2 border-gray-300"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-lg font-medium mb-2">{t('message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-lg border-2 border-gray-300"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  {t('sendMessage')}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white text-black p-8 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">{t('infoTitle')}</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-4 text-3xl text-blue-500" />
                  <div>
                    <h4 className="font-medium text-lg">{t('phoneTitle')}</h4>
                    <p><a href="tel:+507373-4907" className="text-blue-600">+507 373-4907</a></p>
                    <p><a href="tel:+507373-4908" className="text-blue-600">+507 373-4908</a></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaWhatsapp className="mr-4 text-3xl text-green-500" />
                  <div>
                    <h4 className="font-medium text-lg">{t('whatsappTitle')}</h4>
                    <p><a href="https://wa.me/50767816847" className="text-blue-600">+507 6781-6847</a></p>
                    <p><a href="https://wa.me/50763798319" className="text-blue-600">+507 6379-8319</a></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-4 text-3xl text-red-500" />
                  <div>
                    <h4 className="font-medium text-lg">{t('emailTitle')}</h4>
                    <p><a href="mailto:gerentecalidad@mp-ip.edu.pa" className="text-blue-600">gerentecalidad@mp-ip.edu.pa</a></p>
                    <p><a href="mailto:maritimecenter@mp-ip.edu.pa" className="text-blue-600">maritimecenter@mp-ip.edu.pa</a></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-4 text-3xl text-orange-500" />
                  <div>
                    <h4 className="font-medium text-lg">{t('addressTitle')}</h4>
                    <p>{t('address1')}</p>
                    <p>{t('address2')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black p-8 rounded-lg shadow-2xl max-w-sm mx-auto">
              <p className="text-center">{modalMessage}</p>
              <button onClick={() => setModalVisible(false)} className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition">
                {t('close')}
              </button>
            </div>
          </div>
        )}

        {/* Social Media */}
        <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-8 rounded-3xl shadow-xl mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">{t('followUs')}</h2>
          <div className="flex justify-center gap-10">
            <a href="https://www.instagram.com/mpip_panama/" className="hover:text-blue-500 transition"><FaInstagram size={40} /></a>
            <a href="https://www.facebook.com/mpippanama" className="hover:text-blue-500 transition"><FaFacebook size={40} /></a>
            <a href="https://www.linkedin.com/company/maritime-professional-institute-of-panama/" className="hover:text-blue-500 transition"><FaLinkedin size={40} /></a>
            <a href="https://www.youtube.com/@mpip-panama" className="hover:text-blue-500 transition"><FaYoutube size={40} /></a>
            <a href="https://mp-ip.edu.pa/" className="hover:text-blue-500 transition"><TbWorldWww size={40} /></a>
          </div>
        </section>
      </section>
    </section>
  );
}
