'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registro exitoso');
      router.push('/');
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
          </form>
          <div className="mt-4 text-sm text-center">
            ¿Ya tenés cuenta?{' '}
            <button
              type="button"
              className="text-blue-600 underline hover:text-blue-800"
              onClick={() => router.push('/login')}
            >
              Iniciar sesión
            </button>
          </div>
          <div className="mt-2 text-sm text-center">
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => router.push('/')}
            >
            Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
