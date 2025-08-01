'use client';

import { ReactNode } from 'react';

interface NeonCardProps {
  children: ReactNode;
  className?: string;
}

export default function NeonCard({ children, className = '' }: NeonCardProps) {
  return (
    <div
      className={`rounded-2xl px-20 py-2 bg-transparent border-2 border-gryffindor-red
                  shadow-lg relative overflow-hidden text-white backdrop-blur-sm 
                  transition-all duration-300 hover:scale-105 hover:shadow-gryffindor-light ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FFAB33] to-transparent opacity-20 rounded-2xl pointer-events-none" />
      {children}
    </div>
  );
}
