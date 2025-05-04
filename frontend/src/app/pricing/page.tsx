import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex justify-between min-h-screen flex-col">
      {/* Header reutilizado */}
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
                href="/pricing"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Precios
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Contacto
              </Link>
            </nav>
          </div>
          <Button className="hidden md:inline-flex p-0">
            <Link href={"/articles"} className="p-2 px-5">
              Comenzar
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
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
      </header>

      <main className="w-full  bg-white py-20">
        <div className="container px-4 md:px-6 text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Planes a tu medida
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Elige el plan perfecto para tu equipo. Sin contratos. Cancela en
            cualquier momento.
          </p>
        </div>

        <div className="container px-4 md:px-6 mt-12 flex flex-wrap justify-center gap-6">
          {/* Plan Gratuito */}
          <Card className="w-full max-w-sm text-center border shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Gratis</h2>
              <p className="text-4xl font-bold">$0</p>
              <p className="text-muted-foreground text-sm">
                Ideal para comenzar a explorar la plataforma.
              </p>
              <ul className="text-sm text-left space-y-1">
                <li>✓ 1 proyecto</li>
                <li>✓ Hasta 3 usuarios</li>
                <li>✓ Acceso limitado a IA</li>
              </ul>
              <Button variant="outline" className="w-full mt-4">
                Comenzar gratis
              </Button>
            </CardContent>
          </Card>

          {/* Plan Profesional */}
          <Card className="w-full max-w-sm text-center border-2 border-blue-500 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-blue-600">Profesional</h2>
              <p className="text-4xl font-bold">
                $19<span className="text-base font-normal">/mes</span>
              </p>
              <p className="text-muted-foreground text-sm">
                Para equipos pequeños que buscan productividad.
              </p>
              <ul className="text-sm text-left space-y-1">
                <li>✓ Proyectos ilimitados</li>
                <li>✓ Hasta 10 usuarios</li>
                <li>✓ Acceso completo a IA</li>
                <li>✓ Soporte prioritario</li>
              </ul>
              <Button className="w-full mt-4">Elegir Profesional</Button>
            </CardContent>
          </Card>

          {/* Plan Empresas */}
          <Card className="w-full max-w-sm text-center border shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Empresas</h2>
              <p className="text-4xl font-bold">Custom</p>
              <p className="text-muted-foreground text-sm">
                Soluciones a medida para grandes equipos.
              </p>
              <ul className="text-sm text-left space-y-1">
                <li>✓ Integraciones personalizadas</li>
                <li>✓ Usuarios ilimitados</li>
                <li>✓ Soporte dedicado</li>
                <li>✓ Entrenamiento de IA privado</li>
              </ul>
              <Button variant="outline" className="w-full mt-4">
                Contactar ventas
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
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
  );
}
