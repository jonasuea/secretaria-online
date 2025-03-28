
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import PageContainer from '../components/layout/PageContainer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Calendar as CalendarIcon, 
  Save, 
  ArrowLeft, 
  Calendar,
  Check,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Mock data for students
const STUDENTS = [
  { id: 1, name: 'Ana Silva', attendance: {} },
  { id: 2, name: 'Carlos Oliveira', attendance: {} },
  { id: 3, name: 'Juliana Santos', attendance: {} },
  { id: 4, name: 'Pedro Almeida', attendance: {} },
  { id: 5, name: 'Mariana Costa', attendance: {} },
  { id: 6, name: 'Lucas Mendes', attendance: {} },
  { id: 7, name: 'Gabriela Lima', attendance: {} },
  { id: 8, name: 'Mateus Souza', attendance: {} },
];

interface Student {
  id: number;
  name: string;
  attendance: {
    [date: string]: 'P' | 'F';
  };
}

interface AttendanceDate {
  date: Date;
  formatted: string;
}

const ClassFrequency = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const className = location.state?.className || `Turma ${id}`;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [attendanceDates, setAttendanceDates] = useState<AttendanceDate[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [changesMade, setChangesMade] = useState(false);
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Initialize attendance for a new date
  const addAttendanceDate = () => {
    if (!date) return;
    
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Check if date already exists
    if (attendanceDates.some(d => d.formatted === formattedDate)) {
      toast({
        title: "Data já adicionada",
        description: "Esta data já foi adicionada à planilha de frequência.",
        variant: "destructive"
      });
      return;
    }
    
    // Add new date to the list
    setAttendanceDates(prev => [
      ...prev, 
      { 
        date: new Date(date), 
        formatted: formattedDate 
      }
    ]);
    
    // Initialize attendance for all students as 'P' (present)
    setStudents(prev => 
      prev.map(student => ({
        ...student,
        attendance: {
          ...student.attendance,
          [formattedDate]: 'P'
        }
      }))
    );
    
    setDate(undefined);
  };

  // Toggle attendance status (P <-> F)
  const toggleAttendance = (studentId: number, dateStr: string) => {
    setChangesMade(true);
    setStudents(prev => 
      prev.map(student => {
        if (student.id === studentId) {
          const newStatus = student.attendance[dateStr] === 'P' ? 'F' : 'P';
          return {
            ...student,
            attendance: {
              ...student.attendance,
              [dateStr]: newStatus
            }
          };
        }
        return student;
      })
    );
  };

  // Save attendance data
  const saveAttendance = () => {
    // In a real application, this would send data to a backend
    toast({
      title: "Frequência salva com sucesso!",
      description: "Os registros de frequência foram atualizados.",
    });
    setChangesMade(false);
  };

  return (
    <PageContainer
      title={`Frequência - ${className}`}
      subtitle="Controle de presença dos alunos"
    >
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-start">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => navigate('/classes')}
            >
              <ArrowLeft size={16} />
              <span>Voltar para Turmas</span>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative max-w-md">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'dd/MM/yyyy') : 'Selecionar data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button onClick={addAttendanceDate} className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Adicionar Data</span>
            </Button>
          </div>
          
          <div className="flex gap-2 w-full lg:w-auto justify-end">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Buscar alunos..."
                className="w-full py-2 pl-3 pr-4 rounded-lg bg-slate-100/80 border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              className={`gap-2 ${changesMade ? 'bg-primary animate-pulse' : 'bg-primary'}`} 
              onClick={saveAttendance}
            >
              <Save size={16} />
              <span className="hidden sm:inline">Salvar</span>
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] sticky left-0 bg-white z-20">Nome do Aluno</TableHead>
                  {attendanceDates.map((d, index) => (
                    <TableHead key={index} className="text-center min-w-[100px]">
                      {format(d.date, 'dd/MM/yyyy')}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium sticky left-0 bg-white z-10">
                      {student.name}
                    </TableCell>
                    
                    {attendanceDates.map((d, index) => (
                      <TableCell key={index} className="text-center p-0">
                        <Button 
                          variant="ghost"
                          className={cn(
                            "h-10 w-10 p-0 rounded-full",
                            student.attendance[d.formatted] === 'P' 
                              ? "text-green-600 hover:text-green-700 hover:bg-green-50" 
                              : "text-red-600 hover:text-red-700 hover:bg-red-50"
                          )}
                          onClick={() => toggleAttendance(student.id, d.formatted)}
                        >
                          {student.attendance[d.formatted] === 'P' ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
                        </Button>
                      </TableCell>
                    ))}
                    
                    {attendanceDates.length === 0 && (
                      <TableCell colSpan={1} className="text-center text-slate-500">
                        Nenhuma data adicionada
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="py-8 text-center text-slate-500">
              <p>Nenhum aluno encontrado com os filtros atuais.</p>
              <Button 
                variant="link" 
                onClick={() => setSearchTerm('')}>
                Limpar filtros
              </Button>
            </div>
          )}
          
          {attendanceDates.length === 0 && (
            <div className="py-8 text-center text-slate-500">
              <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              <p>Nenhuma data de frequência adicionada.</p>
              <p className="text-sm">Adicione uma data para começar o registro de frequência.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-sm text-slate-500">
            <span className="inline-flex items-center mr-4">
              <span className="mr-1 text-green-600"><Check size={16} /></span>
              P - Presente
            </span>
            <span className="inline-flex items-center">
              <span className="mr-1 text-red-600"><X size={16} /></span>
              F - Falta
            </span>
          </div>
          
          <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
            Total de alunos: {filteredStudents.length}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ClassFrequency;
