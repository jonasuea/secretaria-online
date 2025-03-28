
import React, { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useSidebar } from '../../../src/hooks/use-sidebar';

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <header className="w-full h-16 flex items-center justify-between px-4 md:px-6 bg-white/90 backdrop-blur-md border-b border-slate-200/70 z-20 fixed top-0 left-0 right-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 button-effect md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-slate-700" />
        </button>
        <h1 className="text-xl font-semibold text-slate-900 hidden md:block md:ml-6">Escola Data Muse</h1>
      </div>
      
      <div className={`relative max-w-md w-full mx-4 transition-all duration-300 ease-in-out ${searchFocused ? 'scale-105' : ''}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full py-2 pl-10 pr-4 rounded-lg bg-slate-100/80 border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-all duration-300"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors relative button-effect">
          <Bell size={20} className="text-slate-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center ml-2 button-effect">
          <span className="font-medium text-sm">AD</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
