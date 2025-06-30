'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold"><Link href="/" className="hover:underline">VÉLEZ</Link></h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">Inicio</Link>
          <span className="text-gray-400 cursor-default">Login</span>
          <span className="text-gray-400 cursor-default">Contacto</span>
        </nav>
      </div>
    </header>
  );
}
