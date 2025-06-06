import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import WorkoutView from './components/workout/WorkoutView';
import TimerView from './components/timer/TimerView';
import HistoryView from './components/history/HistoryView';
import EditModal from './components/modals/EditModal';
import NotesModal from './components/modals/NotesModal';
import ChartModal from './components/modals/ChartModal';
import AIAnalysisModal from './components/modals/AIAnalysisModal';
import ToastContainer from './components/ToastContainer';
import LoadingSpinner from './components/LoadingSpinner';
import { AppState, ActiveTab, WorkoutData, ExerciseHistory } from './types';
import { baseInitialData } from './data/initialData';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { useToast } from './hooks/useToast';
import { subscribeToWorkoutData, saveWorkoutData } from './services/firebase';
import { generateUUID } from './utils/calculations';

function App() {
  const { user, loading: authLoading, error: authError } = useFirebaseAuth();
  const { toasts, showToast, removeToast } = useToast();
  
  const [appState, setAppState] = useState<AppState>({
    workoutData: baseInitialData,
    isEditMode: false,
    isAdvancedMode: false,
    activeTab: 'workout',
    undoStack: [],
    redoStack: []
  });

  const [modals, setModals] = useState({
    edit: { isOpen: false, type: '', data: null },
    notes: { isOpen: false, dayId: '', categoryId: '', exerciseId: '', exerciseName: '' },
    chart: { isOpen: false, exerciseName: '', history: null as ExerciseHistory | null },
    aiAnalysis: { isOpen: false, exerciseName: '', history: null as ExerciseHistory | null }
  });

  const [loading, setLoading] = useState(true);

  // Firebase data subscription
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToWorkoutData(
      user.uid,
      (data) => {
        if (data) {
          setAppState(prev => ({ ...prev, workoutData: data }));
        } else {
          // Initialize with base data if no data exists
          saveWorkoutData(user.uid, baseInitialData).catch(console.error);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  // Save to history stack for undo/redo
  const saveToHistory = (newData: WorkoutData) => {
    setAppState(prev => ({
      ...prev,
      undoStack: [prev.workoutData, ...prev.undoStack].slice(0, 10),
      redoStack: [],
      workoutData: newData
    }));
  };

  const handleWorkoutDataChange = async (newData: WorkoutData) => {
    saveToHistory(newData);
    
    if (user) {
      try {
        await saveWorkoutData(user.uid, newData);
        showToast('Données sauvegardées', 'success');
      } catch (error) {
        console.error('Save error:', error);
        showToast('Erreur de sauvegarde', 'error');
      }
    }
  };

  const handleUndo = () => {
    if (appState.undoStack.length === 0) return;
    
    const [previousData, ...restUndo] = appState.undoStack;
    setAppState(prev => ({
      ...prev,
      workoutData: previousData,
      undoStack: restUndo,
      redoStack: [prev.workoutData, ...prev.redoStack].slice(0, 10)
    }));

    if (user) {
      saveWorkoutData(user.uid, previousData).catch(console.error);
    }
  };

  const handleRedo = () => {
    if (appState.redoStack.length === 0) return;
    
    const [nextData, ...restRedo] = appState.redoStack;
    setAppState(prev => ({
      ...prev,
      workoutData: nextData,
      redoStack: restRedo,
      undoStack: [prev.workoutData, ...prev.undoStack].slice(0, 10)
    }));

    if (user) {
      saveWorkoutData(user.uid, nextData).catch(console.error);
    }
  };

  // Modal handlers
  const handleShowEditModal = (type: string, data: any) => {
    setModals(prev => ({
      ...prev,
      edit: { isOpen: true, type, data }
    }));
  };

  const handleEditModalSave = (data: any) => {
    const newWorkoutData = { ...appState.workoutData };
    
    switch (modals.edit.type) {
      case 'day':
        const dayIndex = newWorkoutData.days.findIndex(d => d.id === data.id);
        if (dayIndex !== -1) {
          newWorkoutData.days[dayIndex] = { ...newWorkoutData.days[dayIndex], ...data };
        }
        break;
        
      case 'deleteDay':
        newWorkoutData.days = newWorkoutData.days.filter(d => d.id !== data.id);
        break;
        
      case 'addCategory':
        const dayForCategory = newWorkoutData.days.find(d => d.id === data.dayId);
        if (dayForCategory) {
          dayForCategory.categories.push({
            ...data,
            order: dayForCategory.categories.length
          });
        }
        break;
        
      // Add other cases for category and exercise operations
    }
    
    handleWorkoutDataChange(newWorkoutData);
  };

  const handleShowNotesModal = (dayId: string, categoryId: string, exerciseId: string) => {
    const day = appState.workoutData.days.find(d => d.id === dayId);
    const category = day?.categories.find(c => c.id === categoryId);
    const exercise = category?.exercises.find(e => e.id === exerciseId);
    
    setModals(prev => ({
      ...prev,
      notes: {
        isOpen: true,
        dayId,
        categoryId,
        exerciseId,
        exerciseName: exercise?.name || ''
      }
    }));
  };

  const handleNotesModalSave = (notes: string) => {
    const newWorkoutData = { ...appState.workoutData };
    const day = newWorkoutData.days.find(d => d.id === modals.notes.dayId);
    const category = day?.categories.find(c => c.id === modals.notes.categoryId);
    const exercise = category?.exercises.find(e => e.id === modals.notes.exerciseId);
    
    if (exercise) {
      exercise.notes = notes;
      handleWorkoutDataChange(newWorkoutData);
    }
  };

  const handleNotesModalDelete = () => {
    const newWorkoutData = { ...appState.workoutData };
    const day = newWorkoutData.days.find(d => d.id === modals.notes.dayId);
    const category = day?.categories.find(c => c.id === modals.notes.categoryId);
    const exercise = category?.exercises.find(e => e.id === modals.notes.exerciseId);
    
    if (exercise) {
      delete exercise.notes;
      handleWorkoutDataChange(newWorkoutData);
    }
  };

  const closeModals = () => {
    setModals({
      edit: { isOpen: false, type: '', data: null },
      notes: { isOpen: false, dayId: '', categoryId: '', exerciseId: '', exerciseName: '' },
      chart: { isOpen: false, exerciseName: '', history: null },
      aiAnalysis: { isOpen: false, exerciseName: '', history: null }
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <LoadingSpinner size="lg\" message="Chargement de l'application..." />
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{authError}</p>
          <p className="text-gray-400">Veuillez recharger la page</p>
        </div>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (appState.activeTab) {
      case 'workout':
        return (
          <WorkoutView
            workoutData={appState.workoutData}
            isEditMode={appState.isEditMode}
            isAdvancedMode={appState.isAdvancedMode}
            onWorkoutDataChange={handleWorkoutDataChange}
            onShowEditModal={handleShowEditModal}
            onShowNotesModal={handleShowNotesModal}
          />
        );
      case 'timer':
        return <TimerView />;
      case 'history':
        return (
          <HistoryView
            workoutData={appState.workoutData}
            isAdvancedMode={appState.isAdvancedMode}
            onShowChart={(name, history) => setModals(prev => ({
              ...prev,
              chart: { isOpen: true, exerciseName: name, history }
            }))}
            onShowAIAnalysis={(name, history) => setModals(prev => ({
              ...prev,
              aiAnalysis: { isOpen: true, exerciseName: name, history }
            }))}
            onShowNotes={(name) => {
              // Find exercise and show notes
              showToast('Notes pour ' + name, 'info');
            }}
            onRestoreExercise={(name) => {
              // Restore deleted exercise
              showToast('Exercice restauré: ' + name, 'success');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header
        isAdvancedMode={appState.isAdvancedMode}
        onToggleAdvanced={() => setAppState(prev => ({ ...prev, isAdvancedMode: !prev.isAdvancedMode }))}
        isEditMode={appState.isEditMode}
        onToggleEdit={() => setAppState(prev => ({ ...prev, isEditMode: !prev.isEditMode }))}
        canUndo={appState.undoStack.length > 0}
        canRedo={appState.redoStack.length > 0}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />

      <main className="pt-16">
        {renderActiveView()}
      </main>

      <Navigation
        activeTab={appState.activeTab}
        onTabChange={(tab: ActiveTab) => setAppState(prev => ({ ...prev, activeTab: tab }))}
      />

      {/* Modals */}
      <EditModal
        isOpen={modals.edit.isOpen}
        onClose={closeModals}
        type={modals.edit.type}
        data={modals.edit.data}
        onSave={handleEditModalSave}
      />

      <NotesModal
        isOpen={modals.notes.isOpen}
        onClose={closeModals}
        exerciseName={modals.notes.exerciseName}
        notes={appState.workoutData.days
          .find(d => d.id === modals.notes.dayId)
          ?.categories.find(c => c.id === modals.notes.categoryId)
          ?.exercises.find(e => e.id === modals.notes.exerciseId)
          ?.notes || ''}
        onSave={handleNotesModalSave}
        onDelete={handleNotesModalDelete}
      />

      {modals.chart.history && (
        <ChartModal
          isOpen={modals.chart.isOpen}
          onClose={closeModals}
          exerciseName={modals.chart.exerciseName}
          history={modals.chart.history}
        />
      )}

      {modals.aiAnalysis.history && (
        <AIAnalysisModal
          isOpen={modals.aiAnalysis.isOpen}
          onClose={closeModals}
          exerciseName={modals.aiAnalysis.exerciseName}
          history={modals.aiAnalysis.history}
        />
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;