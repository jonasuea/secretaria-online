import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import ClassScheduleForm from '@/components/schedules/ClassScheduleForm';
import { useToast } from '@/hooks/use-toast';
import BlurOverlay from '@/components/ui/BlurOverlay';

const mockClasses = [
  { id: '1A', name: '1º Ano A - Ensino Médio' },
  { id: '1B', name: '1º Ano B - Ensino Médio' },
  { id: '2A', name: '2º Ano A - Ensino Médio' },
  { id: '2B', name: '2º Ano B - Ensino Médio' },
  { id: '3A', name: '3º Ano A - Ensino Médio' },
  { id: '6A', name: '6º Ano A - Fundamental' },
  { id: '7A', name: '7º Ano A - Fundamental' },
  { id: '8A', name: '8º Ano A - Fundamental' },
  { id: '9A', name: '9º Ano A - Fundamental' },
];

const subjects = [
  { id: 'portuguese', name: 'Português' },
  { id: 'math', name: 'Matemática' },
  { id: 'science', name: 'Ciências' },
  { id: 'biology', name: 'Biologia' },
  { id: 'physics', name: 'Física' },
  { id: 'chemistry', name: 'Química' },
  { id: 'history', name: 'História' },
  { id: 'geography', name: 'Geografia' },
  { id: 'english', name: 'Inglês' },
  { id: 'arts', name: 'Artes' },
  { id: 'pe', name: 'Educação Física' },
  { id: 'sociology', name: 'Sociologia' },
  { id: 'philosophy', name: 'Filosofia' },
  { id: 'religious', name: 'Ensino Religioso' },
];

const weekDays = [
  { id: 'monday', name: 'Segunda-feira' },
  { id: 'tuesday', name: 'Terça-feira' },
  { id: 'wednesday', name: 'Quarta-feira' },
  { id: 'thursday', name: 'Quinta-feira' },
  { id: 'friday', name: 'Sexta-feira' },
];

const periods = [
  { id: '1', name: '1º Tempo (7:30 - 8:20)' },
  { id: '2', name: '2º Tempo (8:20 - 9:10)' },
  { id: '3', name: '3º Tempo (9:10 - 10:00)' },
  { id: '4', name: '4º Tempo (10:20 - 11:10)' },
  { id: '5', name: '5º Tempo (11:10 - 12:00)' },
];

// Mock data for existing schedules - this should come from your backend
const mockSchedules = [
  {
    classId: '1A',
    schedule: weekDays.map(day => ({
      dayId: day.id,
      periods: periods.map(period => ({
        periodId: period.id,
        subjectId: subjects[Math.floor(Math.random() * subjects.length)].id,
      })),
    })),
  },
  // Add more mock schedules as needed
];

const Schedules = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState<any>(null);
  const { toast } = useToast();

  const handleCreateSchedule = (data: any) => {
    console.log('Creating schedule:', data);
    toast({
      title: 'Horário criado',
      description: 'O horário foi criado com sucesso!',
    });
    setIsFormOpen(false);
  };

  const handleEditSchedule = (data: any) => {
    console.log('Updating schedule:', data);
    toast({
      title: 'Horário atualizado',
      description: 'O horário foi atualizado com sucesso!',
    });
    setIsFormOpen(false);
    setSelectedSchedule(null);
  };

  const getSubjectName = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.name || '';
  };

  return (
    <PageContainer
      title="Horários"
      subtitle="Gerencie os horários das turmas"
      action={
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Horário
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-6">
        {mockSchedules.map((schedule, index) => {
          const classInfo = mockClasses.find(c => c.id === schedule.classId);
          
          return (
            <BlurOverlay key={index} className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{classInfo?.name}</h3>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSchedule(schedule);
                    setIsFormOpen(true);
                  }}
                >
                  Editar
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-muted">Horário</th>
                      {weekDays.map(day => (
                        <th key={day.id} className="border p-2 bg-muted">
                          {day.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {periods.map((period, periodIndex) => (
                      <tr key={period.id}>
                        <td className="border p-2 bg-muted font-medium">
                          {period.name}
                        </td>
                        {weekDays.map((day, dayIndex) => (
                          <td key={day.id} className="border p-2 text-center">
                            {getSubjectName(schedule.schedule[dayIndex].periods[periodIndex].subjectId)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </BlurOverlay>
          );
        })}
      </div>

      {isFormOpen && (
        <ClassScheduleForm
          initialData={selectedSchedule}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedSchedule(null);
          }}
          onSubmit={selectedSchedule ? handleEditSchedule : handleCreateSchedule}
        />
      )}
    </PageContainer>
  );
};

export default Schedules; 