
import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import BlurOverlay from '../components/ui/BlurOverlay';
import { Button } from '../components/ui/button';
import { Search, Plus, FileText, Download, MoreHorizontal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

// Mock data
const DOCUMENTS = [
  { id: 1, title: 'Autorização de Passeio', type: 'Autorização', createdAt: '2023-06-10', description: 'Documento para autorização de passeios e excursões escolares.' },
  { id: 2, title: 'Declaração de Matrícula', type: 'Declaração', createdAt: '2023-06-15', description: 'Declaração oficial de matrícula para fins diversos.' },
  { id: 3, title: 'Ficha de Saúde', type: 'Formulário', createdAt: '2023-06-18', description: 'Formulário para registro de informações de saúde do aluno.' },
  { id: 4, title: 'Termo de Compromisso', type: 'Termo', createdAt: '2023-06-20', description: 'Termo de compromisso referente às normas da escola.' },
  { id: 5, title: 'Boletim Escolar', type: 'Relatório', createdAt: '2023-06-25', description: 'Modelo de boletim com notas e frequência do aluno.' },
  { id: 6, title: 'Autorização de Imagem', type: 'Autorização', createdAt: '2023-06-30', description: 'Documento para autorização de uso de imagem do aluno.' },
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDocuments = DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <PageContainer
      title="Documentos Escolares"
      subtitle="Gerenciamento de documentos, termos e autorizações"
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar documentos..."
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-slate-100/80 border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 bg-primary">
                <Plus size={16} />
                <span>Novo Documento</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Novo Documento</DialogTitle>
                <DialogDescription>
                  Crie um novo modelo de documento para uso na escola
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
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <Input id="type" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Arquivo
                  </Label>
                  <Input id="file" type="file" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc, index) => (
            <BlurOverlay 
              key={doc.id} 
              className="h-full"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <Card className="h-full border-none shadow-none bg-transparent">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                          {doc.type}
                        </span>
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <FileText size={16} />
                          <span>Visualizar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Download size={16} />
                          <span>Baixar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{doc.description}</p>
                </CardContent>
                <CardFooter className="border-t border-slate-100 pt-4 text-xs text-slate-500">
                  Criado em: {doc.createdAt}
                </CardFooter>
              </Card>
            </BlurOverlay>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Documents;
