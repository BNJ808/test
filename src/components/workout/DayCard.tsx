import React from 'react';
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { WorkoutDay } from '../../types';
import CategoryCard from './CategoryCard';
import Button from '../Button';

interface DayCardProps {
  day: WorkoutDay;
  isExpanded: boolean;
  onToggle: () => void;
  isEditMode: boolean;
  isAdvancedMode: boolean;
  onEditDay: (day: WorkoutDay) => void;
  onDeleteDay: (day: WorkoutDay) => void;
  onAddCategory: (dayId: string) => void;
  onEditCategory: (dayId: string, categoryId: string) => void;
  onDeleteCategory: (dayId: string, categoryId: string) => void;
  onEditExercise: (dayId: string, categoryId: string, exerciseId: string) => void;
  onDeleteExercise: (dayId: string, categoryId: string, exerciseId: string) => void;
  onAddExercise: (dayId: string, categoryId: string) => void;
  onExerciseSetChange: (dayId: string, categoryId: string, exerciseId: string, weight: number, reps: number) => void;
  onShowNotes: (dayId: string, categoryId: string, exerciseId: string) => void;
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  isExpanded,
  onToggle,
  isEditMode,
  isAdvancedMode,
  onEditDay,
  onDeleteDay,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onEditExercise,
  onDeleteExercise,
  onAddExercise,
  onExerciseSetChange,
  onShowNotes
}) => {
  const dayColors = [
    'from-blue-600 to-blue-700',
    'from-purple-600 to-purple-700',
    'from-green-600 to-green-700',
    'from-orange-600 to-orange-700',
    'from-red-600 to-red-700',
    'from-teal-600 to-teal-700',
    'from-pink-600 to-pink-700'
  ];

  const colorClass = dayColors[day.order % dayColors.length];

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div
        className={`bg-gradient-to-r ${colorClass} px-4 py-3 cursor-pointer`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isEditMode && (
              <GripVertical className="w-5 h-5 text-white/60" />
            )}
            <h3 className="text-lg font-semibold text-white">{day.name}</h3>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-white" />
            ) : (
              <ChevronRight className="w-5 h-5 text-white" />
            )}
          </div>
          
          {isEditMode && (
            <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                icon={Edit2}
                onClick={() => onEditDay(day)}
                className="text-white hover:bg-white/20"
              />
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                onClick={() => onDeleteDay(day)}
                className="text-white hover:bg-red-500/30"
              />
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {day.categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              dayId={day.id}
              isEditMode={isEditMode}
              isAdvancedMode={isAdvancedMode}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              onEditExercise={onEditExercise}
              onDeleteExercise={onDeleteExercise}
              onAddExercise={onAddExercise}
              onExerciseSetChange={onExerciseSetChange}
              onShowNotes={onShowNotes}
            />
          ))}

          {isEditMode && (
            <Button
              variant="ghost"
              icon={Plus}
              onClick={() => onAddCategory(day.id)}
              className="w-full border-2 border-dashed border-gray-600 hover:border-gray-500 py-3"
            >
              Ajouter une catégorie
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DayCard;