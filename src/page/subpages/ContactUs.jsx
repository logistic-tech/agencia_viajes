import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Layout from '../layout/Layout';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send('service_f6my0vj', 'template_gu3qbt1', formData, 'jWB4cGsy7UULiIThh')
      .then((response) => {
        setModalMessage('Message sent successfully!');
        setModalVisible(true);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        setModalMessage('Failed to send message. Please try again.');
        setModalVisible(true);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Layout>
      <section className="container mx-auto px-6 py-12">
        {/* Contact Form Section */}
        <section className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-8 rounded-3xl shadow-xl mb-12 transform hover:scale-102 transition-transform duration-300 ease-out">
          <h2 className="text-3xl font-bold text-center text-white mb-8">We'd Love to Hear From You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white text-black p-8 rounded-xl shadow-2xl transform hover:scale-102 transition-transform duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">Contact Form</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105">
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info Section */}
            <div className="bg-white text-black p-8 rounded-xl shadow-2xl transform hover:scale-102 transition-transform duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-4 text-3xl text-blue-500" />
                  <div>
                    <h4 className="font-medium text-lg">Phone Numbers</h4>
                    <p><a href="tel:+507373-4907" className="text-blue-600">+507 373-4907</a></p>
                    <p><a href="tel:+507373-4908" className="text-blue-600">+507 373-4908</a></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaWhatsapp className="mr-4 text-3xl text-green-500" />
                  <div>
                    <h4 className="font-medium text-lg">WhatsApp</h4>
                    <p><a href="https://wa.me/50767816847" className="text-blue-600">+507 6781-6847</a></p>
                    <p><a href="https://wa.me/50763798319" className="text-blue-600">+507 6379-8319</a></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-4 text-3xl text-red-500" />
                  <div>
                    <h4 className="font-medium text-lg">Email</h4>
                    <p><a href="mailto:gerentecalidad@mp-ip.edu.pa" className="text-blue-600">gerentecalidad@mp-ip.edu.pa</a></p>
                    <p><a href="mailto:maritimecenter@mp-ip.edu.pa" className="text-blue-600">maritimecenter@mp-ip.edu.pa</a></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-4 text-3xl text-orange-500" />
                  <div>
                    <h4 className="font-medium text-lg">Address</h4>
                    <p>Perejil Urb., 3rd Street, PH Barcelona building, Panama City</p>
                    <p>El Carmen, Calle A Sur, David, Chiriquí</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Confirmation */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black p-8 rounded-lg shadow-2xl max-w-sm mx-auto transform transition-all duration-500 ease-out">
              <p className="text-center">{modalMessage}</p>
              <button onClick={closeModal} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105 mt-4">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Social Media & Website Section */}
        <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-8 rounded-3xl shadow-xl mt-12 transform hover:scale-102 transition-transform duration-300 ease-out">
          <h2 className="text-3xl font-bold text-center mb-8">Follow Us On</h2>
          <div className="flex justify-center gap-10">
            <a href="https://www.instagram.com/mpip_panama/" className="text-white hover:text-blue-500 transition-colors duration-300 ease-in-out transform hover:scale-110">
              <FaInstagram size={40} />
            </a>
            <a href="https://www.facebook.com/mpippanama" className="text-white hover:text-blue-500 transition-colors duration-300 ease-in-out transform hover:scale-110">
              <FaFacebook size={40} />
            </a>
            <a href="https://www.linkedin.com/company/maritime-professional-institute-of-panama/" className="text-white hover:text-blue-500 transition-colors duration-300 ease-in-out transform hover:scale-110">
              <FaLinkedin size={40} />
            </a>
            <a href="https://www.youtube.com/@mpip-panama" className="text-white hover:text-blue-500 transition-colors duration-300 ease-in-out transform hover:scale-110">
              <FaYoutube size={40} />
            </a>
            <a href="https://mp-ip.edu.pa/" className="text-white hover:text-blue-500 transition-colors duration-300 ease-in-out transform hover:scale-110">
              <TbWorldWww size={40} />
            </a>
          </div>
        </section>
      </section>
    </Layout>
  );
}
