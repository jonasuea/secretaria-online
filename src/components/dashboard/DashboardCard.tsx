
import React from 'react';
import { cn } from '../../lib/utils';
import BlurOverlay from '../ui/BlurOverlay';

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  children, 
  className,
  animate = true,
  delay = 0
}) => {
  return (
    <BlurOverlay
      className={cn(
        'p-5 transition-all hover:shadow-elevated hover:-translate-y-1 duration-300',
        animate && 'opacity-0 animate-scale-in',
        className
      )}
      style={{ 
        animationDelay: animate ? `${delay}ms` : '0ms',
        animationFillMode: 'forwards' 
      }}
    >
      {children}
    </BlurOverlay>
  );
};

export default DashboardCard;
