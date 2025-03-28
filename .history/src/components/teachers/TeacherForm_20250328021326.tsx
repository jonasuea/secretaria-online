import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ptBR } from 'date-fns/locale';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
  { id: 'computer_science', name: 'Informática' },
  { id: 'music', name: 'Música' },
  { id: 'religious', name: 'Ensino Religioso' },
];

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

interface ClassAssignment {
  classId: string;
  subjectId: string;
}

const formSchema = z.object({
  name: z.string().min(5, { message: 'Nome deve ter pelo menos 5 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  address: z.string().min(5, { message: 'Endereço é obrigatório' }),
  education: z.string().min(2, { message: 'Formação é obrigatória' }),
  classAssignments: z.array(z.object({
    classId: z.string(),
    subjectId: z.string()
  })).min(1, { message: 'Atribua pelo menos uma turma e disciplina' }),
  active: z.boolean().default(true),
  photo: z.string().optional(),
  bio: z.string().optional(),
  status: z.enum(['active', 'transferred']),
  transferDate: z.date().optional().nullable(),
  registration: z.string().min(1, { message: 'Matrícula é obrigatória' }),
  rg: z.string().min(1, { message: 'RG é obrigatório' }),
  cpf: z.string().min(11, { message: 'CPF inválido' }).max(14, { message: 'CPF inválido' }),
});

type FormValues = z.infer<typeof formSchema>;

interface TeacherFormProps {
  onClose: () => void;
  onSubmit: (data: FormValues & { photo: string | null }) => void;
  initialData?: Partial<FormValues & { photo: string | null }>;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(initialData?.photo || null);
  const [assignments, setAssignments] = React.useState<ClassAssignment[]>(
    initialData?.classAssignments || []
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      address: initialData?.address || '',
      education: initialData?.education || '',
      classAssignments: initialData?.classAssignments || [],
      active: initialData?.active !== undefined ? initialData.active : true,
      bio: initialData?.bio || '',
      status: initialData?.status || 'active',
      transferDate: initialData?.transferDate ? new Date(initialData.transferDate) : null,
      registration: initialData?.registration || '',
      rg: initialData?.rg || '',
      cpf: initialData?.cpf || '',
    },
  });

  const status = form.watch('status');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotoPreview(e.target.result as string);
          form.setValue('photo', e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: FormValues) => {
    onSubmit({ ...values, photo: photoPreview });
  };

  const addAssignment = () => {
    const newAssignment: ClassAssignment = { classId: '', subjectId: '' };
    setAssignments([...assignments, newAssignment]);
    const currentAssignments = form.getValues('classAssignments');
    form.setValue('classAssignments', [...currentAssignments, newAssignment]);
  };

  const removeAssignment = (index: number) => {
    const newAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(newAssignments);
    form.setValue('classAssignments', newAssignments);
  };

  const updateAssignment = (index: number, field: keyof ClassAssignment, value: string) => {
    const newAssignments = assignments.map((assignment, i) => {
      if (i === index) {
        return { ...assignment, [field]: value };
      }
      return assignment;
    });
    setAssignments(newAssignments);
    form.setValue('classAssignments', newAssignments);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {initialData ? 'Editar Professor' : 'Novo Professor'}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-6">
              {/* Personal Information */}
              <div className="bg-card rounded-lg border p-4 space-y-4">
                <h3 className="font-medium text-base">Informações Pessoais</h3>

                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={photoPreview || ''} alt="Teacher photo" />
                    <AvatarFallback>
                      {initialData?.name
                        ? initialData.name.substring(0, 2).toUpperCase()
                        : 'TP'}
                    </AvatarFallback>
                  </Avatar>

                  <label
                    htmlFor="photo-upload"
                    className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="text-sm font-medium">Upload Foto</span>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do professor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="registration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Matrícula</FormLabel>
                        <FormControl>
                          <Input placeholder="Número da matrícula" {...field} />
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
                        <FormLabel>RG</FormLabel>
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
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="Número do CPF" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@escola.com" {...field} />
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
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formação</FormLabel>
                      <FormControl>
                        <Input placeholder="Formação acadêmica" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biografia</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Fale um pouco sobre o professor..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Class Assignments Section */}
              <div className="bg-card rounded-lg border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-base">Atribuição de Turmas e Disciplinas</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addAssignment}
                    size="sm"
                  >
                    Adicionar Turma
                  </Button>
                </div>

                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`classAssignments.${index}.classId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Turma</FormLabel>
                              <Select
                                value={assignment.classId}
                                onValueChange={(value) => updateAssignment(index, 'classId', value)}
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

                        <FormField
                          control={form.control}
                          name={`classAssignments.${index}.subjectId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Disciplina</FormLabel>
                              <Select
                                value={assignment.subjectId}
                                onValueChange={(value) => updateAssignment(index, 'subjectId', value)}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione a disciplina" />
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
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeAssignment(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </Button>
                    </div>
                  ))}

                  {assignments.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      Nenhuma turma atribuída. Clique em "Adicionar Turma" para começar.
                    </div>
                  )}
                </div>
              </div>

              {/* Status Section */}
              <div className="bg-card rounded-lg border p-4 space-y-4">
                <h3 className="font-medium text-base">Status</h3>

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
                              Ativo
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
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? 'Salvar Alterações' : 'Criar Professor'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TeacherForm;
