import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, CalendarIcon } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  rg: z.string().min(1, { message: 'RG é obrigatório' }),
  cpf: z.string().min(11, { message: 'CPF inválido' }).max(14, { message: 'CPF inválido' }),
  registration: z.string().min(1, { message: 'Matrícula é obrigatória' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  employmentStatus: z.enum(['active', 'temporary', 'leave', 'retired']),
  education: z.string().min(3, { message: 'Formação é obrigatória' }),
  position: z.string().min(1, { message: 'Cargo é obrigatório' }),
  status: z.enum(['active', 'transferred']),
  transferDate: z.date().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

interface ManagementTeamFormProps {
  initialData?: Partial<FormValues>;
  onClose: () => void;
  onSubmit: (data: FormValues) => void;
}

const ManagementTeamForm: React.FC<ManagementTeamFormProps> = ({ 
  initialData, 
  onClose,
  onSubmit 
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      rg: initialData?.rg || '',
      cpf: initialData?.cpf || '',
      registration: initialData?.registration || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      employmentStatus: initialData?.employmentStatus || 'active',
      education: initialData?.education || '',
      position: initialData?.position || '',
      status: initialData?.status || 'active',
      transferDate: initialData?.transferDate || null,
    }
  });

  const status = form.watch('status');

  const handleSubmit = (data: FormValues) => {
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
          {initialData ? 'Editar membro' : 'Adicionar novo membro'}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrícula*</FormLabel>
                  <FormControl>
                    <Input placeholder="Número de matrícula" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RG*</FormLabel>
                  <FormControl>
                    <Input placeholder="Número do RG" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF*</FormLabel>
                  <FormControl>
                    <Input placeholder="Número do CPF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="Email institucional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone*</FormLabel>
                  <FormControl>
                    <Input placeholder="Número de telefone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="diretor">Diretor</SelectItem>
                      <SelectItem value="vice-diretor">Vice-Diretor</SelectItem>
                      <SelectItem value="coordenador">Coordenador Pedagógico</SelectItem>
                      <SelectItem value="pedagogo">Pedagogo</SelectItem>
                      <SelectItem value="secretario">Secretário</SelectItem>
                      <SelectItem value="auxiliar">Auxiliar Administrativo</SelectItem>
                      <SelectItem value="psicologo">Psicólogo Escolar</SelectItem>
                      <SelectItem value="assistente">Assistente Social</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Situação Funcional*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="active" />
                        <FormLabel htmlFor="active" className="font-normal cursor-pointer">
                          Ativo
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="temporary" id="temporary" />
                        <FormLabel htmlFor="temporary" className="font-normal cursor-pointer">
                          Temporário
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="leave" id="leave" />
                        <FormLabel htmlFor="leave" className="font-normal cursor-pointer">
                          Licença
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="retired" id="retired" />
                        <FormLabel htmlFor="retired" className="font-normal cursor-pointer">
                          Aposentado
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Formação Acadêmica*</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva a formação acadêmica (graduação, especializações, etc.)" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-card rounded-lg border p-4 space-y-4">
            <h3 className="font-medium text-base">Situação na Escola</h3>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="active" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Lotado
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="transferred" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Transferido
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {status === 'transferred' && (
              <FormField
                control={form.control}
                name="transferDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Transferência</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value && 'text-muted-foreground'
                            }`}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? 'Salvar Alterações' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ManagementTeamForm;
