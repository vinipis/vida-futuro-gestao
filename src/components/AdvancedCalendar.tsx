import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check
} from "lucide-react";

interface AdvancedCalendarProps {
  onDateSelect?: (dates: Date[]) => void;
  selectedDates?: Date[];
  className?: string;
}

type SelectionMode = 'single' | 'range' | 'recurring' | 'multiple';

export default function AdvancedCalendar({ 
  onDateSelect, 
  selectedDates = [], 
  className = "" 
}: AdvancedCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('single');
  const [selectedDateSet, setSelectedDateSet] = useState<Set<string>>(
    new Set(selectedDates.map(date => date.toISOString().split('T')[0]))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);

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

  const isDateSelected = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return selectedDateSet.has(dateString);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = useCallback((date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const newSelectedDates = new Set(selectedDateSet);

    switch (selectionMode) {
      case 'single':
        newSelectedDates.clear();
        newSelectedDates.add(dateString);
        break;
      
      case 'multiple':
        if (newSelectedDates.has(dateString)) {
          newSelectedDates.delete(dateString);
        } else {
          newSelectedDates.add(dateString);
        }
        break;
      
      case 'recurring':
        // Selecionar todos os dias da semana no mês atual
        const dayOfWeek = date.getDay();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let i = 1; i <= daysInMonth; i++) {
          const testDate = new Date(year, month, i);
          if (testDate.getDay() === dayOfWeek) {
            const testDateString = testDate.toISOString().split('T')[0];
            if (newSelectedDates.has(testDateString)) {
              newSelectedDates.delete(testDateString);
            } else {
              newSelectedDates.add(testDateString);
            }
          }
        }
        break;
      
      default:
        break;
    }

    setSelectedDateSet(newSelectedDates);
    
    if (onDateSelect) {
      const dates = Array.from(newSelectedDates).map(dateStr => new Date(dateStr));
      onDateSelect(dates);
    }
  }, [selectionMode, selectedDateSet, currentDate, onDateSelect]);

  const handleMouseDown = (date: Date) => {
    if (selectionMode === 'range') {
      setIsDragging(true);
      setDragStart(date);
      handleDateClick(date);
    }
  };

  const handleMouseEnter = (date: Date) => {
    if (isDragging && dragStart && selectionMode === 'range') {
      const newSelectedDates = new Set<string>();
      
      const startTime = dragStart.getTime();
      const endTime = date.getTime();
      const minTime = Math.min(startTime, endTime);
      const maxTime = Math.max(startTime, endTime);
      
      // Selecionar todos os dias no intervalo
      for (let time = minTime; time <= maxTime; time += 24 * 60 * 60 * 1000) {
        const currentDate = new Date(time);
        newSelectedDates.add(currentDate.toISOString().split('T')[0]);
      }
      
      setSelectedDateSet(newSelectedDates);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
      
      if (onDateSelect) {
        const dates = Array.from(selectedDateSet).map(dateStr => new Date(dateStr));
        onDateSelect(dates);
      }
    }
  };

  const clearSelection = () => {
    setSelectedDateSet(new Set());
    setIsDragging(false);
    setDragStart(null);
    if (onDateSelect) {
      onDateSelect([]);
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const modeLabels = {
    single: 'Seleção Única',
    multiple: 'Múltiplas Datas',
    range: 'Intervalo (Arrastar)',
    recurring: 'Dias Recorrentes'
  };

  return (
    <Card className={`shadow-card ${className}`}>
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
        
        {/* Selection Mode Controls */}
        <div className="flex flex-wrap gap-2 mt-4">
          {(Object.keys(modeLabels) as SelectionMode[]).map((mode) => (
            <Button
              key={mode}
              variant={selectionMode === mode ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectionMode(mode)}
              className="text-xs"
            >
              {modeLabels[mode]}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={clearSelection}
            className="text-xs"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Limpar
          </Button>
        </div>

        {selectedDateSet.size > 0 && (
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {selectedDateSet.size} data{selectedDateSet.size > 1 ? 's' : ''} selecionada{selectedDateSet.size > 1 ? 's' : ''}
            </Badge>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div 
          ref={dragRef}
          className="grid grid-cols-7 gap-1 select-none"
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {days.map((day, index) => {
            const isSelected = isDateSelected(day.date);
            const isTodayDate = isToday(day.date);
            
            return (
              <button
                key={index}
                onMouseDown={() => handleMouseDown(day.date)}
                onMouseEnter={() => handleMouseEnter(day.date)}
                onClick={() => handleDateClick(day.date)}
                className={`
                  p-2 text-sm min-h-[40px] rounded-md transition-all duration-200 relative
                  ${!day.isCurrentMonth 
                    ? 'text-muted-foreground bg-muted/30' 
                    : 'text-foreground hover:bg-accent/50'
                  }
                  ${isTodayDate 
                    ? 'bg-primary text-primary-foreground font-bold' 
                    : ''
                  }
                  ${isSelected 
                    ? 'bg-accent-teal text-white font-bold ring-2 ring-accent-teal ring-offset-1' 
                    : ''
                  }
                  ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}
                `}
              >
                <div className="flex flex-col items-center">
                  <span>{day.date.getDate()}</span>
                  {isSelected && (
                    <Check className="w-3 h-3 mt-0.5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-4 text-xs text-muted-foreground">
          <p><strong>Seleção Única:</strong> Clique em uma data</p>
          <p><strong>Múltiplas Datas:</strong> Clique em várias datas individuais</p>
          <p><strong>Intervalo:</strong> Arraste do primeiro ao último dia</p>
          <p><strong>Dias Recorrentes:</strong> Clique em um dia para selecionar todos os dias da semana</p>
        </div>
      </CardContent>
    </Card>
  );
}