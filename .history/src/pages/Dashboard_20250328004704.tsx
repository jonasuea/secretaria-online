
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Calendar, Award, Bell, BarChart3 } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import StatCard from '../components/dashboard/StatCard';
import DashboardCard from '../components/dashboard/DashboardCard';
import BlurOverlay from '../components/ui/BlurOverlay';
import SearchResultDialog, { SearchResult } from '../components/dashboard/SearchResultDialog';

// Mock data for the upcoming events
const UPCOMING_EVENTS = [
  { id: 1, title: 'Reunião de pais e mestres', date: '30 Jun, 2023', type: 'meeting' },
  { id: 2, title: 'Fechamento de notas bimestrais', date: '05 Jul, 2023', type: 'deadline' },
  { id: 3, title: 'Festa junina escolar', date: '15 Jul, 2023', type: 'event' },
  { id: 4, title: 'Início das férias escolares', date: '28 Jul, 2023', type: 'holiday' },
];

// Mock data for recent activities
const RECENT_ACTIVITIES = [
  { id: 1, title: 'Ana Silva registrou presença para a turma 9B', time: '2 horas atrás' },
  { id: 2, title: 'João registrou notas para Matemática do 7A', time: '3 horas atrás' },
  { id: 3, title: 'Pedro adicionou um novo evento no calendário', time: '5 horas atrás' },
  { id: 4, title: 'Juliana editou informações do aluno Carlos Mendes', time: '6 horas atrás' },
];

// Mock data for search
const MOCK_SEARCH_DATA: SearchResult[] = [
  { id: 1, name: 'Ana Silva', role: 'student', details: 'Matricula: 20230001 - 9º Ano B' },
  { id: 2, name: 'João Santos', role: 'student', details: 'Matricula: 20230002 - 8º Ano A' },
  { id: 3, name: 'Amanda Oliveira', role: 'teacher', details: 'Matemática - Ensino Fundamental II' },
  { id: 4, name: 'Rafael Costa', role: 'teacher', details: 'História - Ensino Médio' },
  { id: 5, name: 'Márcia Sousa', role: 'management', details: 'Coordenadora Pedagógica' },
  { id: 6, name: 'Antônio Pereira', role: 'management', details: 'Diretor' },
  { id: 7, name: 'Carla Martins', role: 'administrative', details: 'Secretária Administrativa' },
  { id: 8, name: 'Paulo Mendes', role: 'administrative', details: 'Auxiliar Administrativo' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      // Filter mock search data based on query
      const filteredResults = MOCK_SEARCH_DATA.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        (person.details && person.details.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filteredResults);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  // Handle person selection from search results
  const handleSelectPerson = (person: SearchResult) => {
    setShowSearchResults(false);
    setSearchQuery('');
    
    // Navigate to appropriate page based on person role
    switch (person.role) {
      case 'student':
        navigate(`/students/${person.id}`);
        break;
      case 'teacher':
        navigate(`/teachers/${person.id}`);
        break;
      case 'management':
        navigate(`/management-team/${person.id}`);
        break;
      case 'administrative':
        // Currently we don't have an admin details page, could add later
        break;
      default:
        break;
    }
  };

  // Update Header's search input handler
  React.useEffect(() => {
    // Find the search input in the header
    const headerSearchInput = document.querySelector('header input[type="text"]');
    
    if (headerSearchInput) {
      // Add event listener to the search input
      headerSearchInput.addEventListener('input', (e) => {
        handleSearchChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
      });
      
      // Clean up on unmount
      return () => {
        headerSearchInput.removeEventListener('input', (e) => {
          handleSearchChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
        });
      };
    }
  }, []);

  return (
    <PageContainer 
      title="Dashboard" 
      subtitle="Bem-vindo à secretaria digital"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total de Alunos"
            value="1,234"
            description="este mês"
            icon={Users}
            trend={{ value: 5.2, isPositive: true }}
            delay={100}
          />
          <StatCard 
            title="Total de Turmas"
            value="48"
            description="ativas"
            icon={BookOpen}
            delay={200}
          />
          <StatCard 
            title="Eventos"
            value="12"
            description="próximos 30 dias"
            icon={Calendar}
            trend={{ value: 2.1, isPositive: true }}
            delay={300}
          />
          <StatCard 
            title="Média de Notas"
            value="8.6"
            description="último bimestre"
            icon={Award}
            trend={{ value: 0.8, isPositive: true }}
            delay={400}
          />
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart area - takes up 2/3 of the space */}
          <BlurOverlay className="lg:col-span-2 p-5 h-[300px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-slate-900">Estatísticas de Frequência</h3>
              <select className="text-sm rounded-md border-slate-200 bg-transparent">
                <option>Este mês</option>
                <option>Últimos 3 meses</option>
                <option>Este ano</option>
              </select>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-40 w-14 bg-primary/15 rounded-t-lg relative">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/80 rounded-t-lg" style={{ height: '75%' }}></div>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">Seg</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-40 w-14 bg-primary/15 rounded-t-lg relative">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/80 rounded-t-lg" style={{ height: '85%' }}></div>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">Ter</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-40 w-14 bg-primary/15 rounded-t-lg relative">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/80 rounded-t-lg" style={{ height: '90%' }}></div>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">Qua</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-40 w-14 bg-primary/15 rounded-t-lg relative">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/80 rounded-t-lg" style={{ height: '65%' }}></div>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">Qui</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-40 w-14 bg-primary/15 rounded-t-lg relative">
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/80 rounded-t-lg" style={{ height: '80%' }}></div>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">Sex</span>
                </div>
              </div>
            </div>
          </BlurOverlay>
          
          {/* Events/Notifications - takes up 1/3 of the space */}
          <DashboardCard className="h-[300px] p-0 overflow-hidden">
            <div className="flex h-full flex-col">
              <div className="px-5 py-3 border-b border-slate-200/70">
                <h3 className="font-medium text-slate-900">Próximos Eventos</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <ul className="divide-y divide-slate-200/70">
                  {UPCOMING_EVENTS.map((event) => (
                    <li key={event.id} className="px-5 py-3 hover:bg-slate-50/80 transition-colors">
                      <div className="flex gap-3">
                        <div className={`
                          p-2 rounded-full flex-shrink-0
                          ${event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                            event.type === 'deadline' ? 'bg-amber-100 text-amber-600' :
                            event.type === 'event' ? 'bg-violet-100 text-violet-600' :
                            'bg-emerald-100 text-emerald-600'
                          }
                        `}>
                          {event.type === 'meeting' ? <Users size={18} /> :
                           event.type === 'deadline' ? <Bell size={18} /> :
                           event.type === 'event' ? <Calendar size={18} /> :
                           <Award size={18} />
                          }
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">{event.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{event.date}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DashboardCard>
        </div>
        
        {/* Activity feed */}
        <DashboardCard className="p-0 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="px-5 py-3 border-b border-slate-200/70 flex justify-between items-center">
              <h3 className="font-medium text-slate-900">Atividades Recentes</h3>
              <a href="#" className="text-primary text-sm hover:underline">Ver todas</a>
            </div>
            
            <div className="overflow-y-auto">
              <ul className="divide-y divide-slate-200/70">
                {RECENT_ACTIVITIES.map((activity) => (
                  <li key={activity.id} className="px-5 py-3 hover:bg-slate-50/80 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {activity.id % 2 === 0 ? 
                            <BarChart3 size={18} /> : 
                            <Bell size={18} />
                          }
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">{activity.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      {/* Search Results Dialog */}
      <SearchResultDialog 
        open={showSearchResults}
        onOpenChange={setShowSearchResults}
        results={searchResults}
        onSelectPerson={handleSelectPerson}
      />
    </PageContainer>
  );
};

export default Dashboard;
