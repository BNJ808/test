import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, FileText, GripVertical, Trophy, Plus } from 'lucide-react';
import { Exercise } from '../../types';
import { calculate1RM } from '../../utils/calculations';
import Button from '../Button';

interface ExerciseCardProps {
  exercise: Exercise;
  dayId: string;
  categoryId: string;
  isEditMode: boolean;
  isAdvancedMode: boolean;
  onEditExercise: (dayId: string, categoryId: string, exerciseId: string) => void;
  onDeleteExercise: (dayId: string, categoryId: string, exerciseId: string) => void;
  onSetChange: (dayId: string, categoryId: string, exerciseId: string, weight: number, reps: number) => void;
  onShowNotes: (dayId: string, categoryId: string, exerciseId: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  dayId,
  categoryId,
  isEditMode,
  isAdvancedMode,
  onEditExercise,
  onDeleteExercise,
  onSetChange,
  onShowNotes
}) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [isFlashing, setIsFlashing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const borderClass = exercise.isDeleted ? 'border-red-500' : 'border-blue-500';
  const bgClass = exercise.isDeleted ? 'bg-red-900/20' : 'bg-gray-700';

  const lastSet = exercise.sets[exercise.sets.length - 1];
  const maxWeight = exercise.sets.reduce((max, set) => Math.max(max, set.weight), 0);
  const isPersonalRecord = lastSet && lastSet.weight === maxWeight && maxWeight > 0;

  const handleAddSet = () => {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);

    if (weightNum > 0 && repsNum > 0) {
      onSetChange(dayId, categoryId, exercise.id, weightNum, repsNum);
      setWeight('');
      setReps('');
      setShowAddForm(false);
      
      // Flash animation
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSet();
    }
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    // Auto-focus on weight input after form appears
    setTimeout(() => {
      const weightInput = document.querySelector(`#weight-${exercise.id}`) as HTMLInputElement;
      if (weightInput) {
        weightInput.focus();
      }
    }, 100);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setWeight('');
    setReps('');
  };

  return (
    <div className={`${bgClass} rounded-lg border ${borderClass} p-3 transition-all duration-300 ${
      isFlashing ? 'ring-2 ring-blue-400 bg-blue-900/30' : ''
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {isEditMode && (
            <GripVertical className="w-4 h-4 text-gray-500" />
          )}
          <h5 className={`font-medium ${exercise.isDeleted ? 'text-red-400 line-through' : 'text-gray-200'}`}>
            {exercise.name}
          </h5>
          {isAdvancedMode && isPersonalRecord && (
            <div className="flex items-center space-x-1 text-yellow-400">
              <Trophy className="w-4 h-4" />
              <span className="text-xs font-bold">PB!</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={FileText}
            onClick={() => onShowNotes(dayId, categoryId, exercise.id)}
            className="text-gray-400 hover:text-gray-300"
          />
          {isEditMode && (
            <>
              <Button
                variant="ghost"
                size="sm"
                icon={Edit2}
                onClick={() => onEditExercise(dayId, categoryId, exercise.id)}
              />
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                onClick={() => onDeleteExercise(dayId, categoryId, exercise.id)}
                className="text-red-400 hover:text-red-300"
              />
            </>
          )}
        </div>
      </div>

      {/* Sets History */}
      {exercise.sets.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {exercise.sets.map((set, index) => (
              <div key={index} className="bg-gray-600 rounded px-2 py-1 text-xs">
                <span className="text-white font-bold">{set.weight}kg</span>
                <span className="text-gray-300 mx-1">×</span>
                <span className="text-gray-300">{set.reps}</span>
                {isAdvancedMode && (
                  <span className="text-blue-300 ml-1">
                    (1RM: {calculate1RM(set.weight, set.reps)}kg)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Set Button or Form */}
      {!exercise.isDeleted && (
        <div>
          {!showAddForm ? (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={handleShowAddForm}
              className="w-full"
            >
              Ajouter une série
            </Button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  id={`weight-${exercise.id}`}
                  type="number"
                  placeholder="Poids (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-20 bg-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddSet}
                  disabled={!weight || !reps}
                  className="flex-1"
                >
                  Confirmer
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelAdd}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;