import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  Download,
  TrendingUp,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  PieChart,
  Activity
} from "lucide-react";

export default function Relatorios() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("2025-01");
  const [tipoRelatorio, setTipoRelatorio] = useState("todos");

  const relatoriosDisponiveis = [
    {
      id: "presenca",
      titulo: "Relatório de Presença",
      descricao: "Controle de frequência dos alunos por turma e período",
      icon: Activity,
      color: "bg-success"
    },
    {
      id: "volume-alunos",
      titulo: "Volume de Alunos",
      descricao: "Estatísticas de matrículas e alunos ativos",
      icon: Users,
      color: "bg-primary"
    },
    {
      id: "finalizacao-desistencia",
      titulo: "Finalização vs Desistências",
      descricao: "Análise de conclusão e evasão de cursos",
      icon: TrendingUp,
      color: "bg-warning"
    },
    {
      id: "turmas-ativas",
      titulo: "Turmas Ativas",
      descricao: "Resumo das turmas e suas informações",
      icon: GraduationCap,
      color: "bg-accent-teal"
    }
  ];

  // Mock data para demonstração
  const estatisticas = {
    totalAlunos: 245,
    alunosAtivos: 198,
    desistentes: 15,
    concluintes: 32,
    turmasAtivas: 16,
    professoresAtivos: 15,
    frequenciaMedia: 87.5,
    novasMatriculas: 42
  };

  const dadosPresenca = [
    { turma: "Cuidador de Idosos - Sala 1", presentes: 26, total: 28, percentual: 92.9 },
    { turma: "Cuidador de Idosos - Sala 2", presentes: 22, total: 24, percentual: 91.7 },
    { turma: "Cuidador de Idosos - Noturno", presentes: 17, total: 19, percentual: 89.5 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Relatórios</h1>
          <p className="text-muted-foreground mt-1">
            Análises e estatísticas do sistema
          </p>
        </div>
        <Button 
          className="bg-accent-pink hover:shadow-glow transition-all duration-300 text-white"
          onClick={() => alert('Funcionalidade de exportação será implementada')}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Dados
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Período
              </label>
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-01">Janeiro 2025</SelectItem>
                  <SelectItem value="2024-12">Dezembro 2024</SelectItem>
                  <SelectItem value="2024-11">Novembro 2024</SelectItem>
                  <SelectItem value="2024-10">Outubro 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Tipo de Relatório
              </label>
              <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os relatórios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os relatórios</SelectItem>
                  <SelectItem value="presenca">Presença</SelectItem>
                  <SelectItem value="volume">Volume de Alunos</SelectItem>
                  <SelectItem value="finalizacao">Finalização vs Desistência</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                className="w-full bg-gradient-primary"
                onClick={() => alert(`Gerando relatório ${tipoRelatorio} para ${periodoSelecionado}`)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total de Alunos</p>
                <p className="text-2xl font-bold">{estatisticas.totalAlunos}</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-success text-success-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Frequência Média</p>
                <p className="text-2xl font-bold">{estatisticas.frequenciaMedia}%</p>
              </div>
              <Activity className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-warning text-warning-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Concluintes</p>
                <p className="text-2xl font-bold">{estatisticas.concluintes}</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent-teal text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Novas Matrículas</p>
                <p className="text-2xl font-bold">{estatisticas.novasMatriculas}</p>
              </div>
              <GraduationCap className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Reports */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary">Relatórios Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatoriosDisponiveis.map((relatorio) => (
                <div
                  key={relatorio.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${relatorio.color} flex items-center justify-center`}>
                      <relatorio.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{relatorio.titulo}</h4>
                      <p className="text-sm text-muted-foreground">{relatorio.descricao}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => alert(`Visualizando ${relatorio.titulo}`)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => alert(`Baixando ${relatorio.titulo}`)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Details */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary">Presença por Turma - Janeiro 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dadosPresenca.map((turma, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{turma.turma}</span>
                    <span className="text-sm text-accent-teal font-bold">
                      {turma.presentes}/{turma.total} ({turma.percentual}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${turma.percentual}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">Resumo Executivo - Janeiro 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-success mb-2">
                {Math.round((estatisticas.concluintes / (estatisticas.concluintes + estatisticas.desistentes)) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Taxa de Conclusão</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-warning mb-2">
                {Math.round((estatisticas.desistentes / (estatisticas.concluintes + estatisticas.desistentes)) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Taxa de Evasão</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-accent-teal mb-2">
                {Math.round(estatisticas.totalAlunos / estatisticas.turmasAtivas)}
              </div>
              <div className="text-sm text-muted-foreground">Média por Turma</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-accent-pink mb-2">
                {Math.round((estatisticas.alunosAtivos / estatisticas.totalAlunos) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Alunos Ativos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}