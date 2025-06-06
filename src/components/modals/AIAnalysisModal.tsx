import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Modal from '../Modal';
import LoadingSpinner from '../LoadingSpinner';
import Button from '../Button';
import { ExerciseHistory } from '../../types';
import { analyzeWorkoutProgress, AIAnalysis } from '../../services/gemini';

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  history: ExerciseHistory;
}

const AIAnalysisModal: React.FC<AIAnalysisModalProps> = ({
  isOpen,
  onClose,
  exerciseName,
  history
}) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !analysis) {
      performAnalysis();
    }
  }, [isOpen]);

  const performAnalysis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const recentSessions = history.sessions.slice(-10); // Last 10 sessions
      const result = await analyzeWorkoutProgress(exerciseName, recentSessions);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'analyse');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnalysis(null);
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Analyse IA" size="lg">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-cyan-400">{exerciseName}</h3>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" message="Analyse en cours..." />
            <p className="text-gray-400 text-sm mt-4 text-center">
              L'IA analyse vos données d'entraînement...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <Button variant="primary" onClick={performAnalysis}>
              Réessayer
            </Button>
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-3">📊 Analyse</h4>
              <div className="bg-gray-700 rounded-lg p-4 max-h-40 overflow-y-auto">
                <p className="text-gray-300 leading-relaxed">{analysis.analysis}</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">💡 Recommandations</h4>
              <div className="bg-gray-700 rounded-lg p-4 max-h-40 overflow-y-auto">
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-300 flex items-start space-x-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center border-t border-gray-700 pt-4">
              Cette analyse est générée par IA et est fournie à titre informatif uniquement.
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AIAnalysisModal;