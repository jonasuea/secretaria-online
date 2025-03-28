
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, BookOpen, User, MapPin, 
  Phone, Mail, Activity, FileText 
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

// Mock attendance data
const ATTENDANCE_DATA = [
  { date: '2024-01-15', status: 'present' },
  { date: '2024-01-16', status: 'present' },
  { date: '2024-01-17', status: 'present' },
  { date: '2024-01-18', status: 'absent' },
  { date: '2024-01-19', status: 'present' },
  { date: '2024-01-22', status: 'present' },
  { date: '2024-01-23', status: 'present' },
  { date: '2024-01-24', status: 'absent' },
  { date: '2024-01-25', status: 'present' },
  { date: '2024-01-26', status: 'present' },
  { date: '2024-02-01', status: 'present' },
  { date: '2024-02-02', status: 'present' },
  { date: '2024-02-05', status: 'absent' },
  { date: '2024-02-06', status: 'present' },
  { date: '2024-02-07', status: 'present' },
];

// Mock student data
const STUDENT_DATA = {
  id: 1,
  name: 'Ana Silva',
  class: '9B',
  registration: '20230001',
  birthdate: '12/05/2009',
  address: 'Rua das Flores, 123, Jardim Primavera, São Paulo - SP',
  phone: '(11) 98765-4321',
  parentPhone: '(11) 91234-5678',
  email: 'ana.silva@aluno.escola.com',
  parentEmail: 'responsavel.ana@email.com',
  photo: ''
};

// Mock grade data by subject
const GRADES_DATA = [
  { subject: 'Português', teacher: 'André Pinheiro', b1: 8.5, b2: 7.2, b3: 8.0, b4: 9.1, average: 8.2 },
  { subject: 'Matemática', teacher: 'Camila Santos', b1: 7.0, b2: 6.5, b3: 7.0, b4: 7.5, average: 7.0 },
  { subject: 'Ciências', teacher: 'Rafael Moreira', b1: 9.0, b2: 9.5, b3: 8.5, b4: 9.8, average: 9.2 },
  { subject: 'História', teacher: 'Beatriz Oliveira', b1: 8.0, b2: 7.5, b3: 8.0, b4: 8.5, average: 8.0 },
  { subject: 'Geografia', teacher: 'Gabriel Costa', b1: 8.5, b2: 8.0, b3: 8.5, b4: 8.0, average: 8.3 },
  { subject: 'Inglês', teacher: 'Sofia Lima', b1: 9.0, b2: 8.5, b3: 9.0, b4: 9.5, average: 9.0 },
  { subject: 'Educação Física', teacher: 'Marcos Alves', b1: 9.5, b2: 9.0, b3: 9.5, b4: 9.0, average: 9.3 },
  { subject: 'Artes', teacher: 'Luísa Cardoso', b1: 10.0, b2: 9.5, b3: 10.0, b4: 9.5, average: 9.8 },
];

interface Attendance {
  date: string;
  status: 'present' | 'absent';
}

interface StudentGrade {
  subject: string;
  teacher: string;
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  average: number;
}

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Convert mock attendance data to Date objects
  const attendanceData: Attendance[] = ATTENDANCE_DATA.map(item => ({
    date: item.date,
    status: item.status as 'present' | 'absent'
  }));
  
  // Format date to display in calendar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate().toString().padStart(2, '0');
  };
  
  // Get days in month for calendar
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week (0-6) for the first day of the month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    
    // Create empty slots for days before the first day of the month
    const days = Array(firstDayOfMonth).fill(null);
    
    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  // Check if a specific day has an attendance record
  const getAttendanceStatus = (day: number): 'present' | 'absent' | '' => {
    const dateToCheck = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const attendanceRecord = attendanceData.find(record => record.date === dateToCheck);
    return attendanceRecord ? attendanceRecord.status : '';
  };
  
  // Get color class based on attendance status
  const getAttendanceColorClass = (status: 'present' | 'absent' | '') => {
    if (status === 'present') return 'bg-green-100 text-green-800 hover:bg-green-200';
    if (status === 'absent') return 'bg-red-100 text-red-800 hover:bg-red-200';
    return '';
  };
  
  // Get month name
  const getMonthName = (month: number) => {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return monthNames[month];
  };
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Calculate overall attendance percentage
  const calculateAttendancePercentage = () => {
    if (!attendanceData || attendanceData.length === 0) return '0%';
    
    const totalAttendance = attendanceData.length;
    const presentDays = attendanceData.filter(record => record.status === 'present').length;
    return `${Math.round((presentDays / totalAttendance) * 100)}%`;
  };
  
  // Calculate overall grade average
  const calculateOverallAverage = () => {
    if (!GRADES_DATA || GRADES_DATA.length === 0) return '0.0';
    
    const total = GRADES_DATA.reduce((sum, grade) => sum + grade.average, 0);
    return (total / GRADES_DATA.length).toFixed(1);
  };
  
  // Get color class based on grade value
  const getGradeColorClass = (value: number) => {
    if (value >= 8) return "bg-green-100 text-green-800";
    if (value >= 6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };
  
  return (
    <PageContainer
      title="Detalhes do Aluno"
      subtitle="Visualize informações detalhadas, notas e frequência do aluno"
    >
      <div className="mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => navigate('/students')}
        >
          <ArrowLeft size={16} />
          <span>Voltar para Lista de Alunos</span>
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
                <AvatarImage src={STUDENT_DATA.photo} alt={STUDENT_DATA.name} />
                <AvatarFallback className="text-lg">{STUDENT_DATA.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{STUDENT_DATA.name}</h3>
              <p className="text-sm text-muted-foreground">Matrícula: {STUDENT_DATA.registration}</p>
              <Badge className="mt-2">{STUDENT_DATA.class}</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Data de Nascimento</p>
                  <p className="text-sm text-muted-foreground">{STUDENT_DATA.birthdate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Endereço</p>
                  <p className="text-sm text-muted-foreground">{STUDENT_DATA.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">{STUDENT_DATA.phone}</p>
                  <p className="text-sm font-medium mt-1">Telefone do Responsável</p>
                  <p className="text-sm text-muted-foreground">{STUDENT_DATA.parentPhone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{STUDENT_DATA.email}</p>
                  <p className="text-sm font-medium mt-1">Email do Responsável</p>
                  <p className="text-sm text-muted-foreground">{STUDENT_DATA.parentEmail}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <Tabs defaultValue="grades">
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <CardTitle>Desempenho Acadêmico</CardTitle>
                <TabsList>
                  <TabsTrigger value="grades" className="gap-2">
                    <BookOpen size={16} />
                    <span>Notas</span>
                  </TabsTrigger>
                  <TabsTrigger value="attendance" className="gap-2">
                    <Calendar size={16} />
                    <span>Frequência</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <TabsContent value="grades" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Boletim</h3>
                    <p className="text-sm text-muted-foreground">Notas por disciplina</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="text-xs">≥ 8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="text-xs">6-7.9</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="text-xs">{"< 6"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">Disciplina</TableHead>
                        <TableHead>Professor</TableHead>
                        <TableHead className="text-center">1º Bim</TableHead>
                        <TableHead className="text-center">2º Bim</TableHead>
                        <TableHead className="text-center">3º Bim</TableHead>
                        <TableHead className="text-center">4º Bim</TableHead>
                        <TableHead className="text-center">Média</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {GRADES_DATA.map((grade: StudentGrade, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{grade.subject}</TableCell>
                          <TableCell>{grade.teacher}</TableCell>
                          <TableCell className={`text-center ${getGradeColorClass(grade.b1)}`}>{grade.b1.toFixed(1)}</TableCell>
                          <TableCell className={`text-center ${getGradeColorClass(grade.b2)}`}>{grade.b2.toFixed(1)}</TableCell>
                          <TableCell className={`text-center ${getGradeColorClass(grade.b3)}`}>{grade.b3.toFixed(1)}</TableCell>
                          <TableCell className={`text-center ${getGradeColorClass(grade.b4)}`}>{grade.b4.toFixed(1)}</TableCell>
                          <TableCell className={`font-semibold text-center ${getGradeColorClass(grade.average)}`}>
                            {grade.average.toFixed(1)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText size={16} />
                    <span>Gerar Boletim</span>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="attendance" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Calendário de Frequência</h3>
                    <p className="text-sm text-muted-foreground">Dias presentes e ausências</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="text-xs">Presente</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="text-xs">Ausente</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToPreviousMonth}
                  >
                    Mês Anterior
                  </Button>
                  <h3 className="text-md font-medium">
                    {getMonthName(currentMonth)} {currentYear}
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToNextMonth}
                  >
                    Próximo Mês
                  </Button>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                  <div className="text-sm font-medium">Dom</div>
                  <div className="text-sm font-medium">Seg</div>
                  <div className="text-sm font-medium">Ter</div>
                  <div className="text-sm font-medium">Qua</div>
                  <div className="text-sm font-medium">Qui</div>
                  <div className="text-sm font-medium">Sex</div>
                  <div className="text-sm font-medium">Sáb</div>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {generateCalendarDays().map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="h-10"></div>;
                    }
                    
                    const dayStatus = getAttendanceStatus(day);
                    const colorClass = getAttendanceColorClass(dayStatus);
                    
                    return (
                      <div
                        key={`day-${day}`}
                        className={`h-10 flex items-center justify-center rounded-md cursor-default ${colorClass}`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between mt-6">
                  <div className="text-center border p-3 rounded-md flex-grow mx-1">
                    <p className="text-sm text-muted-foreground">Taxa de Presença</p>
                    <p className="text-xl font-semibold text-green-600">
                      {calculateAttendancePercentage()}
                    </p>
                  </div>
                  <div className="text-center border p-3 rounded-md flex-grow mx-1">
                    <p className="text-sm text-muted-foreground">Faltas Totais</p>
                    <p className="text-xl font-semibold text-red-600">
                      {attendanceData.filter(record => record.status === 'absent').length}
                    </p>
                  </div>
                  <div className="text-center border p-3 rounded-md flex-grow mx-1">
                    <p className="text-sm text-muted-foreground">Média Geral</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {calculateOverallAverage()}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </PageContainer>
  );
};

export default StudentDetails;
