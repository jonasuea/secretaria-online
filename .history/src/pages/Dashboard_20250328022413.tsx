import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import BlurOverlay from '@/components/ui/BlurOverlay';
import { 
  Users, 
  Calendar, 
  GraduationCap,
  BarChart3,
  CalendarCheck,
  PartyPopper,
  School,
  BookOpen
} from 'lucide-react';

// Mock data for the statistics chart
const frequencyData = [85, 92, 88, 78, 90];
const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: 'Reunião de pais e mestres',
    date: '30 Jun, 2023',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Fechamento de notas bimestrais',
    date: '05 Jul, 2023',
    icon: CalendarCheck,
    color: 'bg-yellow-500'
  },
  {
    id: 3,
    title: 'Festa junina escolar',
    date: '15 Jul, 2023',
    icon: PartyPopper,
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Início das férias escolares',
    date: '28 Jul, 2023',
    icon: School,
    color: 'bg-green-500'
  }
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    user: 'Ana Silva',
    action: 'registrou presença para a turma 9B',
    time: '2 horas atrás',
    icon: Users,
  },
  {
    id: 2,
    user: 'João',
    action: 'registrou notas para Matemática do 7A',
    time: '3 horas atrás',
    icon: BookOpen,
  },
  {
    id: 3,
    user: 'Pedro',
    action: 'adicionou um novo evento no calendário',
    time: '5 horas atrás',
    icon: Calendar,
  },
  {
    id: 4,
    user: 'Juliana',
    action: 'editou informações do aluno Carlos Mendes',
    time: '6 horas atrás',
    icon: GraduationCap,
  }
];

const Dashboard = () => {
  return (
    <PageContainer
      title="Dashboard"
      subtitle="Bem-vindo à secretaria digital"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="md:col-span-8 space-y-6">
          {/* School Info Card */}
          <BlurOverlay className="p-5">
            <h2 className="text-lg font-semibold mb-4">ESCOLA MUNICIPAL DOM PAULO</h2>
            <div className="w-full h-[200px] bg-slate-100 rounded-lg">
              {/* Replace with actual map component */}
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Mapa da localização
              </div>
            </div>
          </BlurOverlay>

          {/* Attendance Statistics */}
          <BlurOverlay className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Estatísticas de Frequência</h2>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>Este mês</option>
                <option>Último mês</option>
                <option>Este ano</option>
              </select>
            </div>
            <div className="h-[200px] flex items-end justify-between gap-2">
              {frequencyData.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-blue-500 rounded-t-md transition-all duration-300 hover:opacity-80"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-sm text-slate-600">{weekDays[index]}</span>
                </div>
              ))}
            </div>
          </BlurOverlay>
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 gap-4">
            <BlurOverlay className="p-4">
              <div className="flex flex-col items-center">
                <h3 className="text-sm text-slate-500">Total de Alunos</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">1,234</span>
                  <span className="text-xs text-green-500">+5.2% este mês</span>
                </div>
              </div>
            </BlurOverlay>

            <BlurOverlay className="p-4">
              <div className="flex flex-col items-center">
                <h3 className="text-sm text-slate-500">Total de Colaboradores</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">34</span>
                  <span className="text-xs text-slate-400">ativos</span>
                </div>
              </div>
            </BlurOverlay>

            <BlurOverlay className="p-4">
              <div className="flex flex-col items-center">
                <h3 className="text-sm text-slate-500">Total de Turmas</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">48</span>
                  <span className="text-xs text-slate-400">ativas</span>
                </div>
              </div>
            </BlurOverlay>

            <BlurOverlay className="p-4">
              <div className="flex flex-col items-center">
                <h3 className="text-sm text-slate-500">Eventos</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">12</span>
                  <span className="text-xs text-green-500">+21% próximos 30 dias</span>
                </div>
              </div>
            </BlurOverlay>

            <BlurOverlay className="col-span-2 p-4">
              <div className="flex flex-col items-center">
                <h3 className="text-sm text-slate-500">Média de Notas</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">8.6</span>
                  <span className="text-xs text-green-500">+0.8% último bimestre</span>
                </div>
              </div>
            </BlurOverlay>
          </div>

          {/* Upcoming Events */}
          <BlurOverlay className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Próximos Eventos</h2>
              <button className="text-sm text-blue-500 hover:underline">
                Ver todos
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${event.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{event.title}</h3>
                      <p className="text-xs text-slate-500">{event.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </BlurOverlay>

          {/* Recent Activities */}
          <BlurOverlay className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Atividades Recentes</h2>
              <button className="text-sm text-blue-500 hover:underline">
                Ver todas
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100">
                      <Icon className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </h3>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </BlurOverlay>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
