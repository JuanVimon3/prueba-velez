'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm">
        © {new Date().getFullYear()} Tiendas Vélez. Todos los derechos reservados.
      </div>
    </footer>
  );
}
