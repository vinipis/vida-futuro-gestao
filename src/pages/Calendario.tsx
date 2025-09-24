import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Plus,
  Clock,
  MapPin,
  Users,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Dias do mês anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Completar a grade com dias do próximo mês
    const totalCells = Math.ceil(days.length / 7) * 7;
    for (let i = days.length; i < totalCells; i++) {
      const nextDate = new Date(year, month + 1, i - days.length + 1);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getAulasForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return aulas.filter(aula => aula.data === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const selectedDateAulas = selectedDate ? getAulasForDate(selectedDate) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Calendário de Aulas</h1>
          <p className="text-muted-foreground mt-1">
            Programação e controle de aulas
          </p>
        </div>
        <Button className="bg-accent-pink hover:shadow-glow transition-all duration-300 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nova Aula
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth('prev')}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth('next')}
                  className="h-8 w-8"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const aulasCount = getAulasForDate(day.date).length;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day.date)}
                    className={`
                      p-2 text-sm min-h-[40px] rounded-md transition-all duration-200
                      ${!day.isCurrentMonth 
                        ? 'text-muted-foreground bg-muted/30' 
                        : 'text-foreground hover:bg-accent/50'
                      }
                      ${isToday(day.date) 
                        ? 'bg-primary text-primary-foreground font-bold' 
                        : ''
                      }
                      ${isSelected(day.date) 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : ''
                      }
                    `}
                  >
                    <div>{day.date.getDate()}</div>
                    {aulasCount > 0 && (
                      <div className="flex justify-center mt-1">
                        <div className="w-1.5 h-1.5 bg-accent-teal rounded-full"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Details */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary">
              {selectedDate 
                ? `Aulas - ${selectedDate.toLocaleDateString('pt-BR')}`
                : 'Selecione uma data'
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {selectedDateAulas.length > 0 ? (
                  selectedDateAulas.map((aula) => (
                    <div key={aula.id} className="p-3 border rounded-lg hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{aula.turma}</h4>
                        <Badge className="bg-success text-success-foreground">
                          Agendada
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {aula.horario}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {aula.sala}
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          {aula.professor}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {aula.alunos} alunos
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Nenhuma aula agendada para esta data
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Clique em uma data no calendário para ver as aulas
                </p>
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