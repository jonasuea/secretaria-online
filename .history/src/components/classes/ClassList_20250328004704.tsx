
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Users, BookOpen, CalendarClock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CLASSES = [
  { id: 1, name: '7A', students: 32, teacher: 'Maria Silva', period: 'Manhã', year: '2024' },
  { id: 2, name: '7B', students: 28, teacher: 'José Santos', period: 'Manhã', year: '2024' },
  { id: 3, name: '8A', students: 30, teacher: 'Ana Oliveira', period: 'Manhã', year: '2024' },
  { id: 4, name: '8B', students: 29, teacher: 'João Pereira', period: 'Tarde', year: '2024' },
  { id: 5, name: '9A', students: 31, teacher: 'Carla Costa', period: 'Manhã', year: '2024' },
  { id: 6, name: '9B', students: 27, teacher: 'Roberto Alves', period: 'Tarde', year: '2024' },
  { id: 7, name: '10A', students: 33, teacher: 'Fernanda Lima', period: 'Manhã', year: '2024' },
  { id: 8, name: '10C', students: 26, teacher: 'Paulo Mendes', period: 'Tarde', year: '2024' },
  { id: 9, name: '11A', students: 30, teacher: 'Luciana Ferreira', period: 'Manhã', year: '2024' },
];

const ClassList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [editingClassId, setEditingClassId] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredClasses = CLASSES.filter(classItem =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClass = (classItem) => {
    setEditingClassId(classItem.id);
    setNewClassName(classItem.name);
    setSelectedTeacher(classItem.teacher);
    setSelectedPeriod(classItem.period);
    setIsDialogOpen(true);
  };

  const handleCreateOrUpdateClass = () => {
    if (!newClassName || !selectedTeacher || !selectedPeriod) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos necessários.",
        variant: "destructive"
      });
      return;
    }

    if (editingClassId) {
      toast({
        title: "Turma atualizada",
        description: `A turma ${newClassName} foi atualizada com sucesso!`,
      });
    } else {
      toast({
        title: "Turma criada",
        description: `A turma ${newClassName} foi criada com sucesso!`,
      });
    }

    setNewClassName('');
    setSelectedTeacher('');
    setSelectedPeriod('');
    setEditingClassId(null);
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setNewClassName('');
    setSelectedTeacher('');
    setSelectedPeriod('');
    setEditingClassId(null);
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditGrades = (classId: number, className: string) => {
    navigate(`/classes/${classId}/grades`, { state: { className } });
  };

  const handleEditFrequency = (classId: number, className: string) => {
    navigate(`/classes/${classId}/frequency`, { state: { className } });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar turmas..."
            className="w-full py-2 pl-10 pr-4 rounded-lg bg-slate-100/80 border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={handleOpenDialog}>
              <Plus size={16} />
              <span>Nova Turma</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClassId ? "Editar Turma" : "Adicionar Nova Turma"}</DialogTitle>
              <DialogDescription>
                {editingClassId 
                  ? "Edite os campos abaixo para atualizar a turma."
                  : "Preencha os campos abaixo para criar uma nova turma."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="className" className="text-sm font-medium">
                  Nome da Turma
                </label>
                <Input
                  id="className"
                  placeholder="Ex: 7A, 8B, etc."
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Professor Responsável</label>
                <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar professor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maria Silva">Maria Silva</SelectItem>
                    <SelectItem value="José Santos">José Santos</SelectItem>
                    <SelectItem value="Ana Oliveira">Ana Oliveira</SelectItem>
                    <SelectItem value="João Pereira">João Pereira</SelectItem>
                    <SelectItem value="Carla Costa">Carla Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manhã">Manhã</SelectItem>
                    <SelectItem value="Tarde">Tarde</SelectItem>
                    <SelectItem value="Noite">Noite</SelectItem>
                    <SelectItem value="Integral">Integral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateOrUpdateClass}>
                {editingClassId ? "Atualizar Turma" : "Criar Turma"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Turma</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Período</TableHead>
                <TableHead className="text-center">Alunos</TableHead>
                <TableHead className="text-center">Ano</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">{classItem.name}</TableCell>
                  <TableCell>{classItem.teacher}</TableCell>
                  <TableCell>{classItem.period}</TableCell>
                  <TableCell className="text-center">{classItem.students}</TableCell>
                  <TableCell className="text-center">{classItem.year}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClass(classItem)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditGrades(classItem.id, classItem.name)}
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      Notas
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditFrequency(classItem.id, classItem.name)}
                    >
                      <CalendarClock className="h-4 w-4 mr-1" />
                      Frequência
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
