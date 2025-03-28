
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  // Informações Pessoais
  name: z.string().min(3, 'Nome completo é obrigatório'),
  gender: z.string().min(1, 'Selecione o sexo'),
  ethnicity: z.string().min(1, 'Selecione raça/cor/etnia'),
  
  // Movimentação
  movementType: z.string().optional(),
  movementDate: z.string().optional(),
  originSchool: z.string().optional(),
  destinationSchool: z.string().optional(),
  
  // Documentos
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  age: z.string().optional(),
  nationality: z.string().min(1, 'Nacionalidade é obrigatória'),
  birthPlace: z.string().min(1, 'Naturalidade é obrigatória'),
  state: z.string().min(1, 'UF é obrigatória'),
  rg: z.string().optional(),
  cpf: z.string().min(11, 'CPF inválido').max(14, 'CPF inválido'),
  
  // Programas sociais
  receivesBolsaFamilia: z.boolean().default(false),
  nis: z.string().optional(),
  
  // Censo
  isInCensus: z.boolean().default(false),
  censusId: z.string().optional(),
  susCardNumber: z.string().optional(),
  
  // Saúde
  covidVaccination: z.string().default("NÃO"),
  isAEE: z.boolean().default(false),
  cidCode: z.string().optional(),
  hasRestrictiveDiet: z.boolean().default(false),
  dietRestriction: z.string().optional(),
  
  // Informações escolares
  uniformSize: z.string().optional(),
  usesSchoolTransport: z.boolean().default(false),
  
  // Informações da Mãe
  motherName: z.string().optional(),
  motherPhone: z.string().optional(),
  motherRg: z.string().optional(),
  motherCpf: z.string().optional(),
  
  // Informações do Pai
  fatherName: z.string().optional(),
  fatherPhone: z.string().optional(),
  fatherRg: z.string().optional(),
  fatherCpf: z.string().optional(),
  
  // Informações do Responsável
  guardianName: z.string().optional(),
  guardianRelationship: z.string().optional(),
  guardianPhone: z.string().min(10, 'Telefone inválido'),
  guardianRg: z.string().optional(),
  guardianCpf: z.string().optional(),
  
  // Endereço
  address: z.string().min(5, 'Endereço é obrigatório'),
  addressNumber: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  zipCode: z.string().min(8, 'CEP inválido'),
}).refine((data) => {
  if (data.receivesBolsaFamilia && (!data.nis || data.nis.length === 0)) {
    return false;
  }
  return true;
}, {
  message: "NIS é obrigatório quando recebe Bolsa Família",
  path: ["nis"],
}).refine((data) => {
  if (data.isInCensus && (!data.censusId || data.censusId.length === 0)) {
    return false;
  }
  return true;
}, {
  message: "ID Censo é obrigatório quando aluno está no censo",
  path: ["censusId"],
}).refine((data) => {
  if (data.isAEE && (!data.cidCode || data.cidCode.length === 0)) {
    return false;
  }
  return true;
}, {
  message: "CID é obrigatório para alunos AEE",
  path: ["cidCode"],
}).refine((data) => {
  if (data.hasRestrictiveDiet && (!data.dietRestriction || data.dietRestriction.length === 0)) {
    return false;
  }
  return true;
}, {
  message: "Informe a restrição alimentar",
  path: ["dietRestriction"],
});

type StudentFormValues = z.infer<typeof formSchema>;

interface StudentFormProps {
  onCancel: () => void;
  student?: StudentFormValues;
}

const StudentForm: React.FC<StudentFormProps> = ({ onCancel, student }) => {
  const { toast } = useToast();
  
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: student || {
      name: '',
      gender: '',
      ethnicity: '',
      movementType: '',
      movementDate: '',
      originSchool: '',
      destinationSchool: '',
      birthDate: '',
      age: '',
      nationality: 'Brasileira',
      birthPlace: '',
      state: '',
      rg: '',
      cpf: '',
      receivesBolsaFamilia: false,
      nis: '',
      isInCensus: false,
      censusId: '',
      susCardNumber: '',
      covidVaccination: 'NÃO',
      isAEE: false,
      cidCode: '',
      hasRestrictiveDiet: false,
      dietRestriction: '',
      uniformSize: '',
      usesSchoolTransport: false,
      motherName: '',
      motherPhone: '',
      motherRg: '',
      motherCpf: '',
      fatherName: '',
      fatherPhone: '',
      fatherRg: '',
      fatherCpf: '',
      guardianName: '',
      guardianRelationship: '',
      guardianPhone: '',
      guardianRg: '',
      guardianCpf: '',
      address: '',
      addressNumber: '',
      neighborhood: '',
      zipCode: '',
    },
  });

  const onSubmit = (data: StudentFormValues) => {
    // Here you would normally send the data to an API
    console.log('Form submitted:', data);
    
    toast({
      title: "Aluno salvo com sucesso!",
      description: `${data.name} foi salvo no sistema.`,
    });
    
    onCancel(); // Return to the list view
  };

  // Get values from the form
  const receivesBolsaFamilia = form.watch('receivesBolsaFamilia');
  const isInCensus = form.watch('isInCensus');
  const isAEE = form.watch('isAEE');
  const hasRestrictiveDiet = form.watch('hasRestrictiveDiet');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{student ? 'Editar Aluno' : 'Novo Aluno'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Seção: Informações Pessoais */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do aluno" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ethnicity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raça/Cor/Etnia</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="branco">Branco</SelectItem>
                          <SelectItem value="preto">Preto</SelectItem>
                          <SelectItem value="pardo">Pardo</SelectItem>
                          <SelectItem value="amarelo">Amarelo</SelectItem>
                          <SelectItem value="indigena">Indígena</SelectItem>
                          <SelectItem value="naodeclarado">Não Declarado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Seção: Movimentação */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Movimentação</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="movementType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Movimentação</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="VEIO_TRANSFERIDO">Veio Transferido(a)</SelectItem>
                          <SelectItem value="FOI_TRANSFERIDO">Foi Transferido(a)</SelectItem>
                          <SelectItem value="VEIO_REMANEJADO">Veio Remanejado(a)</SelectItem>
                          <SelectItem value="FOI_REMANEJADO">Foi Remanejado(a)</SelectItem>
                          <SelectItem value="VEIO_CLASSIFICADO">Veio Classificado(a)</SelectItem>
                          <SelectItem value="FOI_CLASSIFICADO">Foi Classificado(a)</SelectItem>
                          <SelectItem value="DEIXOU_FREQUENTAR">Deixou de Frequentar</SelectItem>
                          <SelectItem value="EVADIDO">Evadido(a)</SelectItem>
                          <SelectItem value="FALECIDO">Falecido(a)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="movementDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Movimentação</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="originSchool"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>De onde veio</FormLabel>
                      <FormControl>
                        <Input placeholder="Escola, Município, ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="destinationSchool"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Para onde vai</FormLabel>
                      <FormControl>
                        <Input placeholder="Escola, Município, ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Seção: Documentos e Dados Pessoais */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Documentos e Dados Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input placeholder="Idade" {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Nacionalidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="birthPlace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naturalidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Cidade de nascimento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UF</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AC">Acre</SelectItem>
                          <SelectItem value="AL">Alagoas</SelectItem>
                          <SelectItem value="AP">Amapá</SelectItem>
                          <SelectItem value="AM">Amazonas</SelectItem>
                          <SelectItem value="BA">Bahia</SelectItem>
                          <SelectItem value="CE">Ceará</SelectItem>
                          <SelectItem value="DF">Distrito Federal</SelectItem>
                          <SelectItem value="ES">Espírito Santo</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="MA">Maranhão</SelectItem>
                          <SelectItem value="MT">Mato Grosso</SelectItem>
                          <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PA">Pará</SelectItem>
                          <SelectItem value="PB">Paraíba</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="PE">Pernambuco</SelectItem>
                          <SelectItem value="PI">Piauí</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="RO">Rondônia</SelectItem>
                          <SelectItem value="RR">Roraima</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="SE">Sergipe</SelectItem>
                          <SelectItem value="TO">Tocantins</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Input placeholder="RG do aluno" {...field} />
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
                        <Input placeholder="CPF do aluno" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Seção: Programas Sociais */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Programas Sociais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="receivesBolsaFamilia"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Recebe Bolsa Família?</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {receivesBolsaFamilia && (
                  <FormField
                    control={form.control}
                    name="nis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIS</FormLabel>
                        <FormControl>
                          <Input placeholder="Número NIS" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            
            {/* Seção: Censo e SUS */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Censo e SUS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="isInCensus"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Está no Censo da Escola?</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {isInCensus && (
                  <FormField
                    control={form.control}
                    name="censusId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Censo Aluno</FormLabel>
                        <FormControl>
                          <Input placeholder="ID do Censo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="susCardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número Cartão SUS</FormLabel>
                      <FormControl>
                        <Input placeholder="Número do Cartão SUS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="covidVaccination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vacinado COVID?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NÃO">Não</SelectItem>
                          <SelectItem value="PRIMEIRA_DOSE">Primeira Dose</SelectItem>
                          <SelectItem value="SEGUNDA_DOSE">Segunda Dose</SelectItem>
                          <SelectItem value="TERCEIRA_DOSE">Terceira Dose</SelectItem>
                          <SelectItem value="QUARTA_DOSE">Quarta Dose</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Seção: Saúde */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Saúde</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="isAEE"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Aluno AEE?</FormLabel>
                        <FormDescription>
                          Atendimento Educacional Especializado
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {isAEE && (
                  <FormField
                    control={form.control}
                    name="cidCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qual o CID?</FormLabel>
                        <FormControl>
                          <Input placeholder="Código CID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="hasRestrictiveDiet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>O aluno tem dieta restritiva?</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {hasRestrictiveDiet && (
                  <FormField
                    control={form.control}
                    name="dietRestriction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qual?</FormLabel>
                        <FormControl>
                          <Input placeholder="Restrição alimentar" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            
            {/* Seção: Informações Escolares */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Informações Escolares</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="uniformSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho da Farda</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tamanho" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PP">PP</SelectItem>
                          <SelectItem value="P">P</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="G">G</SelectItem>
                          <SelectItem value="GG">GG</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="usesSchoolTransport"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Transporte Escolar?</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Seção: Informações da Mãe */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Informações da Mãe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Mãe</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo da mãe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="motherPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefone da mãe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="motherRg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input placeholder="RG da mãe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="motherCpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="CPF da mãe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Seção: Informações do Pai */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Informações do Pai</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Pai</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo do pai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fatherPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefone do pai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fatherRg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input placeholder="RG do pai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fatherCpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="CPF do pai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Seção: Informações do Responsável */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Informações do Responsável</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="guardianName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo do responsável" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="guardianRelationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grau de Parentesco</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MAE">Mãe</SelectItem>
                          <SelectItem value="PAI">Pai</SelectItem>
                          <SelectItem value="AVO">Avó/Avô</SelectItem>
                          <SelectItem value="TIO">Tio/Tia</SelectItem>
                          <SelectItem value="IRMAO">Irmão/Irmã</SelectItem>
                          <SelectItem value="OUTRO">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="guardianPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefone do responsável" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="guardianRg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input placeholder="RG do responsável" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="guardianCpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="CPF do responsável" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Seção: Endereço */}
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Endereço</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua, Avenida, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="addressNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nº</FormLabel>
                      <FormControl>
                        <Input placeholder="Número" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="CEP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onCancel}>
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
              <Button type="submit">
                <Save size={16} className="mr-2" />
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
