"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import {
  Zap,
  MessageSquare,
  FileText,
  Download,
  UserPlus,
  Settings,
  Edit3,
  Save,
  MoonIcon,
  SunMediumIcon,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuthStatus();

  const handleClick = () => {
    if (loading) return; // Esperar a que cargue el estado
    if (isAuthenticated) {
      router.push("/articles");
    } else {
      router.push("/login");
    }
  };

  // Theme changer
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
      {/* Fondos visuales omitidos por brevedad (los mantenés igual) */}
      {/* bg-dark */}
      {/* <div className="absolute top-0 z-[-2] h-full w-full  rotate-180 transform  dark:bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(19,91,246)_200%)]"></div>
      <div className="absolute -z-20 bottom-0 left-0 right-0 top-0 dark:bg-[linear-gradient(to_right,#719bf55e_0px,transparent_1px),linear-gradient(to_bottom,#719bf55e_0px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div> */}

      {/* bg-light */}
      {/* <div className="absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#3970ECce,transparent)]"></div>
      </div> */}

      <div className="flex min-h-screen flex-col">
        {/* Barra de navegación */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6 md:gap-10">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl">ContenAI</span>
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link
                  href="#caracteristicas"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Características
                </Link>
                <Link
                  href="#descubre"
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
                className="hidden md:inline-flex py-4 px-6 text-white"
              >
                Comenzar
              </Button>
              <Button variant="outline" size="icon" className="md:hidden ml-4">
                <span className="sr-only">Menú</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
          {/* Sección Hero */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none dark:text-white">
                      Genera blogs en segundos con IA
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl dark:text-gray-400">
                      Crea contenido SEO-friendly, atractivo y único en un clic
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row md:mx-0 mx-auto">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 p-0"
                    >
                      <Link
                        href={"/articles"}
                        className="p-2.5 px-5 text-white"
                      >
                        Empieza gratis
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/AIwritter.png"
                    width={600}
                    height={600}
                    alt="ContenAI Ilustración"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* Características clave */}
          <Separator className="dark:bg-blue-400 " />
          <section
            id="caracteristicas"
            className="w-full py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Características clave
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Todo lo que necesitas para crear contenido de calidad
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 shadow-md">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Zap className="h-12 w-12 text-blue-500 mb-4" />
                    <h3 className="text-lg font-bold">
                      Generación instantánea
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Introduce tu tema y obtén un artículo listo para publicar
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-lg font-bold">Tonos personalizables</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formal, amigable o técnico según tu audiencia
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <FileText className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-lg font-bold">Formatos versátiles</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Guías, listas, comparativas y más
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Download className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-lg font-bold">Exportación fácil</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Descarga tu artículo en DOCX o copia al portapapeles
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Cómo funciona */}
          <Separator className="bg-blue-400" />
          <section id="descubre" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Cómo funciona
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Genera contenido de calidad en cuatro simples pasos
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <UserPlus className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold">1. Regístrate</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Crea tu cuenta en segundos
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <Settings className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold">2. Define opciones</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Elige tema y configuración
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <Edit3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold">3. Genera y edita</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Personaliza el contenido
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <Save className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold">4. Publica o guarda</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Comparte o almacena tu contenido
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Temas populares */}
          <Separator className="bg-blue-400" />
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Temas populares
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Explora las categorías más solicitadas por nuestros usuarios
                  </p>
                </div>
              </div>
              <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3 py-8">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm">
                  Tecnología
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm">
                  Marketing
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm">
                  Salud
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm">
                  Finanzas
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm">
                  Viajes
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm">
                  IA
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm">
                  Educación
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm">
                  Negocios
                </Badge>
              </div>
            </div>
          </section>

          {/* Testimonios */}
          <Separator className="bg-blue-400" />
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Lo que dicen nuestros usuarios
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Descubre por qué ContenAI está transformando la creación de
                    contenido
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-medium text-blue-600">MR</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">María Rodríguez</h3>
                        <p className="text-sm text-muted-foreground">
                          Marketing Manager
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      &ldquo;ContenAI ha reducido nuestro tiempo de creación de
                      contenido en un 70%. Ahora publicamos el doble de
                      artículos con la mitad del esfuerzo.&rdquo;
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-medium text-blue-600">JL</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Javier López</h3>
                        <p className="text-sm text-muted-foreground">
                          Blogger Profesional
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      &ldquo;La calidad del contenido es impresionante. Los
                      artículos generados requieren mínimas ediciones y el SEO
                      está perfectamente optimizado.&rdquo;
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md md:col-span-2 lg:col-span-1">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-medium text-blue-600">CS</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Carmen Sánchez</h3>
                        <p className="text-sm text-muted-foreground">
                          CEO, TechStart
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      &ldquo;Hemos integrado ContenAI en nuestro flujo de
                      trabajo y ha sido un cambio revolucionario. Recomiendo
                      esta herramienta a cualquier equipo de contenido.&rdquo;
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Únete a la comunidad */}
          <Separator className=" bg-blue-400" />
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    ¿Listo para crear tu primer blog?
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Únete a nuestra comunidad y mantente al día con las últimas
                    novedades
                  </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      suppressHydrationWarning
                      type="email"
                      placeholder="Introduce tu email"
                      className="max-w-lg flex-1 border-blue-700"
                    />
                    <Button type="submit" className="text-white">
                      Suscríbete
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground">
                    Puedes darte de baja en cualquier momento
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Pie de página */}
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
