'use client';

export default function Footer() {
  return (
    <footer className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm">
        © {new Date().getFullYear()} Tiendas Vélez. Todos los derechos reservados.
      </div>
    </footer>
  );
}
