import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Calendar, Settings, ChevronLeft, GraduationCap, Briefcase, Clock } from 'lucide-react';
import { useSidebar } from '../../hooks/use-sidebar';
import { useIsMobile } from '../../hooks/use-mobile';

const menuItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    path: '/students',
    label: 'Alunos',
    icon: Users,
  },
  {
    path: '/teachers',
    label: 'Professores',
    icon: GraduationCap,
  },
  {
    path: '/management-team',
    label: 'Equipe Gestora',
    icon: Briefcase,
  },
  {
    path: '/classes',
    label: 'Turmas',
    icon: BookOpen,
  },
  {
    path: '/schedules',
    label: 'Horários',
    icon: Clock,
  },
  {
    path: '/calendar',
    label: 'Calendário',
    icon: Calendar,
  },
  {
    path: '/settings',
    label: 'Configurações',
    icon: Settings,
  },
];

const Sidebar = () => {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      closeSidebar();
    }
  }, [location.pathname, isMobile, closeSidebar]);

  return (
    <>
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
          onClick={closeSidebar}
        />
      )}
      
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-30
          w-64 h-screen pt-16 pb-4
          bg-white border-r border-slate-200/70
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}
        `}
        onMouseEnter={() => !isMobile && toggleSidebar()}
        onMouseLeave={() => !isMobile && isOpen && toggleSidebar()}
      >
        <div className="px-3 py-4 flex justify-between items-center md:hidden">
          <h2 className="text-lg font-semibold text-slate-900">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-100 button-effect"
          >
            <ChevronLeft size={20} className="text-slate-700" />
          </button>
        </div>
        
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-colors duration-200 button-effect
                    ${isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <item.icon size={20} className={`flex-shrink-0 ${isOpen ? '' : 'mx-auto'}`} />
                  {isOpen ? (
                    <span className="transition-all duration-200">
                      {item.label}
                    </span>
                  ) : (
                    <span className="hidden md:hidden">
                      {item.label}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={`px-3 pt-2 mt-auto border-t border-slate-200/70 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
          <div className="flex items-center px-3 py-3">
            <div className="flex-shrink-0 w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-medium">AD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">admin@escola.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
