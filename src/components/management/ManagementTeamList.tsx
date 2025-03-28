
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
const MOCK_MANAGEMENT_TEAM = [
  {
    id: 1,
    name: 'Maria Silva',
    registration: '12345',
    position: 'Diretor',
    email: 'maria.silva@escola.edu.br',
    phone: '(11) 98765-4321',
    photo: '',
    status: 'active'
  },
  {
    id: 2,
    name: 'João Santos',
    registration: '23456',
    position: 'Coordenador Pedagógico',
    email: 'joao.santos@escola.edu.br',
    phone: '(11) 91234-5678',
    photo: '',
    status: 'active'
  },
  {
    id: 3,
    name: 'Ana Costa',
    registration: '34567',
    position: 'Secretário',
    email: 'ana.costa@escola.edu.br',
    phone: '(11) 99876-5432',
    photo: '',
    status: 'transferred'
  },
];

interface ManagementTeamListProps {
  onEdit: (member: any) => void;
  onView: (member: any) => void;
}

const ManagementTeamList: React.FC<ManagementTeamListProps> = ({ onEdit, onView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMembers = MOCK_MANAGEMENT_TEAM.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPositionBadgeColor = (position: string) => {
    switch(position) {
      case 'Diretor':
        return 'bg-purple-500';
      case 'Coordenador Pedagógico':
        return 'bg-blue-500';
      case 'Secretário':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar membro por nome, cargo ou email..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredMembers.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">Nenhum membro encontrado</h3>
          <p className="text-muted-foreground">
            Não há membros da equipe que correspondam à sua busca.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="hidden md:table-cell">Matrícula</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.photo} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {member.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPositionBadgeColor(member.position)}>
                      {member.position}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{member.registration}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {member.email}
                    </a>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{member.phone}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status === 'active' ? 'Lotado' : 'Transferido'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onView(member)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Visualizar</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onEdit(member)}>
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

export default ManagementTeamList;
