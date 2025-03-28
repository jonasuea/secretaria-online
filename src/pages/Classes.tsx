
import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import ClassList from '../components/classes/ClassList';

const Classes = () => {
  return (
    <PageContainer
      title="Turmas"
      subtitle="Gerencie todas as turmas da escola"
    >
      <ClassList />
    </PageContainer>
  );
};

export default Classes;
