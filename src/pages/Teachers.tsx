
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import TeacherList from '@/components/teachers/TeacherList';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import TeacherForm from '@/components/teachers/TeacherForm';
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddNew = () => {
    setEditingTeacher(null);
    setShowForm(true);
  };

  const handleEdit = (teacher: any) => {
    setEditingTeacher(teacher);
    setShowForm(true);
  };
  
  const handleView = (teacher: any) => {
    navigate(`/teachers/${teacher.id}`);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTeacher(null);
  };

  const handleFormSubmit = (formData: any) => {
    toast({
      title: editingTeacher ? "Professor atualizado" : "Professor cadastrado",
      description: `${formData.name} foi ${editingTeacher ? "atualizado" : "cadastrado"} com sucesso.`,
    });
    setShowForm(false);
    setEditingTeacher(null);
  };

  return (
    <PageContainer 
      title="Professores" 
      subtitle="Gerencie o corpo docente da instituição"
    >
      {showForm ? (
        <TeacherForm 
          initialData={editingTeacher} 
          onClose={handleFormClose} 
          onSubmit={handleFormSubmit}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-medium">Lista de Professores</h2>
              <p className="text-muted-foreground text-sm">
                Visualize, edite ou adicione novos professores
              </p>
            </div>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Professor
            </Button>
          </div>
          <TeacherList onEdit={handleEdit} onView={handleView} />
        </>
      )}
    </PageContainer>
  );
};

export default Teachers;
