'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Usuario registrado correctamente');
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Registrar</button>
    </form>
  );
}
