
import React, { useState } from 'react';
import { Edit, Eye, Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for demonstration
const MOCK_TEACHERS = [
  {
    id: 1,
    name: 'Amanda Oliveira',
    photo: '',
    email: 'amanda.oliveira@escola.com',
    phone: '(11) 98765-4321',
    subjects: ['Matemática', 'Física'],
    status: 'active'
  },
  {
    id: 2,
    name: 'Rafael Costa',
    photo: '',
    email: 'rafael.costa@escola.com',
    phone: '(11) 97654-3210',
    subjects: ['História', 'Geografia'],
    status: 'active'
  },
  {
    id: 3,
    name: 'Carla Ferreira',
    photo: '',
    email: 'carla.ferreira@escola.com',
    phone: '(11) 96543-2109',
    subjects: ['Português', 'Literatura'],
    status: 'transferred'
  },
];

interface TeacherListProps {
  onEdit: (teacher: any) => void;
  onView: (teacher: any) => void;
}

const TeacherList: React.FC<TeacherListProps> = ({ onEdit, onView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTeachers = MOCK_TEACHERS.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar professor por nome, email ou disciplina..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredTeachers.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">Nenhum professor encontrado</h3>
          <p className="text-muted-foreground">
            Não há professores que correspondam à sua busca.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Professor</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead>Disciplinas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={teacher.photo} alt={teacher.name} />
                        <AvatarFallback>{teacher.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {teacher.name}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <a 
                      href={`mailto:${teacher.email}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {teacher.email}
                    </a>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{teacher.phone}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                      {teacher.status === 'active' ? 'Lotado' : 'Transferido'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onView(teacher)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Visualizar</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onEdit(teacher)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
