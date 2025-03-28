import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const SchoolSettings = () => {
  const [numberOfRooms, setNumberOfRooms] = useState('9'); // Default value
  const { toast } = useToast();

  const handleSaveSettings = () => {
    const rooms = parseInt(numberOfRooms);
    if (isNaN(rooms) || rooms <= 0) {
      toast({
        title: "Valor inválido",
        description: "O número de salas deve ser um número maior que zero.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save this to your backend/database
    localStorage.setItem('schoolNumberOfRooms', rooms.toString());
    
    toast({
      title: "Configurações salvas",
      description: "As configurações da escola foram atualizadas com sucesso!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados da Escola</CardTitle>
        <CardDescription>
          Configure as informações básicas da escola
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="numberOfRooms">Número de Salas</Label>
          <Input
            id="numberOfRooms"
            type="number"
            min="1"
            value={numberOfRooms}
            onChange={(e) => setNumberOfRooms(e.target.value)}
            placeholder="Digite o número total de salas"
          />
          <p className="text-sm text-muted-foreground">
            Este número será usado para gerar automaticamente as salas disponíveis para cadastro de turmas.
          </p>
        </div>

        <Button onClick={handleSaveSettings}>
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
};

export default SchoolSettings; 