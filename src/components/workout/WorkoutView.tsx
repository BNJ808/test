import React, { useState } from 'react';
import { WorkoutData } from '../../types';
import DayCard from './DayCard';

interface WorkoutViewProps {
  workoutData: WorkoutData;
  isEditMode: boolean;
  isAdvancedMode: boolean;
  onWorkoutDataChange: (data: WorkoutData) => void;
  onShowEditModal: (type: string, data: any) => void;
  onShowNotesModal: (dayId: string, categoryId: string, exerciseId: string) => void;
}

const WorkoutView: React.FC<WorkoutViewProps> = ({
  workoutData,
  isEditMode,
  isAdvancedMode,
  onWorkoutDataChange,
  onShowEditModal,
  onShowNotesModal
}) => {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());

  const toggleDay = (dayId: string) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dayId)) {
        newSet.delete(dayId);
      } else {
        newSet.add(dayId);
      }
      return newSet;
    });
  };

  const handleEditDay = (day: any) => {
    onShowEditModal('day', day);
  };

  const handleDeleteDay = (day: any) => {
    onShowEditModal('deleteDay', day);
  };

  const handleAddCategory = (dayId: string) => {
    onShowEditModal('addCategory', { dayId });
  };

  const handleEditCategory = (dayId: string, categoryId: string) => {
    const day = workoutData.days.find(d => d.id === dayId);
    const category = day?.categories.find(c => c.id === categoryId);
    onShowEditModal('category', { dayId, category });
  };

  const handleDeleteCategory = (dayId: string, categoryId: string) => {
    onShowEditModal('deleteCategory', { dayId, categoryId });
  };

  const handleAddExercise = (dayId: string, categoryId: string) => {
    onShowEditModal('addExercise', { dayId, categoryId });
  };

  const handleEditExercise = (dayId: string, categoryId: string, exerciseId: string) => {
    const day = workoutData.days.find(d => d.id === dayId);
    const category = day?.categories.find(c => c.id === categoryId);
    const exercise = category?.exercises.find(e => e.id === exerciseId);
    onShowEditModal('exercise', { dayId, categoryId, exercise });
  };

  const handleDeleteExercise = (dayId: string, categoryId: string, exerciseId: string) => {
    onShowEditModal('deleteExercise', { dayId, categoryId, exerciseId });
  };

  const handleExerciseSetChange = (dayId: string, categoryId: string, exerciseId: string, weight: number, reps: number) => {
    const updatedData = { ...workoutData };
    
    const day = updatedData.days.find(d => d.id === dayId);
    if (day) {
      const category = day.categories.find(c => c.id === categoryId);
      if (category) {
        const exercise = category.exercises.find(e => e.id === exerciseId);
        if (exercise) {
          exercise.sets.push({
            weight,
            reps,
            timestamp: new Date()
          });
        }
      }
    }
    
    onWorkoutDataChange(updatedData);
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {workoutData.days
        .sort((a, b) => a.order - b.order)
        .map(day => (
          <DayCard
            key={day.id}
            day={day}
            isExpanded={expandedDays.has(day.id)}
            onToggle={() => toggleDay(day.id)}
            isEditMode={isEditMode}
            isAdvancedMode={isAdvancedMode}
            onEditDay={handleEditDay}
            onDeleteDay={handleDeleteDay}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            onEditExercise={handleEditExercise}
            onDeleteExercise={handleDeleteExercise}
            onAddExercise={handleAddExercise}
            onExerciseSetChange={handleExerciseSetChange}
            onShowNotes={onShowNotesModal}
          />
        ))}
    </div>
  );
};

export default WorkoutView;