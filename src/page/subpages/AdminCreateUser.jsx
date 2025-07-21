import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminCreateUser({ isOpen, onClose }) {
  if (!isOpen) return null; // 🔁 Esto controla si el modal aparece o no

  const [newUser, setNewUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');

    const { name, lastName, email, password } = newUser;

    if (!name || !lastName || !email || !password || !adminEmail || !adminPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = userCredential.user;

      await setDoc(doc(db, 'users', createdUser.uid), {
        name,
        lastName,
        email,
        role: 'user',
      });

      setStatus(`✅ User ${email} created.`);
      await signOut(auth);
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      setStatus((prev) => prev + '\n🔐 Admin logged back in.');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Admin - Create User</h2>

        <form onSubmit={handleCreateUser} className="space-y-4">
          <input name="name" placeholder="First Name" value={newUser.name} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
          <input name="lastName" placeholder="Last Name" value={newUser.lastName} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
          <input name="email" placeholder="New User Email" type="email" value={newUser.email} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
          <input name="password" placeholder="New User Password" type="password" value={newUser.password} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />

          <hr className="my-4" />

          <h3 className="font-semibold">Admin Re-authentication</h3>
          <input placeholder="Admin Email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full border px-3 py-2 rounded" />
          <input placeholder="Admin Password" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full border px-3 py-2 rounded" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create User</button>
        </form>

        {status && <p className="mt-4 text-green-600 whitespace-pre-line">{status}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
    