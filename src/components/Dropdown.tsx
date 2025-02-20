"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface DropdownProps {
  label?: string;
  icon?: React.ReactNode;
  options: { label: string; href: string }[];
}

export default function Dropdown({ label, icon, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-gray-300 focus:outline-none flex items-center space-x-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex-col justify-center items-center">
          <div className="flex w-full justify-center">{icon && icon}</div>
          {label && <span>{label}</span>}
        </div>
      </button>

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
