import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total de Alunos",
      value: "245",
      change: "+12 este mês",
      icon: Users,
      color: "bg-gradient-primary",
    },
    {
      title: "Professores Ativos",
      value: "18",
      change: "3 novas contratações",
      icon: GraduationCap,
      color: "bg-gradient-secondary",
    },
    {
      title: "Turmas Ativas",
      value: "24",
      change: "Cuidador de Idosos",
      icon: BookOpen,
      color: "bg-accent-teal",
    },
    {
      title: "Aulas Hoje",
      value: "8",
      change: "6 concluídas",
      icon: Calendar,
      color: "bg-accent-pink",
    },
  ];

  const recentActivities = [
    {
      type: "success",
      message: "Nova turma 'Cuidador de Idosos - Sala 3' criada",
      time: "2 horas atrás",
    },
    {
      type: "info",
      message: "15 alunos registraram presença na turma manhã",
      time: "3 horas atrás",
    },
    {
      type: "warning",
      message: "Professor João Silva marcou falta",
      time: "5 horas atrás",
    },
    {
      type: "success",
      message: "Relatório mensal de presença gerado",
      time: "1 dia atrás",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-accent-teal" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do sistema de secretaria
          </p>
        </div>
        <Button 
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          onClick={() => window.location.href = '/relatorios'}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Gerar Relatório
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-primary/5 hover:border-primary"
              onClick={() => window.location.href = '/alunos'}
            >
              <Users className="w-4 h-4 mr-2" />
              Cadastrar Novo Aluno
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-secondary/5 hover:border-secondary"
              onClick={() => window.location.href = '/professores'}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Registrar Professor
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-accent-teal/5 hover:border-accent-teal"
              onClick={() => window.location.href = '/turmas'}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Criar Nova Turma
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-accent-pink/5 hover:border-accent-pink"
              onClick={() => window.location.href = '/chamada'}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Fazer Chamada
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Turmas em Destaque */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">Turmas em Andamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { nome: "Cuidador de Idosos - Sala 1", periodo: "2025/01", alunos: 28, status: "ativo" },
              { nome: "Cuidador de Idosos - Sala 2", periodo: "2025/01", alunos: 24, status: "ativo" },
              { nome: "Cuidador de Idosos - Noturno", periodo: "2025/01", alunos: 19, status: "iniciando" },
            ].map((turma, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-foreground">{turma.nome}</h4>
                  <Badge 
                    variant={turma.status === "ativo" ? "default" : "secondary"}
                    className={turma.status === "ativo" ? "bg-success" : "bg-warning"}
                  >
                    {turma.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Período: {turma.periodo}</p>
                <p className="text-sm text-accent-teal font-medium">{turma.alunos} alunos</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}