import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  GraduationCap
} from "lucide-react";

export default function Alunos() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - será substituído pelos dados reais do Supabase
  const alunos = [
    {
      id: 1,
      nome: "Maria Silva Santos",
      cpf: "123.456.789-00",
      telefone: "(11) 99999-9999",
      email: "maria.santos@email.com",
      turmas: ["Cuidador de Idosos - Sala 1"],
      status: "ativo",
      dataMatricula: "2025-01-15"
    },
    {
      id: 2,
      nome: "João Oliveira Lima",
      cpf: "987.654.321-00", 
      telefone: "(11) 88888-8888",
      email: "joao.lima@email.com",
      turmas: ["Cuidador de Idosos - Sala 2"],
      status: "ativo",
      dataMatricula: "2025-01-20"
    },
    {
      id: 3,
      nome: "Ana Costa Pereira",
      cpf: "456.789.123-00",
      telefone: "(11) 77777-7777", 
      email: "ana.pereira@email.com",
      turmas: ["Cuidador de Idosos - Noturno"],
      status: "pendente",
      dataMatricula: "2025-01-25"
    },
  ];

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.cpf.includes(searchTerm) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-success text-success-foreground";
      case "pendente":
        return "bg-warning text-warning-foreground";
      case "inativo":
        return "bg-accent-gray text-white";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gestão de Alunos</h1>
          <p className="text-muted-foreground mt-1">
            Cadastro e controle de estudantes
          </p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Novo Aluno
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome, CPF ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="hover:bg-accent/50">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total de Alunos</p>
                <p className="text-2xl font-bold">245</p>
              </div>
              <UserCheck className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-success text-success-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Ativos</p>
                <p className="text-2xl font-bold">198</p>
              </div>
              <GraduationCap className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-warning text-warning-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pendentes</p>
                <p className="text-2xl font-bold">32</p>
              </div>
              <UserCheck className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent-gray text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Desistentes</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <UserCheck className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">Lista de Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlunos.map((aluno) => (
              <div
                key={aluno.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{aluno.nome}</h3>
                    <Badge className={getStatusColor(aluno.status)}>
                      {aluno.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <span>CPF: {aluno.cpf}</span>
                    <span>Tel: {aluno.telefone}</span>
                    <span>{aluno.email}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-accent-teal font-medium">
                      Turmas: {aluno.turmas.join(", ")}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="hover:bg-accent/50">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-accent/50">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}