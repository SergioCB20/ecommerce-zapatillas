'use client';
import { useState } from 'react';
import Link from 'next/link';

interface DropdownProps {
  label?: string; // Texto del botón que activa el dropdown (opcional)
  icon?: React.ReactNode; // Ícono de Heroicons (opcional)
  options: { label: string; href: string }[]; // Lista de opciones con etiqueta y enlace
}

export default function Dropdown({ label, icon, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del dropdown

  return (
    <div className="relative inline-block text-left">
      {/* Botón que activa/desactiva el dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-gray-300 focus:outline-none flex items-center space-x-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className='flex-col items-center'>
        {icon && icon} {/* Renderiza el ícono si está presente */}
        {label && <span>{label}</span>} {/* Renderiza el texto si está presente */}
        </div>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-card bg-background ring-1 ring-borderColor z-10 overflow-hidden transition-transform duration-300">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <Link
                key={index}
                href={option.href}
                className="block px-4 py-2 text-sm text-text hover:bg-secondary hover:text-primary transition duration-300"
                role="menuitem"
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}