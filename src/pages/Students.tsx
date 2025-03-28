
import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import StudentList from '../components/students/StudentList';

const Students = () => {
  return (
    <PageContainer
      title="Alunos"
      subtitle="Gerencie todos os alunos cadastrados"
    >
      <StudentList />
    </PageContainer>
  );
};

export default Students;
