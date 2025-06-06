import React, { useState, useMemo } from 'react';
import { Search, Eye, EyeOff, BarChart3, Sparkles, RotateCcw } from 'lucide-react';
import { WorkoutData, ExerciseHistory } from '../../types';
import { findPersonalRecord } from '../../utils/calculations';
import Button from '../Button';

interface HistoryViewProps {
  workoutData: WorkoutData;
  isAdvancedMode: boolean;
  onShowChart: (exerciseName: string, history: ExerciseHistory) => void;
  onShowAIAnalysis: (exerciseName: string, history: ExerciseHistory) => void;
  onShowNotes: (exerciseName: string) => void;
  onRestoreExercise: (exerciseName: string) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({
  workoutData,
  isAdvancedMode,
  onShowChart,
  onShowAIAnalysis,
  onShowNotes,
  onRestoreExercise
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);

  const exerciseHistory = useMemo((): ExerciseHistory[] => {
    const historyMap = new Map<string, ExerciseHistory>();

    for (const day of workoutData.days) {
      for (const category of day.categories) {
        for (const exercise of category.exercises) {
          if (!historyMap.has(exercise.name)) {
            historyMap.set(exercise.name, {
              exerciseName: exercise.name,
              sessions: [],
              isDeleted: exercise.isDeleted
            } as any);
          }

          const history = historyMap.get(exercise.name)!;
          
          if (exercise.sets.length > 0) {
            history.sessions.push({
              date: new Date(),
              sets: exercise.sets
            });
          }

          // Update deleted status
          if (exercise.isDeleted) {
            (history as any).isDeleted = true;
          }
        }
      }
    }

    // Calculate personal records and last sessions
    for (const history of historyMap.values()) {
      if (history.sessions.length > 0) {
        history.personalRecord = findPersonalRecord(history.sessions) || undefined;
        history.lastSession = history.sessions[history.sessions.length - 1];
      }
    }

    return Array.from(historyMap.values());
  }, [workoutData]);

  const filteredHistory = useMemo(() => {
    return exerciseHistory.filter(history => {
      const matchesSearch = history.exerciseName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDeleted = showDeleted || !(history as any).isDeleted;
      return matchesSearch && matchesDeleted;
    });
  }, [exerciseHistory, searchTerm, showDeleted]);

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Historique des Exercices</h2>
        
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un exercice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={showDeleted ? 'primary' : 'ghost'}
              size="sm"
              icon={showDeleted ? Eye : EyeOff}
              onClick={() => setShowDeleted(!showDeleted)}
            >
              Afficher supprimés
            </Button>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-4">
        {filteredHistory.map(history => {
          const isDeleted = (history as any).isDeleted;
          
          return (
            <div
              key={history.exerciseName}
              className={`bg-gray-800 rounded-lg p-4 border ${
                isDeleted ? 'border-red-500 bg-red-900/20' : 'border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-lg font-semibold ${
                  isDeleted ? 'text-red-400 line-through' : 'text-white'
                }`}>
                  {history.exerciseName}
                </h3>
                
                <div className="flex items-center space-x-2">
                  {isDeleted && (
                    <Button
                      variant="success"
                      size="sm"
                      icon={RotateCcw}
                      onClick={() => onRestoreExercise(history.exerciseName)}
                    >
                      Restaurer
                    </Button>
                  )}
                  
                  {!isDeleted && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={BarChart3}
                        onClick={() => onShowChart(history.exerciseName, history)}
                      />
                      {isAdvancedMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Sparkles}
                          onClick={() => onShowAIAnalysis(history.exerciseName, history)}
                          className="text-cyan-400 hover:text-cyan-300"
                        />
                      )}
                    </>
                  )}
                </div>
              </div>

              {history.lastSession && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Dernière série</p>
                    <div className="flex flex-wrap gap-1">
                      {history.lastSession.sets.slice(-3).map((set, index) => (
                        <span key={index} className="bg-gray-700 rounded px-2 py-1 text-xs">
                          {set.weight}kg × {set.reps}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {isAdvancedMode && history.personalRecord && (
                    <div>
                      <p className="text-gray-400">Record Personnel</p>
                      <div className="flex items-center space-x-2">
                        <span className="bg-yellow-600 rounded px-2 py-1 text-xs font-bold">
                          {history.personalRecord.weight}kg × {history.personalRecord.reps}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {history.personalRecord.date.toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!history.lastSession && (
                <p className="text-gray-500 text-sm">Aucune donnée disponible</p>
              )}
            </div>
          );
        })}

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Aucun exercice trouvé</p>
            <p className="text-gray-500 text-sm mt-2">
              {searchTerm ? 'Essayez avec un autre terme de recherche' : 'Commencez par créer des exercices'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;