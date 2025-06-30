import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import fondo from '../../../src/assets/fondo.webp';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validaciones
    if (!name || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      // Crear cuenta en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Crear documento en Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          name,
          lastName,
          role: 'user',
        });

        await sendEmailVerification(user);

        setSuccessMessage('Registration successful. Please check your email to verify your account.');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error("Firebase error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('The email is already in use.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else {
        setError(err.message || 'Registration failed.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <Link to="/" className="text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6">Register</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Register
          </button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}

        <p className="mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
