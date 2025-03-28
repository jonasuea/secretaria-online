
import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import BlurOverlay from '../components/ui/BlurOverlay';
import { Button } from '../components/ui/button';
import { Search, Filter, FileText, Download, Save, BookOpen, GraduationCap } from 'lucide-react';
import GradeHelper from '../components/grades/GradeHelper';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data for classes
const CLASSES = [
  { id: 1, name: '7A' },
  { id: 2, name: '7B' },
  { id: 3, name: '8A' },
  { id: 4, name: '8B' },
  { id: 5, name: '9A' },
  { id: 6, name: '9B' },
  { id: 7, name: '10A' },
  { id: 8, name: '10C' },
  { id: 9, name: '11A' },
];

// Mock data for bimesters
const BIMESTERS = [
  { id: 1, name: '1º Bimestre' },
  { id: 2, name: '2º Bimestre' },
  { id: 3, name: '3º Bimestre' },
  { id: 4, name: '4º Bimestre' },
];

// Mock data for subjects
const SUBJECTS = [
  { id: 1, name: 'Português' },
  { id: 2, name: 'Matemática' },
  { id: 3, name: 'Ciências' },
  { id: 4, name: 'História' },
  { id: 5, name: 'Geografia' },
  { id: 6, name: 'Inglês' },
  { id: 7, name: 'Educação Física' },
  { id: 8, name: 'Artes' },
];

// Mock data
const STUDENTS_GRADES = [
  { id: 1, name: 'Ana Silva', class: '9B', portuguese: 8.5, math: 7.0, science: 9.0, history: 8.0, geography: 8.5, average: 8.2 },
  { id: 2, name: 'Carlos Oliveira', class: '7A', portuguese: 7.0, math: 9.5, science: 8.0, history: 7.5, geography: 8.0, average: 8.0 },
  { id: 3, name: 'Juliana Santos', class: '10C', portuguese: 9.0, math: 8.5, science: 9.5, history: 9.0, geography: 8.5, average: 8.9 },
  { id: 4, name: 'Pedro Almeida', class: '8B', portuguese: 6.5, math: 7.0, science: 7.5, history: 6.0, geography: 7.0, average: 6.8 },
  { id: 5, name: 'Mariana Costa', class: '11A', portuguese: 9.5, math: 9.0, science: 9.0, history: 9.5, geography: 9.5, average: 9.3 },
  { id: 6, name: 'Lucas Mendes', class: '9B', portuguese: 7.5, math: 8.0, science: 7.0, history: 8.5, geography: 7.5, average: 7.7 },
  { id: 7, name: 'Gabriela Lima', class: '7A', portuguese: 8.0, math: 6.5, science: 7.5, history: 8.0, geography: 7.0, average: 7.4 },
  { id: 8, name: 'Mateus Souza', class: '8B', portuguese: 6.0, math: 6.5, science: 7.0, history: 6.5, geography: 7.5, average: 6.7 },
];

interface StudentGrade {
  id: number;
  name: string;
  class: string;
  portuguese: number;
  math: number;
  science: number;
  history: number;
  geography: number;
  average: number;
  [key: string]: number | string;
}

const StudentGrades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedBimester, setSelectedBimester] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [studentGrades, setStudentGrades] = useState<StudentGrade[]>(STUDENTS_GRADES);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [changesMade, setChangesMade] = useState(false);
  const { toast } = useToast();
  
  // Filter students based on search term and selected class
  const filteredStudents = studentGrades.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? student.class === selectedClass : true;
    return matchesSearch && matchesClass;
  });

  // Calculate student average dynamically based on all grades
  const calculateAverage = (student: StudentGrade) => {
    const subjects = ['portuguese', 'math', 'science', 'history', 'geography'];
    const sum = subjects.reduce((acc, subject) => acc + Number(student[subject]), 0);
    return (sum / subjects.length).toFixed(1);
  };

  // Update grade for a student and subject
  const handleGradeChange = (studentId: number, subject: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 10) return;

    setChangesMade(true);
    setStudentGrades(prev => {
      return prev.map(student => {
        if (student.id === studentId) {
          // Update the specific subject grade
          const updatedStudent = { ...student, [subject]: numValue };
          // Recalculate average
          updatedStudent.average = parseFloat(calculateAverage(updatedStudent));
          return updatedStudent;
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
    setIsReportDialogOpen(true);
  };

  // Export data
  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo exportados para Excel.",
    });
    // In a real application, this would trigger a file download
  };

  // Show visual indicator for grades based on value
  const getGradeColorClass = (value: number) => {
    if (value >= 8) return "bg-green-50 border-green-200";
    if (value >= 6) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <PageContainer
      title="Lançamento de Notas"
      subtitle="Gerenciamento de notas e boletins dos alunos"
    >
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-start">
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
            
            <div className="flex flex-wrap gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Selecionar turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as turmas</SelectItem>
                  {CLASSES.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.name}>
                      {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedBimester} onValueChange={setSelectedBimester}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Selecionar bimestre" />
                </SelectTrigger>
                <SelectContent>
                  {BIMESTERS.map((bimester) => (
                    <SelectItem key={bimester.id} value={bimester.name}>
                      {bimester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
            <GradeHelper />
            
            <Button variant="outline" size="sm" className="gap-2" onClick={() => {}}>
              <Filter size={16} />
              <span className="hidden sm:inline">Filtrar</span>
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2" onClick={handleGenerateReports}>
              <FileText size={16} />
              <span className="hidden sm:inline">Gerar Boletins</span>
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2" onClick={handleExportData}>
              <Download size={16} />
              <span className="hidden sm:inline">Exportar</span>
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
        
        <BlurOverlay>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-52">Nome</TableHead>
                  <TableHead className="w-20">Turma</TableHead>
                  <TableHead>Português</TableHead>
                  <TableHead>Matemática</TableHead>
                  <TableHead>Ciências</TableHead>
                  <TableHead>História</TableHead>
                  <TableHead>Geografia</TableHead>
                  <TableHead className="w-20 text-center">Média</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={student.portuguese}
                        min="0"
                        max="10"
                        step="0.5"
                        className={`w-20 text-center ${getGradeColorClass(student.portuguese)}`}
                        onChange={(e) => handleGradeChange(student.id, 'portuguese', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={student.math}
                        min="0"
                        max="10"
                        step="0.5"
                        className={`w-20 text-center ${getGradeColorClass(student.math)}`}
                        onChange={(e) => handleGradeChange(student.id, 'math', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={student.science}
                        min="0"
                        max="10"
                        step="0.5"
                        className={`w-20 text-center ${getGradeColorClass(student.science)}`}
                        onChange={(e) => handleGradeChange(student.id, 'science', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={student.history}
                        min="0"
                        max="10"
                        step="0.5"
                        className={`w-20 text-center ${getGradeColorClass(student.history)}`}
                        onChange={(e) => handleGradeChange(student.id, 'history', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={student.geography}
                        min="0"
                        max="10"
                        step="0.5"
                        className={`w-20 text-center ${getGradeColorClass(student.geography)}`}
                        onChange={(e) => handleGradeChange(student.id, 'geography', e.target.value)}
                      />
                    </TableCell>
                    <TableCell className={`font-semibold text-center ${
                      student.average >= 8 ? 'bg-green-100 text-green-800' :
                      student.average >= 6 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.average.toFixed(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="py-8 text-center text-slate-500">
              <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              <p>Nenhum aluno encontrado com os filtros atuais.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedClass('');
                }}>
                Limpar filtros
              </Button>
            </div>
          )}
        </BlurOverlay>

        <div className="flex justify-end mt-4 gap-2">
          <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
            Total de alunos: {filteredStudents.length}
          </div>
          <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
            Média da turma: {filteredStudents.length > 0 
              ? (filteredStudents.reduce((acc, student) => acc + student.average, 0) / filteredStudents.length).toFixed(1)
              : 'N/A'
            }
          </div>
        </div>
      </div>

      {/* Dialog for report generation */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Gerar Boletins</DialogTitle>
            <DialogDescription>
              Configure as opções para geração dos boletins dos alunos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="report-title" className="text-sm font-medium">
                Título do Boletim
              </label>
              <Input
                id="report-title"
                placeholder="Ex: Boletim 1º Bimestre - 2024"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Turma</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as turmas</SelectItem>
                  {CLASSES.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.name}>
                      {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={selectedBimester} onValueChange={setSelectedBimester}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar bimestre" />
                </SelectTrigger>
                <SelectContent>
                  {BIMESTERS.map((bimester) => (
                    <SelectItem key={bimester.id} value={bimester.name}>
                      {bimester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              setIsReportDialogOpen(false);
              toast({
                title: "Gerando boletins",
                description: reportTitle 
                  ? `Geração dos boletins "${reportTitle}" iniciada.`
                  : "Geração dos boletins iniciada.",
              });
            }}>
              <FileText className="mr-2 h-4 w-4" />
              Gerar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default StudentGrades;
