
import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import BlurOverlay from '../components/ui/BlurOverlay';
import { Button } from '../components/ui/button';
import { Search, Plus, Calendar, Clock, MoreHorizontal, UserCheck, UserX } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock data
const MEETINGS = [
  { id: 1, title: 'Reunião de Pais e Mestres', date: '2023-07-15', time: '19:00', location: 'Auditório', attendees: 'Pais do 6º ao 9º ano', status: 'Agendada' },
  { id: 2, title: 'Conselho de Classe', date: '2023-07-10', time: '14:00', location: 'Sala de Reuniões', attendees: 'Professores', status: 'Agendada' },
  { id: 3, title: 'Atendimento Individual - Maria Oliveira', date: '2023-07-05', time: '16:30', location: 'Sala da Coordenação', attendees: 'Pais da aluna Ana Silva', status: 'Realizada' },
  { id: 4, title: 'Planejamento Escolar', date: '2023-07-03', time: '08:00', location: 'Sala dos Professores', attendees: 'Equipe Pedagógica', status: 'Realizada' },
  { id: 5, title: 'Apresentação Projeto Escolar', date: '2023-07-20', time: '18:30', location: 'Auditório', attendees: 'Comunidade Escolar', status: 'Agendada' },
];

const MeetingManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const filteredMeetings = MEETINGS.filter(meeting => 
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.attendees.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleStatusChange = (meeting: any, newStatus: string) => {
    toast({
      title: `Status atualizado`,
      description: `Reunião: ${meeting.title} - Status: ${newStatus}`,
    });
  };
  
  return (
    <PageContainer
      title="Reuniões e Contatos"
      subtitle="Gerenciamento de reuniões, atendimentos e contatos"
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar reuniões..."
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-slate-100/80 border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 bg-primary">
                <Plus size={16} />
                <span>Nova Reunião</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Agendar Nova Reunião</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes para agendar uma nova reunião ou atendimento
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Título
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Data
                  </Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Horário
                  </Label>
                  <Input id="time" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Local
                  </Label>
                  <Input id="location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="attendees" className="text-right">
                    Participantes
                  </Label>
                  <Input id="attendees" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Observações
                  </Label>
                  <Textarea id="notes" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Agendar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <BlurOverlay>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Participantes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMeetings.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell className="font-medium">{meeting.title}</TableCell>
                    <TableCell>{meeting.date}</TableCell>
                    <TableCell>{meeting.time}</TableCell>
                    <TableCell>{meeting.location}</TableCell>
                    <TableCell>{meeting.attendees}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full text-xs px-2 py-0.5 font-medium ${
                        meeting.status === 'Agendada' 
                          ? 'bg-blue-100 text-blue-800' 
                          : meeting.status === 'Realizada'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {meeting.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-slate-400 hover:text-slate-600 transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleStatusChange(meeting, 'Realizada')}>
                            <UserCheck size={16} />
                            <span>Marcar como Realizada</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleStatusChange(meeting, 'Cancelada')}>
                            <UserX size={16} />
                            <span>Cancelar Reunião</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>Detalhes</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </BlurOverlay>
      </div>
    </PageContainer>
  );
};

export default MeetingManager;
