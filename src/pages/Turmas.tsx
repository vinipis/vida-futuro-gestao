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
  BookOpen,
  Users,
  Calendar,
  GraduationCap,
  Clock
} from "lucide-react";

export default function Turmas() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - será substituído pelos dados reais do Supabase
  const turmas = [
    {
      id: 1,
      nome: "Cuidador de Idosos - Sala 1",
      codigo: "CI-S1-2025/01",
      periodo: "2025/01",
      curso: "Cuidador de Idosos",
      professor: "Prof. Carlos Eduardo Silva",
      totalAlunos: 28,
      alunosAtivos: 26,
      cargaHoraria: "200h",
      dataInicio: "2025-01-15",
      dataFim: "2025-06-15",
      horario: "08:00 - 12:00",
      dias: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
      status: "ativo",
      sala: "Sala 1"
    },
    {
      id: 2,
      nome: "Cuidador de Idosos - Sala 2",
      codigo: "CI-S2-2025/01",
      periodo: "2025/01",
      curso: "Cuidador de Idosos",
      professor: "Prof. Carlos Eduardo Silva",
      totalAlunos: 24,
      alunosAtivos: 24,
      cargaHoraria: "200h",
      dataInicio: "2025-01-15",
      dataFim: "2025-06-15",
      horario: "14:00 - 18:00",
      dias: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
      status: "ativo",
      sala: "Sala 2"
    },
    {
      id: 3,
      nome: "Cuidador de Idosos - Noturno",
      codigo: "CI-NOT-2025/01",
      periodo: "2025/01",
      curso: "Cuidador de Idosos",
      professor: "Prof. Ana Paula Santos",
      totalAlunos: 19,
      alunosAtivos: 18,
      cargaHoraria: "200h",
      dataInicio: "2025-01-20",
      dataFim: "2025-06-20",
      horario: "19:00 - 23:00",
      dias: ["Segunda", "Terça", "Quarta", "Quinta"],
      status: "ativo",
      sala: "Sala 3"
    },
    {
      id: 4,
      nome: "Cuidador de Idosos - Fevereiro",
      codigo: "CI-FEV-2025/02",
      periodo: "2025/02",
      curso: "Cuidador de Idosos",
      professor: "A definir",
      totalAlunos: 0,
      alunosAtivos: 0,
      cargaHoraria: "200h",
      dataInicio: "2025-02-10",
      dataFim: "2025-07-10",
      horario: "08:00 - 12:00",
      dias: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
      status: "planejada",
      sala: "Sala 1"
    },
  ];

  const filteredTurmas = turmas.filter(turma =>
    turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turma.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turma.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turma.professor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-success text-success-foreground";
      case "planejada":
        return "bg-warning text-warning-foreground";
      case "concluida":
        return "bg-accent-teal text-white";
      case "cancelada":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ativo":
        return "Em Andamento";
      case "planejada":
        return "Planejada";
      case "concluida":
        return "Concluída";
      case "cancelada":
        return "Cancelada";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gestão de Turmas</h1>
          <p className="text-muted-foreground mt-1">
            Controle de turmas e classes do projeto
          </p>
        </div>
        <Button className="bg-accent-teal hover:shadow-glow transition-all duration-300 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nova Turma
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome, código, curso ou professor..."
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
        <Card className="bg-accent-teal text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total de Turmas</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <BookOpen className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-success text-success-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Em Andamento</p>
                <p className="text-2xl font-bold">16</p>
              </div>
              <GraduationCap className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-warning text-warning-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Planejadas</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total de Alunos</p>
                <p className="text-2xl font-bold">245</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">Lista de Turmas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTurmas.map((turma) => (
              <div
                key={turma.id}
                className="p-4 border rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{turma.nome}</h3>
                      <Badge className={getStatusColor(turma.status)}>
                        {getStatusText(turma.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Código: {turma.codigo} | Período: {turma.periodo}
                    </p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Professor:</span>
                    <p className="font-medium text-primary">{turma.professor}</p>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Alunos:</span>
                    <p className="font-medium text-success">
                      {turma.alunosAtivos}/{turma.totalAlunos} ativos
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Horário:</span>
                    <p className="font-medium text-accent-teal">{turma.horario}</p>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Sala:</span>
                    <p className="font-medium text-accent-pink">{turma.sala}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <div className="flex flex-wrap gap-4 items-center text-sm">
                    <span className="text-muted-foreground">
                      Dias: <strong>{turma.dias.join(", ")}</strong>
                    </span>
                    <span className="text-muted-foreground">
                      Período: <strong>{turma.dataInicio} a {turma.dataFim}</strong>
                    </span>
                    <span className="text-muted-foreground">
                      Carga: <strong>{turma.cargaHoraria}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}