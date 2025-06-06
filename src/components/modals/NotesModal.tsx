import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import Button from '../Button';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  notes: string;
  onSave: (notes: string) => void;
  onDelete: () => void;
}

const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  exerciseName,
  notes,
  onSave,
  onDelete
}) => {
  const [currentNotes, setCurrentNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCurrentNotes(notes || '');
    }
  }, [isOpen, notes]);

  const handleSave = () => {
    onSave(currentNotes.trim());
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Notes - ${exerciseName}`} size="lg">
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes d'exercice
            </label>
            <textarea
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px] resize-vertical"
              placeholder="Ajoutez vos notes ici (technique, sensations, objectifs, etc.)"
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={!notes}
          >
            Supprimer les notes
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="ghost" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotesModal;