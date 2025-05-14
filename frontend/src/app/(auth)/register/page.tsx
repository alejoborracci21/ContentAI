"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUserInBackend } from "@/lib/api/users";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Si el usuario ya está logueado, redirigir
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/articles");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user) throw new Error("No se pudo registrar el usuario");
      const token = await user.getIdToken();

      // Enviar los datos al backend
      await createUserInBackend(token, { nombre: name });
      toast({
        title: "Registro exitoso",
        description: "Ahora puedes iniciar sesión",
        variant: "blue",
      });
    } catch (error) {
      toast({
        title: "Error al registrarse",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute top-0 -z-10 h-full w-full ">
        <div className="absolute left-1/2  h-[500px] w-[500px] -translate-x-[50%] translate-y-[50%] rounded-full bg-[rgba(90,128,252,0.47)] opacity-60 blur-[180px]"></div>
      </div>
      <Toaster />
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Crear cuenta</CardTitle>
            <CardDescription>
              Completa los campos para registrarte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="grid gap-6">
              <div className="grid gap-2">
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
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre completo</Label>
                {name.length > 0 && name.length < 10 && (
                  <p className="text-xs text-red-500">
                    El nombre debe tener al menos 10 caracteres.
                  </p>
                )}
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={10}
                />
              </div>
              <div className="grid gap-2">
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
              </Button>
            </form>

            <div className="mt-4 text-sm text-center">
              ¿Ya tenés cuenta?{" "}
              <button
                type="button"
                className="text-blue-600 underline hover:text-blue-800"
                onClick={() => router.push("/login")}
              >
                Iniciar sesión
              </button>
            </div>

            <div className="mt-2">
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => router.push("/")}
              >
                Volver al inicio
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </main>
  );
}
