
import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { HelpCircle, BookOpen, Check, X } from 'lucide-react';

const GradeHelper: React.FC = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle size={16} />
          <span>Ajuda</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-3xl mx-auto">
        <DrawerHeader>
          <DrawerTitle>Guia de Lançamento de Notas</DrawerTitle>
          <DrawerDescription>
            Instruções e dicas para o lançamento correto de notas no sistema.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Como lançar notas corretamente
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Digite as notas utilizando números de 0 a 10, podendo usar decimais (ex: 7.5).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>O sistema calcula automaticamente a média do aluno com base em todas as notas lançadas.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Utilize os filtros de turma, bimestre e matéria para facilitar seu trabalho.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Clique em "Salvar" para registrar as alterações no sistema.</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-2 text-red-700">
              <X className="h-5 w-5 text-red-500" />
              Erros comuns a evitar
            </h3>
            <ul className="space-y-2 text-sm text-red-700">
              <li className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-500 mt-0.5" />
                <span>Nunca feche a página sem salvar as alterações.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-500 mt-0.5" />
                <span>Evite inserir notas fora da escala de 0 a 10.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-500 mt-0.5" />
                <span>Não deixe notas em branco ao finalizar o lançamento do bimestre.</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-700 mb-2">Prazos importantes</h3>
            <p className="text-sm text-blue-700">Os prazos para fechamento de notas são definidos no calendário acadêmico. Fique atento às datas para não perder os prazos de lançamento.</p>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Entendi</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GradeHelper;
