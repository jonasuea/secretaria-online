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
];

const gradeLevels = [
  { id: 'elementary1', name: 'Ensino Fundamental I (1º ao 5º)' },
  { id: 'elementary2', name: 'Ensino Fundamental II (6º ao 9º)' },
  { id: 'highschool', name: 'Ensino Médio' },
];

const formSchema = z.object({
  name: z.string().min(5, { message: 'Nome deve ter pelo menos 5 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  address: z.string().min(5, { message: 'Endereço é obrigatório' }),
  education: z.string().min(2, { message: 'Formação é obrigatória' }),
  subjects: z.array(z.string()).min(1, { message: 'Selecione pelo menos uma disciplina' }),
  grades: z.array(z.string()).min(1, { message: 'Selecione pelo menos uma série' }),
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
  onSubmit: (data: any) => void;
  initialData?: any;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(initialData?.photo || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      address: initialData?.address || '',
      education: initialData?.education || '',
      subjects: initialData?.subjects || [],
      grades: initialData?.grades || [],
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
                          <Input
                            placeholder="(00) 00000-0000"
                            {...field}
                          />
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
              </div>

              {/* Professional Information */}
              <div className="bg-card rounded-lg border p-4 space-y-4">
                <h3 className="font-medium text-base">Informações Profissionais</h3>

                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formação Acadêmica</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Licenciatura em Matemática" {...field} />
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
                          placeholder="Breve descrição sobre o professor..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Situação</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="r1" />
                            <label htmlFor="r1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Lotado
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="transferred" id="r2" />
                            <label htmlFor="r2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Transferido
                            </label>
                          </div>
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
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
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
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Ativo</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          O professor está ativo e pode ser atribuído a turmas
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              {/* Subjects Section */}
              <div className="bg-card rounded-lg border p-4 space-y-4">
                <h3 className="font-medium text-base">Disciplinas</h3>
                <p className="text-sm text-muted-foreground">
                  Selecione as disciplinas que o professor pode ministrar
                </p>

                <FormField
                  control={form.control}
                  name="subjects"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {subjects.map((subject) => (
                          <FormField
                            key={subject.id}
                            control={form.control}
                            name="subjects"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={subject.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(subject.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, subject.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== subject.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {subject.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Grade Levels Section */}
              <div className="bg-card rounded-lg border p-4 space-y-4">
                <h3 className="font-medium text-base">Séries</h3>
                <p className="text-sm text-muted-foreground">
                  Selecione as séries em que o professor ministra aulas
                </p>

                <FormField
                  control={form.control}
                  name="grades"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 gap-2">
                        {gradeLevels.map((grade) => (
                          <FormField
                            key={grade.id}
                            control={form.control}
                            name="grades"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={grade.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(grade.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, grade.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== grade.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {grade.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? 'Atualizar' : 'Cadastrar'} Professor
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TeacherForm;
