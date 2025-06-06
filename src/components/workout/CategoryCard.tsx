import React from 'react';
import { Edit2, Trash2, Plus, GripVertical } from 'lucide-react';
import { Category } from '../../types';
import ExerciseCard from './ExerciseCard';
import Button from '../Button';

interface CategoryCardProps {
  category: Category;
  dayId: string;
  isEditMode: boolean;
  isAdvancedMode: boolean;
  onEditCategory: (dayId: string, categoryId: string) => void;
  onDeleteCategory: (dayId: string, categoryId: string) => void;
  onEditExercise: (dayId: string, categoryId: string, exerciseId: string) => void;
  onDeleteExercise: (dayId: string, categoryId: string, exerciseId: string) => void;
  onAddExercise: (dayId: string, categoryId: string) => void;
  onExerciseSetChange: (dayId: string, categoryId: string, exerciseId: string, weight: number, reps: number) => void;
  onShowNotes: (dayId: string, categoryId: string, exerciseId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  dayId,
  isEditMode,
  isAdvancedMode,
  onEditCategory,
  onDeleteCategory,
  onEditExercise,
  onDeleteExercise,
  onAddExercise,
  onExerciseSetChange,
  onShowNotes
}) => {
  if (category.isDeleted && !isEditMode) return null;

  const borderClass = category.isDeleted ? 'border-red-500' : 'border-gray-700';

  return (
    <div className={`bg-gray-750 rounded-lg border ${borderClass} p-4`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {isEditMode && (
            <GripVertical className="w-4 h-4 text-gray-500" />
          )}
          <h4 className={`font-medium ${category.isDeleted ? 'text-red-400 line-through' : 'text-gray-200'}`}>
            {category.name}
          </h4>
        </div>

        {isEditMode && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              icon={Edit2}
              onClick={() => onEditCategory(dayId, category.id)}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={() => onDeleteCategory(dayId, category.id)}
              className="text-red-400 hover:text-red-300"
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        {category.exercises
          .filter(exercise => !exercise.isDeleted || isEditMode)
          .map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              dayId={dayId}
              categoryId={category.id}
              isEditMode={isEditMode}
              isAdvancedMode={isAdvancedMode}
              onEditExercise={onEditExercise}
              onDeleteExercise={onDeleteExercise}
              onSetChange={onExerciseSetChange}
              onShowNotes={onShowNotes}
            />
          ))}

        {isEditMode && !category.isDeleted && (
          <Button
            variant="ghost"
            size="sm"
            icon={Plus}
            onClick={() => onAddExercise(dayId, category.id)}
            className="w-full border border-dashed border-gray-600 hover:border-gray-500 py-2"
          >
            Ajouter un exercice
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;