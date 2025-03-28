import React from 'react';
import { useSidebar } from '../../hooks/use-sidebar';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  title,
  subtitle,
  action
}) => {
  const { isOpen } = useSidebar();
  
  return (
    <div 
      className={`
        pt-8 px-4 pb-8 min-h-screen 
        transition-all duration-300 ease-in-out
        md:pl-${isOpen ? '64' : '20'}
        page-container
      `}
      style={{ 
        paddingLeft: isOpen ? 'calc(16rem + 1rem)' : 'calc(5rem + 1rem)' 
      }}
    >
      {(title || subtitle || action) && (
        <div className="mb-8 content-appear">
          <div className="flex justify-between items-center">
            <div>
              {title && <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>}
              {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        </div>
      )}
      
      <div className="content-appear animation-delay-150">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
