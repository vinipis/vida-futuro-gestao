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
  GraduationCap,
  BookOpen,
  Clock,
  Award
} from "lucide-react";

export default function Professores() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - será substituído pelos dados reais do Supabase
  const professores = [
    {
      id: 1,
      nome: "Prof. Carlos Eduardo Silva",
      cpf: "111.222.333-44",
      telefone: "(11) 91234-5678",
      email: "carlos.silva@vidaefuturo.org",
      especialidade: "Cuidados com Idosos",
      turmas: ["Cuidador de Idosos - Sala 1", "Cuidador de Idosos - Sala 2"],
      status: "ativo",
      dataContratacao: "2024-08-15",
      carga_horaria: "40h/semana"
    },
    {
      id: 2,
      nome: "Prof. Ana Paula Santos",
      cpf: "555.666.777-88",
      telefone: "(11) 99876-5432",
      email: "ana.santos@vidaefuturo.org",
      especialidade: "Enfermagem Geriátrica",
      turmas: ["Cuidador de Idosos - Noturno"],
      status: "ativo",
      dataContratacao: "2024-09-01",
      carga_horaria: "30h/semana"
    },
    {
      id: 3,
      nome: "Prof. Roberto Lima",
      cpf: "999.888.777-66",
      telefone: "(11) 95555-4444",
      email: "roberto.lima@vidaefuturo.org",
      especialidade: "Primeiros Socorros",
      turmas: [],
      status: "licenca",
      dataContratacao: "2024-06-10",
      carga_horaria: "20h/semana"
    },
  ];

  const filteredProfessores = professores.filter(professor =>
    professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.cpf.includes(searchTerm) ||
    professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-success text-success-foreground";
      case "licenca":
        return "bg-warning text-warning-foreground";
      case "inativo":
        return "bg-accent-gray text-white";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo";
      case "licenca":
        return "Em Licença";
      case "inativo":
        return "Inativo";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gestão de Professores</h1>
          <p className="text-muted-foreground mt-1">
            Cadastro e controle do corpo docente
          </p>
        </div>
        <Button className="bg-gradient-secondary hover:shadow-glow transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Novo Professor
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome, CPF, email ou especialidade..."
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
        <Card className="bg-gradient-secondary text-secondary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total de Professores</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <GraduationCap className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-success text-success-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Ativos</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <Award className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-warning text-warning-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Em Licença</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Clock className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent-teal text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Turmas Ativas</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <BookOpen className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">Lista de Professores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProfessores.map((professor) => (
              <div
                key={professor.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{professor.nome}</h3>
                    <Badge className={getStatusColor(professor.status)}>
                      {getStatusText(professor.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                    <span>CPF: {professor.cpf}</span>
                    <span>Tel: {professor.telefone}</span>
                    <span>{professor.email}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <span className="text-accent-pink font-medium">
                      Especialidade: {professor.especialidade}
                    </span>
                    <span className="text-accent-teal font-medium">
                      Carga Horária: {professor.carga_horaria}
                    </span>
                  </div>
                  
                  {professor.turmas.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm text-primary font-medium">
                        Turmas: {professor.turmas.join(", ")}
                      </span>
                    </div>
                  )}
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