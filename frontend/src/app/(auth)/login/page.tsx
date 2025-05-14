"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { getUserInBackend } from "@/lib/api/users";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const token = await user.getIdToken();
      console.log("Token:", token);
      const res = await getUserInBackend(token);

      if (res.status === 401 || res.error === "Unauthorized") {
        await firebaseSignOut(auth);
        toast({
          title: "Sesión inválida",
          description: "Por favor inicia sesión nuevamente.",
          variant: "destructive",
        });
        router.replace("/login");
        return;
      }

      // 5. Inicio exitoso
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo a artículos...",
        variant: "blue",
      });
      router.push("/articles");
    } catch (err) {
      console.error("Error en login o validación:", err);
      toast({
        title: "Error al iniciar sesión",
        description: err instanceof Error ? err.message : String(err),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute top-0 -z-10 h-full w-full">
        <div className="absolute left-1/2 h-[500px] w-[500px] -translate-x-[50%] translate-y-[50%] rounded-full bg-[rgba(90,128,252,0.47)] opacity-60 blur-[180px]"></div>
      </div>
      <Toaster />
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
            <CardDescription>Inicia sesión con tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-6">
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
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </Button>
            </form>
            <div className="text-center text-sm mt-4">
              ¿No tenés cuenta?{' '}
              <button
                onClick={() => router.push("/register")}
                className="underline text-blue-600 hover:text-blue-800"
              >
                Registrate
              </button>
            </div>
            <div className="mt-2 text-center">
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
        <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our{' '}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </main>
  );
}