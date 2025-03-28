
import * as React from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleSidebar = React.useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeSidebar = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  
  const openSidebar = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const value = React.useMemo(() => ({
    isOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar
  }), [isOpen, toggleSidebar, closeSidebar, openSidebar]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
