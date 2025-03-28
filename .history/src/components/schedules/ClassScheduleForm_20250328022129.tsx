import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for classes - this should come from your backend
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

// Mock data for subjects - this should come from your backend
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

const scheduleSchema = z.object({
  classId: z.string().min(1, { message: 'Selecione uma turma' }),
  schedule: z.array(z.object({
    dayId: z.string(),
    periods: z.array(z.object({
      periodId: z.string(),
      subjectId: z.string(),
    })).length(5),
  })).length(5),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

interface ClassScheduleFormProps {
  initialData?: Partial<ScheduleFormValues>;
  onClose: () => void;
  onSubmit: (data: ScheduleFormValues) => void;
}

const ClassScheduleForm: React.FC<ClassScheduleFormProps> = ({
  initialData,
  onClose,
  onSubmit,
}) => {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      classId: initialData?.classId || '',
      schedule: initialData?.schedule || weekDays.map(day => ({
        dayId: day.id,
        periods: periods.map(period => ({
          periodId: period.id,
          subjectId: '',
        })),
      })),
    },
  });

  const handleSubmit = (data: ScheduleFormValues) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2 p-0 h-auto" 
          onClick={onClose}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">
          {initialData ? 'Editar Horário' : 'Novo Horário'}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="classId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Turma*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a turma" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockClasses.map((classItem) => (
                      <SelectItem key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-6">
            {weekDays.map((day, dayIndex) => (
              <div key={day.id} className="bg-card rounded-lg border p-4 space-y-4">
                <h3 className="font-medium text-base">{day.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {periods.map((period, periodIndex) => (
                    <FormField
                      key={period.id}
                      control={form.control}
                      name={`schedule.${dayIndex}.periods.${periodIndex}.subjectId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{period.name}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Disciplina" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject.id} value={subject.id}>
                                  {subject.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? 'Salvar Alterações' : 'Criar Horário'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClassScheduleForm; 