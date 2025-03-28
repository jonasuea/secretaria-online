
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, BookOpen, User, MapPin, 
  Phone, Mail, GraduationCap, BookCopy, Clock 
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

// Mock teacher data
const TEACHER_DATA = {
  id: 1,
  name: 'Amanda Oliveira',
  registration: '20230001T',
  status: 'active',
  education: 'Licenciatura em Matemática',
  address: 'Rua das Palmeiras, 456, Jardim Botânico, São Paulo - SP',
  phone: '(11) 98765-4321',
  email: 'amanda.oliveira@escola.com',
  biography: 'Professora de matemática com 10 anos de experiência no ensino fundamental e médio. Especializada em didática e metodologias ativas de ensino.',
  subjects: ['Matemática', 'Física'],
  grades: ['Ensino Fundamental II (6º ao 9º)', 'Ensino Médio'],
  photo: '',
  classes: [
    { id: 1, name: '9º Ano B', subject: 'Matemática', schedule: 'Segunda e Quarta, 07:30 - 09:10' },
    { id: 2, name: '8º Ano A', subject: 'Matemática', schedule: 'Terça e Quinta, 09:30 - 11:10' },
    { id: 3, name: '2º Ano EM', subject: 'Física', schedule: 'Sexta, 07:30 - 11:10' },
  ]
};

const TeacherDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <PageContainer
      title="Detalhes do Professor"
      subtitle="Visualize informações detalhadas do professor e suas turmas"
    >
      <div className="mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => navigate('/teachers')}
        >
          <ArrowLeft size={16} />
          <span>Voltar para Lista de Professores</span>
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
                <AvatarImage src={TEACHER_DATA.photo} alt={TEACHER_DATA.name} />
                <AvatarFallback className="text-lg">{TEACHER_DATA.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{TEACHER_DATA.name}</h3>
              <p className="text-sm text-muted-foreground">Matrícula: {TEACHER_DATA.registration}</p>
              <Badge className="mt-2" variant={TEACHER_DATA.status === 'active' ? 'default' : 'destructive'}>
                {TEACHER_DATA.status === 'active' ? 'Lotado' : 'Transferido'}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Formação</p>
                  <p className="text-sm text-muted-foreground">{TEACHER_DATA.education}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Endereço</p>
                  <p className="text-sm text-muted-foreground">{TEACHER_DATA.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">{TEACHER_DATA.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{TEACHER_DATA.email}</p>
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
                  <TabsTrigger value="classes" className="gap-2">
                    <BookOpen size={16} />
                    <span>Turmas</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <TabsContent value="profile" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Biografia</h3>
                  <p className="text-sm text-muted-foreground">{TEACHER_DATA.biography}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Disciplinas</h3>
                  <div className="flex flex-wrap gap-2">
                    {TEACHER_DATA.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Séries</h3>
                  <div className="flex flex-wrap gap-2">
                    {TEACHER_DATA.grades.map((grade, idx) => (
                      <Badge key={idx} variant="outline" className="bg-green-50">
                        {grade}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="classes" className="mt-0">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Turmas Atribuídas</h3>
                  <p className="text-sm text-muted-foreground">Turmas que o professor está ministrando atualmente</p>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Turma</TableHead>
                        <TableHead>Disciplina</TableHead>
                        <TableHead>Horário</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TEACHER_DATA.classes.map((classItem) => (
                        <TableRow key={classItem.id}>
                          <TableCell className="font-medium">{classItem.name}</TableCell>
                          <TableCell>{classItem.subject}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Clock size={16} className="text-muted-foreground" />
                            <span>{classItem.schedule}</span>
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

export default TeacherDetails;
