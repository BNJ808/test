import React from 'react';
import { Undo, Redo, Edit, ToggleLeft, ToggleRight } from 'lucide-react';
import Button from './Button';

interface HeaderProps {
  isAdvancedMode: boolean;
  onToggleAdvanced: () => void;
  isEditMode: boolean;
  onToggleEdit: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isAdvancedMode,
  onToggleAdvanced,
  isEditMode,
  onToggleEdit,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">FitTracker Pro</h1>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Mode Avancé</span>
            <button
              onClick={onToggleAdvanced}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isAdvancedMode ? (
                <ToggleRight className="w-6 h-6" />
              ) : (
                <ToggleLeft className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Undo}
            onClick={onUndo}
            disabled={!canUndo}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Redo}
            onClick={onRedo}
            disabled={!canRedo}
          />
          <Button
            variant={isEditMode ? 'primary' : 'ghost'}
            size="sm"
            icon={Edit}
            onClick={onToggleEdit}
          >
            Édition
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;