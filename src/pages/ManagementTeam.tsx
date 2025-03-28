
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ManagementTeamList from '@/components/management/ManagementTeamList';
import ManagementTeamForm from '@/components/management/ManagementTeamForm';
import { useNavigate } from 'react-router-dom';

const ManagementTeam = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddNew = () => {
    setEditingMember(null);
    setShowForm(true);
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setShowForm(true);
  };
  
  const handleView = (member: any) => {
    navigate(`/management-team/${member.id}`);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  const handleFormSubmit = (formData: any) => {
    toast({
      title: editingMember ? "Membro atualizado" : "Membro cadastrado",
      description: `${formData.name} foi ${editingMember ? "atualizado" : "cadastrado"} com sucesso.`,
    });
    setShowForm(false);
    setEditingMember(null);
  };

  return (
    <PageContainer 
      title="Equipe Gestora" 
      subtitle="Gerencie os membros da equipe gestora da instituição"
    >
      {showForm ? (
        <ManagementTeamForm 
          initialData={editingMember} 
          onClose={handleFormClose} 
          onSubmit={handleFormSubmit}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-medium">Lista da Equipe Gestora</h2>
              <p className="text-muted-foreground text-sm">
                Visualize, edite ou adicione novos membros da equipe
              </p>
            </div>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Membro
            </Button>
          </div>
          <ManagementTeamList onEdit={handleEdit} onView={handleView} />
        </>
      )}
    </PageContainer>
  );
};

export default ManagementTeam;
