import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import SchoolSettings from '../components/settings/SchoolSettings';

const Settings = () => {
  return (
    <PageContainer
      title="Configurações"
      subtitle="Gerencie as configurações do sistema"
    >
      <div className="space-y-6">
        <SchoolSettings />
      </div>
    </PageContainer>
  );
};

export default Settings;
