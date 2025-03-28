
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any) => void;
}

const EventForm: React.FC<EventFormProps> = ({ isOpen, onClose, onSave }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [location, setLocation] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!eventName) {
      toast({
        title: "Campo obrigatório",
        description: "O nome do evento é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    if (!eventDate) {
      toast({
        title: "Campo obrigatório",
        description: "A data do evento é obrigatória.",
        variant: "destructive"
      });
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: eventName,
      date: eventDate,
      startTime,
      endTime,
      location,
    };

    onSave(newEvent);
    resetForm();
    onClose();

    toast({
      title: "Evento criado",
      description: `O evento "${eventName}" foi criado com sucesso!`,
    });
  };

  const resetForm = () => {
    setEventName('');
    setEventDate(new Date());
    setStartTime('08:00');
    setEndTime('09:00');
    setLocation('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Evento</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do evento para adicioná-lo ao calendário.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="eventName" className="text-sm font-medium">
              Nome do Evento
            </label>
            <Input
              id="eventName"
              placeholder="Ex: Reunião de pais"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Data</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !eventDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {eventDate ? (
                    format(eventDate, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={eventDate}
                  onSelect={setEventDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startTime" className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Hora de Início</span>
              </label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="endTime" className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Hora de Término</span>
              </label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Local</span>
            </label>
            <Input
              id="location"
              placeholder="Ex: Auditório da escola"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Adicionar Evento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
