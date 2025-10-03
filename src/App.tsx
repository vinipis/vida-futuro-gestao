import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import Professores from "./pages/Professores"; 
import Turmas from "./pages/Turmas";
import Chamada from "./pages/Chamada";
import Calendario from "./pages/Calendario";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import Usuarios from "./pages/Usuarios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute allowedRoles={['admin', 'secretario', 'professor']}>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/alunos" element={
              <ProtectedRoute allowedRoles={['admin', 'secretario', 'professor']}>
                <Layout><Alunos /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/professores" element={
              <ProtectedRoute allowedRoles={['admin', 'secretario']}>
                <Layout><Professores /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/turmas" element={
              <ProtectedRoute allowedRoles={['admin', 'secretario', 'professor']}>
                <Layout><Turmas /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/chamada" element={
              <ProtectedRoute allowedRoles={['admin', 'secretario', 'professor']}>
                <Layout><Chamada /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/calendario" element={
              <ProtectedRoute allowedRoles={['admin', 'secretario', 'professor']}>
                <Layout><Calendario /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/relatorios" element={
              <ProtectedRoute allowedRoles={['admin', 'secretario']}>
                <Layout><Relatorios /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/configuracoes" element={
              <ProtectedRoute allowedRoles={['admin', 'secretario']}>
                <Layout><Configuracoes /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/usuarios" element={
              <ProtectedRoute allowedRoles={['admin', 'secretario']}>
                <Layout><Usuarios /></Layout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
