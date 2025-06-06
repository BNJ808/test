import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Modal from '../Modal';
import { ExerciseHistory } from '../../types';
import { formatDate } from '../../utils/calculations';

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  history: ExerciseHistory;
}

const ChartModal: React.FC<ChartModalProps> = ({ isOpen, onClose, exerciseName, history }) => {
  const chartData = useMemo(() => {
    if (!history.sessions || history.sessions.length === 0) return [];

    return history.sessions.map(session => {
      const maxWeight = Math.max(...session.sets.map(set => set.weight));
      const totalVolume = session.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
      
      return {
        date: formatDate(session.date),
        weight: maxWeight,
        volume: totalVolume,
        fullDate: session.date
      };
    }).sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());
  }, [history]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm">{`Date: ${label}`}</p>
          <p className="text-purple-400 font-semibold">
            {`Poids max: ${payload[0].value}kg`}
          </p>
          <p className="text-blue-400 font-semibold">
            {`Volume total: ${payload[1].value}kg`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Progression - ${exerciseName}`} size="xl">
      <div className="p-6">
        {chartData.length > 0 ? (
          <div className="h-96">
            <ResponsiveContainer width="100%\" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#8B5CF6' }}
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-gray-400 text-lg mb-2">Aucune donnée disponible</p>
              <p className="text-gray-500 text-sm">
                Commencez par enregistrer des séries pour voir votre progression
              </p>
            </div>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-300">Poids maximum</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Volume total</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ChartModal;