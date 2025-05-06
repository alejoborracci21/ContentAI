"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { MoonIcon, SunMediumIcon } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ContactPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Detecta si el usuario está logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/articles");
    } else {
      router.push("/login");
    }
  };

  // Tema
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const handleToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };
  return (
    <div className="relative">
      {/* bg-dark */}
      {/* <div className="absolute top-0 z-[-2] h-full w-full  rotate-180 transform  dark:bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(19,91,246)_200%)]"></div>
      <div className="absolute -z-20 bottom-0 left-0 right-0 top-0 dark:bg-[linear-gradient(to_right,#719bf55e_0px,transparent_1px),linear-gradient(to_bottom,#719bf55e_0px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div> */}

      {/* bg-light */}
      {/* <div className="absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#3970ECce,transparent)] dark:hidden"></div>
      </div> */}

      <div className="flex min-h-screen flex-col">
        {/* Header reutilizado */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6 md:gap-10">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl">ContenAI</span>
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link
                  href="/#caracteristicas"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Características
                </Link>
                <Link
                  href="/#descubre"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Descubre
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Contacto
                </Link>
              </nav>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="theme-mode"
                  checked={isDarkMode}
                  onCheckedChange={handleToggle}
                  thumbClassName="h-7 w-7 data-[state=checked]:translate-x-6"
                  className="h-8 w-14"
                  icon={
                    isDarkMode ? (
                      <MoonIcon className="h-4 w-4" />
                    ) : (
                      <SunMediumIcon className="h-4 w-4" />
                    )
                  }
                />
              </div>
              <Button
                onClick={handleClick}
                className="hidden md:inline-flex py-4 px-6"
              >
                Comenzar
              </Button>
              <Button variant="outline" size="icon" className="md:hidden ml-4">
                <span className="sr-only">Menú</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero / Introducción */}
          <section className="w-full py-20 ">
            <div className="container px-4 md:px-6 space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Un equipo proactivo, enfocado en la innovación
              </h1>
              <p className="text-muted-foreground max-w-3xl mx-auto md:text-xl">
                Somos un grupo de desarrolladores comprometidos con crear
                soluciones eficientes y creativas. Combinamos nuestras
                habilidades en frontend, backend y gestión de proyectos para
                ofrecer lo mejor.
              </p>
            </div>
          </section>

          {/* Sección del equipo */}
          <section className="w-full py-16 ">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold text-center mb-12">
                Nuestro equipo
              </h2>
              <div className="flex justify-center gap-8 mb-12 flex-wrap">
                {/* Alejo Borracci */}
                <Card className="shadow-md text-center max-w-[370px] min-w-[368px]">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        width={96}
                        height={96}
                        alt="Alejo Borracci"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Alejo Borracci</h3>
                    <p className="text-sm text-muted-foreground">
                      Full Stack Developer
                    </p>
                    <p className="text-sm mt-2">
                      Encargado de integrar funcionalidades clave en frontend y
                      backend, liderando la arquitectura técnica del proyecto.
                    </p>
                  </CardContent>
                </Card>

                {/* Julio Condor */}
                <Card className="shadow-md text-center max-w-[370px] min-w-[368px]">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        width={96}
                        height={96}
                        alt="Julio Condor"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Julio Condor</h3>
                    <p className="text-sm text-muted-foreground">
                      Front-End Developer
                    </p>
                    <p className="text-sm mt-2">
                      Responsable del diseño y desarrollo de la interfaz de
                      usuario, enfocándose en usabilidad, accesibilidad y
                      experiencia visual.
                    </p>
                  </CardContent>
                </Card>

                {/* José Alvarez */}
                <Card className="shadow-md text-center max-w-[370px] min-w-[368px]">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        width={96}
                        height={96}
                        alt="José Alvarez"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">José Alvarez</h3>
                    <p className="text-sm text-muted-foreground">
                      Back-End Developer
                    </p>
                    <p className="text-sm mt-2">
                      Encargado de la lógica del servidor, APIs y manejo de base
                      de datos. Asegura la estabilidad y eficiencia del backend.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-center gap-8 flex-wrap">
                {/* Alexander Tasinchano */}
                <Card className="shadow-md text-center max-w-[370px] min-w-[368px]">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        width={96}
                        height={96}
                        alt="Alexander Tasinchano"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">
                      Alexander Tasinchano
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Back-End Developer
                    </p>
                    <p className="text-sm mt-2">
                      Desarrolla funciones clave del backend y colabora en la
                      integración de servicios externos y la seguridad del
                      sistema.
                    </p>
                  </CardContent>
                </Card>

                {/* Mario Passalia */}
                <Card className="shadow-md text-center max-w-[370px] min-w-[368px]">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        width={96}
                        height={96}
                        alt="Mario Passalia"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Mario Passalia</h3>
                    <p className="text-sm text-muted-foreground">QA Tester</p>
                    <p className="text-sm mt-2">
                      Garantiza la calidad del software mediante pruebas
                      funcionales y asegura que cada componente cumpla con los
                      requisitos.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full border-t py-6 md:py-0 bg-background">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 ContenAI. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Términos
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Privacidad
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Ayuda
              </Link>
            </div>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
