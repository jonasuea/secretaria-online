
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, BookOpen, User, MapPin, 
  Phone, Mail, Briefcase, Calendar as CalendarIcon, ClipboardList 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageContainer from '@/components/layout/PageContainer';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock management team member data
const MANAGEMENT_DATA = {
  id: 1,
  name: 'Maria Silva',
  registration: '12345',
  position: 'Diretor',
  email: 'maria.silva@escola.edu.br',
  phone: '(11) 98765-4321',
  address: 'Avenida Principal, 100, Centro, São Paulo - SP',
  education: 'Mestrado em Gestão Educacional',
  biography: 'Profissional com mais de 15 anos de experiência em gestão escolar. Especialista em liderança educacional e implementação de projetos pedagógicos inovadores.',
  startDate: '10/02/2015',
  status: 'active',
  photo: '',
  responsibilities: [
    'Coordenação geral da escola',
    'Supervisão pedagógica',
    'Relações institucionais',
    'Gestão de recursos humanos',
    'Planejamento estratégico',
  ],
  recentActivities: [
    { id: 1, title: 'Reunião com Secretaria de Educação', date: '15/05/2023', type: 'meeting' },
    { id: 2, title: 'Elaboração do Planejamento Anual', date: '10/01/2023', type: 'planning' },
    { id: 3, title: 'Evento de Inauguração do Laboratório', date: '20/03/2023', type: 'event' },
  ]
};

const getPositionBadgeColor = (position: string) => {
  switch(position) {
    case 'Diretor':
      return 'bg-purple-100 text-purple-800';
    case 'Coordenador Pedagógico':
      return 'bg-blue-100 text-blue-800';
    case 'Secretário':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ManagementTeamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <PageContainer
      title="Detalhes do Membro da Equipe Gestora"
      subtitle="Visualize informações detalhadas sobre o membro da equipe gestora"
    >
      <div className="mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => navigate('/management-team')}
        >
          <ArrowLeft size={16} />
          <span>Voltar para Equipe Gestora</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={MANAGEMENT_DATA.photo} alt={MANAGEMENT_DATA.name} />
                <AvatarFallback className="text-lg">{MANAGEMENT_DATA.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{MANAGEMENT_DATA.name}</h3>
              <p className="text-sm text-muted-foreground">Matrícula: {MANAGEMENT_DATA.registration}</p>
              <Badge className={`mt-2 ${getPositionBadgeColor(MANAGEMENT_DATA.position)}`}>
                {MANAGEMENT_DATA.position}
              </Badge>
              <Badge className="mt-2" variant={MANAGEMENT_DATA.status === 'active' ? 'default' : 'destructive'}>
                {MANAGEMENT_DATA.status === 'active' ? 'Lotado' : 'Transferido'}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Briefcase size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Formação</p>
                  <p className="text-sm text-muted-foreground">{MANAGEMENT_DATA.education}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Endereço</p>
                  <p className="text-sm text-muted-foreground">{MANAGEMENT_DATA.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">{MANAGEMENT_DATA.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{MANAGEMENT_DATA.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CalendarIcon size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Data de Início</p>
                  <p className="text-sm text-muted-foreground">{MANAGEMENT_DATA.startDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <Tabs defaultValue="profile">
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <CardTitle>Perfil Profissional</CardTitle>
                <TabsList>
                  <TabsTrigger value="profile" className="gap-2">
                    <User size={16} />
                    <span>Perfil</span>
                  </TabsTrigger>
                  <TabsTrigger value="activities" className="gap-2">
                    <ClipboardList size={16} />
                    <span>Atividades</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <TabsContent value="profile" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Biografia</h3>
                  <p className="text-sm text-muted-foreground">{MANAGEMENT_DATA.biography}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Responsabilidades</h3>
                  <ul className="space-y-2">
                    {MANAGEMENT_DATA.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <span className="text-xs text-primary font-medium">{idx + 1}</span>
                        </div>
                        <span className="text-sm">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="activities" className="mt-0">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Atividades Recentes</h3>
                  <p className="text-sm text-muted-foreground">Principais atividades desenvolvidas</p>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Atividade</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Tipo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MANAGEMENT_DATA.recentActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">{activity.title}</TableCell>
                          <TableCell>{activity.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              activity.type === 'meeting' ? 'bg-blue-50' :
                              activity.type === 'planning' ? 'bg-amber-50' :
                              'bg-green-50'
                            }>
                              {activity.type === 'meeting' ? 'Reunião' :
                               activity.type === 'planning' ? 'Planejamento' :
                               'Evento'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ManagementTeamDetails;
