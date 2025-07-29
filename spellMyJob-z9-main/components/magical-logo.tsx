import React from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import Image from 'next/image';

interface MagicalLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
  logoImage?: string; // Path to your custom logo image
  logoAlt?: string; // Alt text for the logo
}

export const MagicalLogo: React.FC<MagicalLogoProps> = ({ 
  size = 'md', 
  showIcon = true, 
  className = '',
  logoImage,
  logoAlt = "SpellMyJob Logo"
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const imageSizes = {
    sm: { width: 120, height: 40 },
    md: { width: 160, height: 50 },
    lg: { width: 240, height: 80 }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showIcon && (
        <div className="relative">
          {/* <Wand2 className={`${sizeClasses[size]} text-magical-blue animate-wand-sparkle`} />
          <Sparkles className="absolute -top-1 -right-1 text-xs text-gryffindor-gold animate-spell-glow" /> */}
        </div>
      )}
      
      {/* Custom Logo Image or Text Fallback */}
      {logoImage ? (
        <div className="relative">
          <Image
            src={logoImage}
            alt={logoAlt}
            width={imageSizes[size].width}
            height={imageSizes[size].height}
            className="object-contain"
            priority
          />
        </div>
      ) : (
        <h1 className={`font-magical font-bold ${sizeClasses[size]} magical-text`}>
          SpellMyJob
        </h1>
      )}
      
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gryffindor-red rounded-full animate-spell-glow" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-slytherin-green rounded-full animate-spell-glow" style={{ animationDelay: '0.5s' }}></div>
        <div className="w-2 h-2 bg-ravenclaw-blue rounded-full animate-spell-glow" style={{ animationDelay: '1s' }}></div>
        <div className="w-2 h-2 bg-hufflepuff-yellow rounded-full animate-spell-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};

export default MagicalLogo;