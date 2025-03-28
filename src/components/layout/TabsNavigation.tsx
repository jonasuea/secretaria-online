
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Settings,
  Briefcase
} from 'lucide-react';

const routes = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/students', label: 'Alunos', icon: Users },
  { path: '/teachers', label: 'Professores', icon: GraduationCap },
  { path: '/management-team', label: 'Equipe Gestora', icon: Briefcase },
  { path: '/classes', label: 'Turmas', icon: BookOpen },
  { path: '/calendar', label: 'Calendário', icon: Calendar },
  { path: '/settings', label: 'Configurações', icon: Settings },
];

const TabsNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname === '/' ? '/' : `/${location.pathname.split('/')[1]}`;

  const handleTabChange = (value: string) => {
    navigate(value);
  };

  return (
    <div className="w-full flex justify-center py-4 px-4 border-b">
      <Tabs 
        defaultValue={currentPath} 
        value={currentPath} 
        onValueChange={handleTabChange}
        className="w-full max-w-3xl"
      >
        <TabsList className="w-full h-12 bg-background border">
          {routes.map((route) => (
            <TabsTrigger 
              key={route.path} 
              value={route.path}
              className="flex items-center gap-2 flex-1 h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <route.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{route.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabsNavigation;
