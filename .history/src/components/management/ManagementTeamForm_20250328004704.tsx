
import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
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

interface ManagementTeamFormProps {
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ManagementTeamForm: React.FC<ManagementTeamFormProps> = ({ 
  initialData, 
  onClose,
  onSubmit 
}) => {
  const form = useForm({
    defaultValues: initialData || {
      name: '',
      rg: '',
      cpf: '',
      registration: '',
      email: '',
      phone: '',
      employmentStatus: 'active',
      education: '',
      position: '',
    }
  });

  const handleSubmit = (data: any) => {
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

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ManagementTeamForm;
