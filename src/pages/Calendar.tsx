
import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ptBR } from 'date-fns/locale';
import EventForm from '../components/calendar/EventForm';
import { useToast } from '@/hooks/use-toast';

// Mock data for events
const INITIAL_EVENTS = [
  { id: 1, title: 'Reunião de pais e mestres', date: new Date(2023, 5, 30), startTime: '19:00', endTime: '21:00', location: 'Auditório' },
  { id: 2, title: 'Fechamento de notas bimestrais', date: new Date(2023, 6, 5), startTime: '08:00', endTime: '17:00', location: 'Secretaria' },
  { id: 3, title: 'Festa junina escolar', date: new Date(2023, 6, 15), startTime: '09:00', endTime: '15:00', location: 'Quadra' },
  { id: 4, title: 'Início das férias escolares', date: new Date(2023, 6, 28), startTime: '00:00', endTime: '23:59', location: 'Escola' },
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [showEventForm, setShowEventForm] = useState(false);
  const { toast } = useToast();

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  // Get events for the selected date
  const eventsForSelectedDate = selectedDate
    ? events.filter(
        (event) => 
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  // Format date string
  const formatEventDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <PageContainer
      title="Calendário"
      subtitle="Gerencie eventos e datas importantes"
    >
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowEventForm(true)} className="gap-2">
          <Plus size={16} />
          <span>Adicionar Evento</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium mb-4">Calendário</h3>
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            className="rounded-md border"
            modifiers={{
              booked: events.map(event => new Date(event.date)),
            }}
            modifiersClassNames={{
              booked: 'bg-primary/10 text-primary font-medium',
            }}
          />
        </div>

        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium mb-4">
            {selectedDate 
              ? `Eventos: ${formatEventDate(selectedDate)}`
              : 'Selecione uma data para ver os eventos'
            }
          </h3>
          
          {eventsForSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {eventsForSelectedDate.map((event) => (
                <div 
                  key={event.id} 
                  className="p-4 border border-slate-200/80 rounded-lg hover:shadow-sm transition-shadow duration-200"
                >
                  <h4 className="text-lg font-medium text-slate-900">{event.title}</h4>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Horário:</span> {event.startTime} - {event.endTime}
                    </p>
                    {event.location && (
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Local:</span> {event.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-slate-500">Não há eventos para esta data.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setShowEventForm(true)}
              >
                Adicionar um evento
              </Button>
            </div>
          )}
        </div>
      </div>

      <EventForm
        isOpen={showEventForm}
        onClose={() => setShowEventForm(false)}
        onSave={handleAddEvent}
      />
    </PageContainer>
  );
};

export default Calendar;
