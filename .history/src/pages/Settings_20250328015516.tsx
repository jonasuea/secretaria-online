import React from 'react';
import { School, Mail, Phone, MapPin, Clock, Shield, Bell, Briefcase } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import BlurOverlay from '../components/ui/BlurOverlay';
import { Button } from '../components/ui/button';
import SchoolSettings from '../components/settings/SchoolSettings';

const Settings = () => {
  return (
    <PageContainer
      title="Configurações"
      subtitle="Gerencie as configurações do sistema"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <BlurOverlay className="p-5">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Informações da Escola</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nome da Escola
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <School size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 py-2 border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
                      defaultValue="Escola Estadual Maria da Silva"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 py-2 border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
                      defaultValue="contato@escolamaria.edu.br"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Telefone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      className="w-full pl-10 py-2 border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
                      defaultValue="(11) 3456-7890"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Endereço
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 py-2 border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
                      defaultValue="Rua das Flores, 123 - São Paulo"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Horário de Funcionamento
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 py-2 border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
                    defaultValue="Segunda a Sexta, 7h às 18h"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <Button className="w-full sm:w-auto bg-primary">Salvar Alterações</Button>
              </div>
            </div>
          </BlurOverlay>
          
          <BlurOverlay className="p-5">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Preferências do Sistema</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-slate-400" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">Notificações</h3>
                    <p className="text-xs text-slate-500">Receber notificações de eventos e atividades</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-2 border-t border-slate-200/70">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-slate-400" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">Autenticação em Dois Fatores</h3>
                    <p className="text-xs text-slate-500">Aumenta a segurança da sua conta</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-2 border-t border-slate-200/70">
                <div className="flex items-center gap-3">
                  <Briefcase size={20} className="text-slate-400" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">Modo de Manutenção</h3>
                    <p className="text-xs text-slate-500">Sistema disponível apenas para administradores</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </BlurOverlay>
        </div>
        
        <div className="space-y-6">
          <BlurOverlay className="p-5">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Informações da Conta</h2>
            
            <div className="flex flex-col items-center py-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-semibold">AD</span>
              </div>
              
              <h3 className="text-base font-medium text-slate-900">Admin</h3>
              <p className="text-sm text-slate-500">admin@escola.com</p>
              
              <div className="mt-4 w-full">
                <Button variant="outline" className="w-full">
                  Editar Perfil
                </Button>
              </div>
            </div>
          </BlurOverlay>
          
          <BlurOverlay className="p-5">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Versão do Sistema</h2>
            
            <div className="py-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Versão Atual</span>
                <span className="text-sm font-medium">1.0.0</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Última Atualização</span>
                <span className="text-sm font-medium">30/06/2023</span>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Verificar Atualizações
                </Button>
              </div>
            </div>
          </BlurOverlay>

          <SchoolSettings />
        </div>
      </div>
    </PageContainer>
  );
};

export default Settings;
