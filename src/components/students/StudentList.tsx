
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlurOverlay from '@/components/ui/BlurOverlay';
import StudentForm from './StudentForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Mock data
const STUDENTS = [
  { id: 1, name: 'Ana Silva', grade: '9º ano', status: 'Ativo', class: '9B', lastAttendance: '2023-06-28' },
  { id: 2, name: 'Carlos Oliveira', grade: '7º ano', status: 'Ativo', class: '7A', lastAttendance: '2023-06-28' },
  { id: 3, name: 'Juliana Santos', grade: '10º ano', status: 'Ativo', class: '10C', lastAttendance: '2023-06-27' },
  { id: 4, name: 'Pedro Almeida', grade: '8º ano', status: 'Inativo', class: '8B', lastAttendance: '2023-06-25' },
  { id: 5, name: 'Mariana Costa', grade: '11º ano', status: 'Ativo', class: '11A', lastAttendance: '2023-06-28' },
  { id: 6, name: 'Lucas Ferreira', grade: '12º ano', status: 'Ativo', class: '12B', lastAttendance: '2023-06-28' },
  { id: 7, name: 'Beatriz Lima', grade: '9º ano', status: 'Ativo', class: '9A', lastAttendance: '2023-06-26' },
  { id: 8, name: 'Gabriel Sousa', grade: '10º ano', status: 'Ativo', class: '10B', lastAttendance: '2023-06-28' },
];

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const filteredStudents = STUDENTS.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleView = (student: any) => {
    navigate(`/students/${student.id}`);
  };
  
  const handleEdit = (student: any) => {
    setSelectedStudent(student);
    setShowForm(true);
  };
  
  const handleDelete = (student: any) => {
    toast({
      title: "Aluno removido",
      description: `${student.name} foi removido do sistema.`,
    });
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedStudent(null);
  };
  
  return (
    <div className="space-y-4">
      {!showForm ? (
        <>
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
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
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter size={16} />
                <span>Filtrar</span>
              </Button>
              
              <Button size="sm" className="gap-2 bg-primary" onClick={() => setShowForm(true)}>
                <Plus size={16} />
                <span>Adicionar</span>
              </Button>
            </div>
          </div>
          
          <BlurOverlay>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200/80">
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nome</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ano</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Turma</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Última Presença</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {filteredStudents.map((student) => (
                    <tr 
                      key={student.id} 
                      className="hover:bg-slate-50/80 transition-colors duration-150"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">{student.name}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{student.grade}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{student.class}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex rounded-full text-xs px-2 py-0.5 font-medium ${
                          student.status === 'Ativo' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{student.lastAttendance}</td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                              <MoreHorizontal size={18} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(student)}>
                              <Eye size={16} className="mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(student)}>
                              <Pencil size={16} className="mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(student)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BlurOverlay>
        </>
      ) : (
        <StudentForm 
          onCancel={handleCloseForm}
          student={selectedStudent}
        />
      )}
    </div>
  );
};

export default StudentList;
