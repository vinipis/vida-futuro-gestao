import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdvancedCalendar from "@/components/AdvancedCalendar";
import { 
  Calendar as CalendarIcon, 
  Plus,
  Clock,
  MapPin,
  Users,
  GraduationCap,
  CheckCircle
} from "lucide-react";

export default function Calendario() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Mock data - será substituído pelos dados reais do Supabase
  const aulas = [
    {
      id: 1,
      turma: "Cuidador de Idosos - Sala 1",
      professor: "Prof. Carlos Eduardo Silva",
      horario: "08:00 - 12:00",
      sala: "Sala 1",
      data: "2025-01-27",
      status: "agendada",
      alunos: 28
    },
    {
      id: 2,
      turma: "Cuidador de Idosos - Sala 2", 
      professor: "Prof. Carlos Eduardo Silva",
      horario: "14:00 - 18:00",
      sala: "Sala 2",
      data: "2025-01-27",
      status: "agendada",
      alunos: 24
    },
    {
      id: 3,
      turma: "Cuidador de Idosos - Noturno",
      professor: "Prof. Ana Paula Santos",
      horario: "19:00 - 23:00",
      sala: "Sala 3",
      data: "2025-01-27",
      status: "agendada",
      alunos: 19
    },
    {
      id: 4,
      turma: "Cuidador de Idosos - Sala 1",
      professor: "Prof. Carlos Eduardo Silva",
      horario: "08:00 - 12:00",
      sala: "Sala 1",
      data: "2025-01-28",
      status: "agendada",
      alunos: 28
    },
  ];

  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  const handleCreateClasses = () => {
    if (selectedDates.length === 0) {
      alert('Selecione pelo menos uma data no calendário');
      return;
    }
    
    const dateStrings = selectedDates.map(date => 
      date.toLocaleDateString('pt-BR')
    ).join(', ');
    
    alert(`Criando aulas para as datas selecionadas:\n${dateStrings}\n\nFuncionalidade completa será implementada em breve.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Calendário de Aulas</h1>
          <p className="text-muted-foreground mt-1">
            Programação e controle de aulas com seleção avançada
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-success hover:shadow-glow transition-all duration-300 text-white"
            onClick={handleCreateClasses}
            disabled={selectedDates.length === 0}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Criar Aulas ({selectedDates.length})
          </Button>
          <Button 
            className="bg-accent-pink hover:shadow-glow transition-all duration-300 text-white"
            onClick={() => alert('Funcionalidade de nova aula será implementada')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Aula
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Advanced Calendar */}
        <div className="lg:col-span-2">
          <AdvancedCalendar 
            onDateSelect={handleDateSelect}
            selectedDates={selectedDates}
          />
        </div>

        {/* Selected Dates Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary">
              Datas Selecionadas ({selectedDates.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDates.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedDates
                  .sort((a, b) => a.getTime() - b.getTime())
                  .map((date, index) => (
                    <div key={index} className="p-2 bg-muted/30 rounded-md text-sm">
                      <span className="font-medium text-foreground">
                        {date.toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                  Use os controles do calendário para selecionar datas:
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• <strong>Seleção Única:</strong> Uma data</li>
                  <li>• <strong>Múltiplas:</strong> Várias datas</li>
                  <li>• <strong>Intervalo:</strong> Arraste para selecionar período</li>
                  <li>• <strong>Recorrentes:</strong> Todos os dias da semana</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Today's Classes */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">Aulas de Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aulas
              .filter(aula => {
                const today = new Date().toISOString().split('T')[0];
                return aula.data === today;
              })
              .map((aula) => (
                <div key={aula.id} className="p-4 border rounded-lg hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{aula.turma}</h4>
                    <Badge className="bg-accent-teal text-white">
                      {aula.horario}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {aula.sala}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      {aula.professor}
                    </div>
                    <div className="flex items-center gap-2 text-accent-pink font-medium">
                      <Users className="w-4 h-4" />
                      {aula.alunos} alunos
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