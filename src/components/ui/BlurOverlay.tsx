
import React from 'react';
import { cn } from '../../lib/utils';

interface BlurOverlayProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  style?: React.CSSProperties;
}

const BlurOverlay: React.FC<BlurOverlayProps> = ({ 
  children, 
  className,
  intensity = 'medium',
  style
}) => {
  const blurIntensity = {
    light: 'backdrop-blur-sm bg-white/70',
    medium: 'backdrop-blur-md bg-white/80',
    heavy: 'backdrop-blur-lg bg-white/90'
  };
  
  return (
    <div 
      className={cn(
        'rounded-xl border border-slate-200/50 shadow-card',
        blurIntensity[intensity],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default BlurOverlay;
