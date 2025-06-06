import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { generateUUID } from '../../utils/calculations';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  data: any;
  onSave: (data: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, type, data, onSave }) => {
  const [name, setName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState('');

  useEffect(() => {
    if (isOpen && data) {
      if (type === 'day' || type === 'category' || type === 'exercise') {
        setName(data.name || '');
      }
      setConfirmDelete('');
    }
  }, [isOpen, data, type]);

  const handleSave = () => {
    if (type.startsWith('delete')) {
      if (confirmDelete.toLowerCase() === 'supprimer') {
        onSave(data);
        onClose();
      }
      return;
    }

    if (type.startsWith('add')) {
      onSave({
        id: generateUUID(),
        name: name.trim(),
        order: 0,
        ...(type === 'addExercise' && { sets: [] }),
        ...(type === 'addCategory' && { exercises: [] })
      });
    } else {
      onSave({
        ...data,
        name: name.trim()
      });
    }
    
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'day':
        return 'Modifier le jour';
      case 'category':
        return 'Modifier la catégorie';
      case 'exercise':
        return 'Modifier l\'exercice';
      case 'addCategory':
        return 'Ajouter une catégorie';
      case 'addExercise':
        return 'Ajouter un exercice';
      case 'deleteDay':
        return 'Supprimer le jour';
      case 'deleteCategory':
        return 'Supprimer la catégorie';
      case 'deleteExercise':
        return 'Supprimer l\'exercice';
      default:
        return 'Modifier';
    }
  };

  const isDeleteAction = type.startsWith('delete');
  const canSave = isDeleteAction 
    ? confirmDelete.toLowerCase() === 'supprimer'
    : name.trim().length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()}>
      <div className="p-6">
        {isDeleteAction ? (
          <div className="space-y-4">
            <p className="text-gray-300">
              {type === 'deleteDay' 
                ? 'Cette action supprimera définitivement le jour et toutes ses données.'
                : 'Cette action marquera l\'élément comme supprimé.'
              }
            </p>
            <p className="text-gray-300">
              Tapez "supprimer" pour confirmer :
            </p>
            <input
              type="text"
              value={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="supprimer"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le nom..."
                autoFocus
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant={isDeleteAction ? 'danger' : 'primary'}
            onClick={handleSave}
            disabled={!canSave}
          >
            {isDeleteAction ? 'Supprimer' : 'Enregistrer'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;