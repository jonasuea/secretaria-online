
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import StudentGrades from "./pages/StudentGrades";
import ClassGrades from "./pages/ClassGrades";
import ClassFrequency from "./pages/ClassFrequency";
import Documents from "./pages/Documents";
import MeetingManager from "./pages/MeetingManager";
import Teachers from "./pages/Teachers";
import ManagementTeam from "./pages/ManagementTeam";
import StudentDetails from "./pages/StudentDetails";
import TeacherDetails from "./pages/TeacherDetails";
import ManagementTeamDetails from "./pages/ManagementTeamDetails";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import TabsNavigation from "./components/layout/TabsNavigation";
import { SidebarProvider } from "./hooks/use-sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen bg-background w-full">
            <Header />
            <Sidebar />
            <TabsNavigation />
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/:id" element={<StudentDetails />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/teachers/:id" element={<TeacherDetails />} />
              <Route path="/management-team" element={<ManagementTeam />} />
              <Route path="/management-team/:id" element={<ManagementTeamDetails />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/:id/grades" element={<ClassGrades />} />
              <Route path="/classes/:id/frequency" element={<ClassFrequency />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/grades" element={<StudentGrades />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/meetings" element={<MeetingManager />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
