
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Save, ArrowLeft, FileText, Users } from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Mock data for students
const STUDENTS = [
  { id: 1, name: 'Ana Silva', grades: { b1: 8.5, b2: 7.2, b3: 8.0, b4: 9.1 } },
  { id: 2, name: 'Carlos Oliveira', grades: { b1: 7.0, b2: 6.5, b3: 7.0, b4: 7.5 } },
  { id: 3, name: 'Juliana Santos', grades: { b1: 9.0, b2: 9.5, b3: 8.5, b4: 9.8 } },
  { id: 4, name: 'Pedro Almeida', grades: { b1: 6.5, b2: 5.8, b3: 6.0, b4: 6.2 } },
  { id: 5, name: 'Mariana Costa', grades: { b1: 9.5, b2: 9.0, b3: 9.5, b4: 9.7 } },
  { id: 6, name: 'Lucas Mendes', grades: { b1: 7.5, b2: 8.0, b3: 7.0, b4: 8.2 } },
  { id: 7, name: 'Gabriela Lima', grades: { b1: 8.0, b2: 7.5, b3: 8.5, b4: 8.0 } },
  { id: 8, name: 'Mateus Souza', grades: { b1: 6.0, b2: 5.5, b3: 6.5, b4: 6.2 } },
];

// Mock data for subjects with teacher information and grades by subject
const SUBJECTS = [
  { 
    id: 1, 
    name: 'Português', 
    teacher: 'André Pinheiro',
    grades: {
      1: { b1: 8.0, b2: 7.5, b3: 8.5, b4: 9.0 },
      2: { b1: 6.5, b2: 7.0, b3: 6.0, b4: 6.5 },
      3: { b1: 9.0, b2: 8.5, b3: 9.5, b4: 9.0 },
      4: { b1: 5.5, b2: 6.0, b3: 5.5, b4: 6.0 },
      5: { b1: 8.5, b2: 9.0, b3: 8.0, b4: 8.5 },
      6: { b1: 7.0, b2: 7.5, b3: 7.0, b4: 7.5 },
      7: { b1: 8.5, b2: 8.0, b3: 7.5, b4: 8.0 },
      8: { b1: 6.0, b2: 5.5, b3: 6.5, b4: 6.0 },
    }
  },
  { 
    id: 2, 
    name: 'Matemática', 
    teacher: 'Camila Santos',
    grades: {
      1: { b1: 7.5, b2: 8.0, b3: 7.0, b4: 8.5 },
      2: { b1: 7.5, b2: 6.0, b3: 7.5, b4: 7.0 },
      3: { b1: 8.5, b2: 9.0, b3: 8.0, b4: 9.5 },
      4: { b1: 6.0, b2: 5.5, b3: 6.0, b4: 5.5 },
      5: { b1: 9.0, b2: 8.5, b3: 9.0, b4: 9.5 },
      6: { b1: 8.0, b2: 7.5, b3: 7.0, b4: 8.0 },
      7: { b1: 7.5, b2: 8.0, b3: 7.5, b4: 7.0 },
      8: { b1: 5.5, b2: 6.0, b3: 5.5, b4: 6.0 },
    }
  },
  { 
    id: 3, 
    name: 'Ciências', 
    teacher: 'Rafael Moreira',
    grades: {
      1: { b1: 9.0, b2: 8.5, b3: 9.0, b4: 9.5 },
      2: { b1: 7.0, b2: 6.5, b3: 7.0, b4: 7.5 },
      3: { b1: 9.5, b2: 9.0, b3: 9.5, b4: 10.0 },
      4: { b1: 6.5, b2: 6.0, b3: 6.5, b4: 7.0 },
      5: { b1: 9.0, b2: 9.5, b3: 9.0, b4: 9.5 },
      6: { b1: 7.5, b2: 8.0, b3: 7.5, b4: 8.0 },
      7: { b1: 8.0, b2: 8.5, b3: 8.0, b4: 8.5 },
      8: { b1: 6.0, b2: 5.5, b3: 6.0, b4: 6.5 },
    }
  },
  { 
    id: 4, 
    name: 'História', 
    teacher: 'Beatriz Oliveira',
    grades: {
      1: { b1: 8.5, b2: 9.0, b3: 8.5, b4: 9.0 },
      2: { b1: 6.5, b2: 7.0, b3: 6.5, b4: 7.0 },
      3: { b1: 9.0, b2: 9.5, b3: 9.0, b4: 9.5 },
      4: { b1: 6.0, b2: 6.5, b3: 6.0, b4: 6.5 },
      5: { b1: 9.5, b2: 9.0, b3: 9.5, b4: 9.0 },
      6: { b1: 7.0, b2: 7.5, b3: 7.0, b4: 7.5 },
      7: { b1: 8.5, b2: 8.0, b3: 8.5, b4: 8.0 },
      8: { b1: 5.5, b2: 6.0, b3: 5.5, b4: 6.0 },
    }
  },
  { 
    id: 5, 
    name: 'Geografia', 
    teacher: 'Gabriel Costa',
    grades: {
      1: { b1: 8.0, b2: 8.5, b3: 8.0, b4: 8.5 },
      2: { b1: 7.0, b2: 6.5, b3: 7.0, b4: 6.5 },
      3: { b1: 9.5, b2: 9.0, b3: 9.5, b4: 9.0 },
      4: { b1: 5.5, b2: 6.0, b3: 5.5, b4: 6.0 },
      5: { b1: 9.0, b2: 9.5, b3: 9.0, b4: 9.5 },
      6: { b1: 7.5, b2: 7.0, b3: 7.5, b4: 7.0 },
      7: { b1: 8.0, b2: 8.5, b3: 8.0, b4: 8.5 },
      8: { b1: 6.5, b2: 6.0, b3: 6.5, b4: 6.0 },
    }
  },
  { 
    id: 6, 
    name: 'Inglês', 
    teacher: 'Sofia Lima',
    grades: {
      1: { b1: 9.0, b2: 8.5, b3: 9.0, b4: 8.5 },
      2: { b1: 6.0, b2: 6.5, b3: 6.0, b4: 6.5 },
      3: { b1: 9.5, b2: 9.0, b3: 9.5, b4: 9.0 },
      4: { b1: 5.0, b2: 5.5, b3: 5.0, b4: 5.5 },
      5: { b1: 9.0, b2: 9.5, b3: 9.0, b4: 9.5 },
      6: { b1: 7.5, b2: 7.0, b3: 7.5, b4: 7.0 },
      7: { b1: 8.5, b2: 8.0, b3: 8.5, b4: 8.0 },
      8: { b1: 6.0, b2: 5.5, b3: 6.0, b4: 5.5 },
    }
  },
  { 
    id: 7, 
    name: 'Educação Física', 
    teacher: 'Marcos Alves',
    grades: {
      1: { b1: 9.5, b2: 9.0, b3: 9.5, b4: 9.0 },
      2: { b1: 8.5, b2: 8.0, b3: 8.5, b4: 8.0 },
      3: { b1: 10.0, b2: 9.5, b3: 10.0, b4: 9.5 },
      4: { b1: 8.0, b2: 7.5, b3: 8.0, b4: 7.5 },
      5: { b1: 9.5, b2: 9.0, b3: 9.5, b4: 9.0 },
      6: { b1: 9.0, b2: 8.5, b3: 9.0, b4: 8.5 },
      7: { b1: 9.5, b2: 9.0, b3: 9.5, b4: 9.0 },
      8: { b1: 8.0, b2: 7.5, b3: 8.0, b4: 7.5 },
    }
  },
  { 
    id: 8, 
    name: 'Artes', 
    teacher: 'Luísa Cardoso',
    grades: {
      1: { b1: 9.0, b2: 9.5, b3: 9.0, b4: 9.5 },
      2: { b1: 8.0, b2: 8.5, b3: 8.0, b4: 8.5 },
      3: { b1: 9.5, b2: 10.0, b3: 9.5, b4: 10.0 },
      4: { b1: 7.5, b2: 8.0, b3: 7.5, b4: 8.0 },
      5: { b1: 10.0, b2: 9.5, b3: 10.0, b4: 9.5 },
      6: { b1: 8.5, b2: 9.0, b3: 8.5, b4: 9.0 },
      7: { b1: 9.0, b2: 9.5, b3: 9.0, b4: 9.5 },
      8: { b1: 7.0, b2: 7.5, b3: 7.0, b4: 7.5 },
    }
  }
];

interface StudentGrade {
  id: number;
  name: string;
  grades: {
    b1: number;
    b2: number;
    b3: number;
    b4: number;
  };
}

interface Subject {
  id: number;
  name: string;
  teacher: string;
  grades?: {
    [key: number]: {
      b1: number;
      b2: number;
      b3: number;
      b4: number;
    }
  }
}

const ClassGrades = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const className = location.state?.className || `Turma ${id}`;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [studentGrades, setStudentGrades] = useState<StudentGrade[]>(STUDENTS);
  const [changesMade, setChangesMade] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [teachersSheetOpen, setTeachersSheetOpen] = useState(false);
  
  // Update current subject when selection changes
  useEffect(() => {
    if (selectedSubject && selectedSubject !== 'all') {
      const subject = SUBJECTS.find(s => s.name === selectedSubject);
      setCurrentSubject(subject || null);
      
      // Update student grades based on selected subject
      if (subject && subject.grades) {
        const updatedGrades = STUDENTS.map(student => {
          const subjectGrades = subject.grades?.[student.id];
          if (subjectGrades) {
            return {
              ...student,
              grades: subjectGrades
            };
          }
          return student;
        });
        setStudentGrades(updatedGrades);
      }
    } else {
      setCurrentSubject(null);
      setStudentGrades(STUDENTS); // Reset to default grades
    }
  }, [selectedSubject]);
  
  // Calculate annual average
  const calculateAverage = (grades: { b1: number; b2: number; b3: number; b4: number; }) => {
    const total = grades.b1 + grades.b2 + grades.b3 + grades.b4;
    return total / 4;
  };
  
  // Determine student status
  const getStudentStatus = (average: number) => {
    return average >= 6 ? 'Aprovado' : 'Reprovado';
  };
  
  // Filter students based on search term
  const filteredStudents = studentGrades.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update grade
  const handleGradeChange = (studentId: number, bimester: 'b1' | 'b2' | 'b3' | 'b4', value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 10) return;

    setChangesMade(true);
    setStudentGrades(prev => {
      return prev.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            grades: {
              ...student.grades,
              [bimester]: numValue
            }
          };
        }
        return student;
      });
    });
  };

  // Save changes
  const handleSaveChanges = () => {
    // In a real application, this would send data to the backend
    toast({
      title: "Notas salvas com sucesso!",
      description: "As alterações foram registradas no sistema.",
    });
    setChangesMade(false);
  };

  // Generate reports
  const handleGenerateReports = () => {
    toast({
      title: "Gerando boletins",
      description: `Boletins da turma ${className} estão sendo gerados.`,
    });
  };

  // Show visual indicator for grades based on value
  const getGradeColorClass = (value: number) => {
    if (value >= 8) return "bg-green-50 border-green-200";
    if (value >= 6) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <PageContainer
      title={`Notas - ${className}`}
      subtitle={currentSubject 
        ? `Disciplina: ${currentSubject.name} - Professor: ${currentSubject.teacher}`
        : "Lançamento e gerenciamento de notas bimestrais"
      }
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
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar alunos..."
                className="w-full py-2 pl-10 pr-4 rounded-lg bg-slate-100/80 border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Selecionar matéria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as matérias</SelectItem>
                  {SUBJECTS.map((subject) => (
                    <SelectItem key={subject.id} value={subject.name}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Sheet open={teachersSheetOpen} onOpenChange={setTeachersSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Users size={16} />
                    <span className="hidden sm:inline">Professores</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[500px]">
                  <SheetHeader>
                    <SheetTitle>Professores da Turma {className}</SheetTitle>
                    <SheetDescription>
                      Lista de professores por disciplina
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Disciplina</TableHead>
                          <TableHead>Professor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {SUBJECTS.map((subject) => (
                          <TableRow key={subject.id}>
                            <TableCell className="font-medium">{subject.name}</TableCell>
                            <TableCell>{subject.teacher}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2" 
              onClick={handleGenerateReports}
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Gerar Boletins</span>
            </Button>

            <Button 
              size="sm" 
              className={`gap-2 ${changesMade ? 'bg-primary animate-pulse' : 'bg-primary'}`} 
              onClick={handleSaveChanges}
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
                  <TableHead className="w-[250px]">Nome do Aluno</TableHead>
                  <TableHead className="text-center">1º Bimestre</TableHead>
                  <TableHead className="text-center">2º Bimestre</TableHead>
                  <TableHead className="text-center">3º Bimestre</TableHead>
                  <TableHead className="text-center">4º Bimestre</TableHead>
                  <TableHead className="text-center">Média Anual</TableHead>
                  <TableHead className="text-center">Situação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const average = calculateAverage(student.grades);
                  const status = getStudentStatus(average);
                  
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={student.grades.b1}
                          min="0"
                          max="10"
                          step="0.1"
                          className={`w-20 text-center mx-auto ${getGradeColorClass(student.grades.b1)}`}
                          onChange={(e) => handleGradeChange(student.id, 'b1', e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={student.grades.b2}
                          min="0"
                          max="10"
                          step="0.1"
                          className={`w-20 text-center mx-auto ${getGradeColorClass(student.grades.b2)}`}
                          onChange={(e) => handleGradeChange(student.id, 'b2', e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={student.grades.b3}
                          min="0"
                          max="10"
                          step="0.1"
                          className={`w-20 text-center mx-auto ${getGradeColorClass(student.grades.b3)}`}
                          onChange={(e) => handleGradeChange(student.id, 'b3', e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={student.grades.b4}
                          min="0"
                          max="10"
                          step="0.1"
                          className={`w-20 text-center mx-auto ${getGradeColorClass(student.grades.b4)}`}
                          onChange={(e) => handleGradeChange(student.id, 'b4', e.target.value)}
                        />
                      </TableCell>
                      <TableCell className={`font-semibold text-center ${
                        average >= 8 ? 'bg-green-100 text-green-800' :
                        average >= 6 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {average.toFixed(1)}
                      </TableCell>
                      <TableCell className={`text-center font-medium ${
                        status === 'Aprovado' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {status}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
            Total de alunos: {filteredStudents.length}
          </div>
          <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
            Média da turma: {filteredStudents.length > 0 
              ? (filteredStudents.reduce((acc, student) => acc + calculateAverage(student.grades), 0) / filteredStudents.length).toFixed(1)
              : 'N/A'
            }
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ClassGrades;
