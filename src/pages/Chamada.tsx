import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ClipboardCheck, 
  Save,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck
} from "lucide-react";

export default function Chamada() {
  const [turmaSelected, setTurmaSelected] = useState("");
  const [dataAula, setDataAula] = useState(new Date().toISOString().split('T')[0]);

  // Mock data - será substituído pelos dados reais do Supabase
  const turmas = [
    { id: "1", nome: "Cuidador de Idosos - Sala 1", periodo: "2025/01" },
    { id: "2", nome: "Cuidador de Idosos - Sala 2", periodo: "2025/01" },
    { id: "3", nome: "Cuidador de Idosos - Noturno", periodo: "2025/01" },
  ];

  const [alunos] = useState([
    { id: 1, nome: "Maria Silva Santos", presente: true },
    { id: 2, nome: "João Oliveira Lima", presente: true },
    { id: 3, nome: "Ana Costa Pereira", presente: false },
    { id: 4, nome: "Carlos Eduardo Santos", presente: true },
    { id: 5, nome: "Fernanda Lima Costa", presente: false },
    { id: 6, nome: "Ricardo Pereira Silva", presente: true },
    { id: 7, nome: "Juliana Santos Oliveira", presente: true },
    { id: 8, nome: "Paulo Lima Santos", presente: true },
  ]);

  const [presencas, setPresencas] = useState(
    alunos.reduce((acc, aluno) => {
      acc[aluno.id] = aluno.presente;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const handlePresencaChange = (alunoId: number, presente: boolean) => {
    setPresencas(prev => ({
      ...prev,
      [alunoId]: presente
    }));
  };

  const marcarTodosPresentes = () => {
    const todasPresencas = alunos.reduce((acc, aluno) => {
      acc[aluno.id] = true;
      return acc;
    }, {} as Record<number, boolean>);
    setPresencas(todasPresencas);
  };

  const marcarTodosFaltas = () => {
    const todasFaltas = alunos.reduce((acc, aluno) => {
      acc[aluno.id] = false;
      return acc;
    }, {} as Record<number, boolean>);
    setPresencas(todasFaltas);
  };

  const totalPresentes = Object.values(presencas).filter(Boolean).length;
  const totalFaltas = alunos.length - totalPresentes;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Sistema de Chamada</h1>
          <p className="text-muted-foreground mt-1">
            Controle de presença dos alunos
          </p>
        </div>
        <Button className="bg-success hover:shadow-glow transition-all duration-300 text-success-foreground">
          <Save className="w-4 h-4 mr-2" />
          Salvar Chamada
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Selecionar Turma
              </label>
              <Select value={turmaSelected} onValueChange={setTurmaSelected}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha uma turma" />
                </SelectTrigger>
                <SelectContent>
                  {turmas.map((turma) => (
                    <SelectItem key={turma.id} value={turma.id}>
                      {turma.nome} - {turma.periodo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Data da Aula
              </label>
              <input
                type="date"
                value={dataAula}
                onChange={(e) => setDataAula(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={marcarTodosPresentes} variant="outline" className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Todos Presentes
              </Button>
              <Button onClick={marcarTodosFaltas} variant="outline" className="flex-1">
                <XCircle className="w-4 h-4 mr-2" />
                Todas Faltas
              </Button>
            </div>
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
                <p className="text-2xl font-bold">{alunos.length}</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-success text-success-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Presentes</p>
                <p className="text-2xl font-bold">{totalPresentes}</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-destructive text-destructive-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Faltas</p>
                <p className="text-2xl font-bold">{totalFaltas}</p>
              </div>
              <XCircle className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent-teal text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Frequência</p>
                <p className="text-2xl font-bold">
                  {alunos.length > 0 ? Math.round((totalPresentes / alunos.length) * 100) : 0}%
                </p>
              </div>
              <UserCheck className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance List */}
      {turmaSelected && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5" />
              Lista de Presença - {turmas.find(t => t.id === turmaSelected)?.nome}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Data: {new Date(dataAula).toLocaleDateString('pt-BR')}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alunos.map((aluno) => (
                <div
                  key={aluno.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                    presencas[aluno.id] 
                      ? 'bg-success/5 border-success/20' 
                      : 'bg-destructive/5 border-destructive/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={presencas[aluno.id]}
                      onCheckedChange={(checked) => 
                        handlePresencaChange(aluno.id, checked as boolean)
                      }
                      className="w-5 h-5"
                    />
                    <div>
                      <h3 className="font-medium text-foreground">{aluno.nome}</h3>
                      <p className="text-sm text-muted-foreground">ID: {aluno.id.toString().padStart(3, '0')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={
                        presencas[aluno.id] 
                          ? "bg-success text-success-foreground" 
                          : "bg-destructive text-destructive-foreground"
                      }
                    >
                      {presencas[aluno.id] ? "Presente" : "Falta"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!turmaSelected && (
        <Card className="shadow-card">
          <CardContent className="pt-12 pb-12 text-center">
            <ClipboardCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Selecione uma turma para fazer a chamada
            </h3>
            <p className="text-muted-foreground">
              Escolha a turma e a data para registrar a presença dos alunos
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}