
import React from 'react';
import { LucideIcon } from 'lucide-react';
import DashboardCard from './DashboardCard';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description,
  icon: Icon,
  trend,
  delay = 0
}) => {
  return (
    <DashboardCard delay={delay}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-900">{value}</h3>
          
          {trend && (
            <div className="mt-1 flex items-center gap-1">
              <span className={`text-xs ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              {description && (
                <span className="text-xs text-slate-500">{description}</span>
              )}
            </div>
          )}
          
          {!trend && description && (
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          )}
        </div>
        
        {Icon && (
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon size={20} className="text-primary" />
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default StatCard;
