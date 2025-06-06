import { WorkoutData } from '../types';
import { generateUUID } from '../utils/calculations';

export const baseInitialData: WorkoutData = {
  days: [
    // JOUR 1: PUSH LÉGER (Ex: Lundi)
    {
      id: generateUUID(),
      name: 'Lundi + Jeudi',
      order: 0,
      categories: [
        {
          id: generateUUID(),
          name: 'Pecs',
          order: 0,
          exercises: [
            { id: generateUUID(), name: 'Développé Couché', sets: [1kg × 2], order: 0 },
            { id: generateUUID(), name: 'Développé Couché incliné', series: 3, reps: '12', weight: 10, sets: [], order: 1 },
            { id: generateUUID(), name: 'Ecartés Couchés', series: 3, reps: '15', weight: 6, sets: [], order: 2 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Épaules',
          order: 1,
          exercises: [
            { id: generateUUID(), name: 'Développé Épaules', series: 4, reps: '15', weight: 8, sets: [], order: 0 },
            { id: generateUUID(), name: 'Ecartés Épaules', series: 3, reps: '15', weight: 6, sets: [], order: 1 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Triceps',
          order: 2,
          exercises: [
            { id: generateUUID(), name: 'Haltère Front', series: 4, reps: '12', weight: 4, sets: [], order: 0 },
            { id: generateUUID(), name: 'Kickback', series: 3, reps: '12', weight: 4, sets: [], order: 1 }
          ]
        }
      ]
    },
    // JOUR 2: PULL LÉGER (Ex: Mardi)
    {
      id: generateUUID(),
      name: 'Pull (Léger)',
      order: 1,
      categories: [
        {
          id: generateUUID(),
          name: 'Dos',
          order: 0,
          exercises: [
            { id: generateUUID(), name: 'Rowing Haltères', series: 4, reps: '12', weight: 10, sets: [], order: 0 },
            { id: generateUUID(), name: 'Tractions', series: 4, reps: '6', weight: 0, sets: [], order: 1 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Biceps',
          order: 1,
          exercises: [
            { id: generateUUID(), name: 'Curl', series: 4, reps: '15', weight: 8, sets: [], order: 0 },
            { id: generateUUID(), name: 'Curl Marteau', series: 4, reps: '13', weight: 8, sets: [], order: 1 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Arrière Épaules & Abdos',
          order: 2,
          exercises: [
            { id: generateUUID(), name: 'Arrière Épaules', series: 4, reps: '12', weight: 4, sets: [], order: 0 },
            { id: generateUUID(), name: 'Abdos', series: 4, reps: '15-20', weight: 0, sets: [], order: 1 }
          ]
        }
      ]
    },
    // JOUR 3: LEGS A (Ex: Mercredi)
    {
      id: generateUUID(),
      name: 'Legs (Type A)',
      order: 2,
      categories: [
        {
          id: generateUUID(),
          name: 'Soulevé de Terre',
          order: 0,
          exercises: [
            { id: generateUUID(), name: 'Soulevé de Terre Sumo', series: 4, reps: '15', weight: 16, sets: [], order: 0 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Fentes',
          order: 1,
          exercises: [
            { id: generateUUID(), name: 'Fentes Ischios (unilatéral)', series: 4, reps: '12-15', weight: 0, sets: [], order: 0 },
            { id: generateUUID(), name: 'Fentes Quads (unilatéral)', series: 4, reps: '12-15', weight: 0, sets: [], order: 1 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Curl',
          order: 2,
          exercises: [
            { id: generateUUID(), name: 'Curl Ischios (unilatéral)', series: 3, reps: '12', weight: 10, sets: [], order: 0 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Mollets',
          order: 3,
          exercises: [
            { id: generateUUID(), name: 'Levées Mollets (unilatéral)', series: 4, reps: '15-20', weight: 0, sets: [], order: 0 }
          ]
        }
      ]
    },
    // JOUR 4: PUSH LOURD (Ex: Jeudi)
    {
      id: generateUUID(),
      name: 'Push (Lourd)',
      order: 3,
      categories: [
        {
          id: generateUUID(),
          name: 'Pecs',
          order: 0,
          exercises: [
            { id: generateUUID(), name: 'Développé Couché', series: 4, reps: '8', weight: 14, sets: [], order: 0 },
            { id: generateUUID(), name: 'Développé Couché incliné', series: 3, reps: '8', weight: 10, sets: [], order: 1 },
          ]
        },
        {
          id: generateUUID(),
          name: 'Épaules',
          order: 1,
          exercises: [
            { id: generateUUID(), name: 'Développé Épaules', series: 4, reps: '8', weight: 14, sets: [], order: 0 },
            { id: generateUUID(), name: 'Avant Épaules', series: 3, reps: '15', weight: 6, sets: [], order: 1 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Triceps',
          order: 2,
          exercises: [
            { id: generateUUID(), name: 'Haltère Front', series: 4, reps: '8', weight: 6, sets: [], order: 0 },
            { id: generateUUID(), name: 'Barre Front', series: 4, reps: '6', weight: 16, sets: [], order: 1 }
          ]
        }
      ]
    },
    // JOUR 5: PULL LOURD (Ex: Vendredi)
    {
      id: generateUUID(),
      name: 'Pull (Lourd)',
      order: 4,
      categories: [
        {
          id: generateUUID(),
          name: 'Dos',
          order: 0,
          exercises: [
            { id: generateUUID(), name: 'Rowing Haltères', series: 4, reps: '8', weight: 12, sets: [], order: 0 },
            { id: generateUUID(), name: 'Rowing Haltère Mono', series: 3, reps: '12', weight: 10, sets: [], order: 1 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Biceps',
          order: 1,
          exercises: [
            { id: generateUUID(), name: 'Curl', series: 4, reps: '10', weight: 10, sets: [], order: 0 },
            { id: generateUUID(), name: 'Curl Marteau', series: 4, reps: '6', weight: 12, sets: [], order: 1 }
          ]
        }
      ]
    },
    // JOUR 6: LEGS B (Ex: Samedi)
    {
      id: generateUUID(),
      name: 'Legs (Type B)',
      order: 5,
      categories: [
        {
          id: generateUUID(),
          name: 'Soulevé de Terre',
          order: 0,
          exercises: [
            { id: generateUUID(), name: 'Soulevé de Terre Normal', series: 4, reps: '15', weight: 16, sets: [], order: 0 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Fentes',
          order: 1,
          exercises: [
            { id: generateUUID(), name: 'Fentes Ischios (unilatéral)', series: 4, reps: '10-12', weight: 0, sets: [], order: 0 },
            { id: generateUUID(), name: 'Fentes Quads (unilatéral)', series: 4, reps: '10-12', weight: 0, sets: [], order: 1 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Curl',
          order: 2,
          exercises: [
            { id: generateUUID(), name: 'Curl Quads (unilatéral)', series: 4, reps: '12', weight: 10, sets: [], order: 0 }
          ]
        },
        {
          id: generateUUID(),
          name: 'Mollets',
          order: 3,
          exercises: [
            { id: generateUUID(), name: 'Levées Mollets (unilatéral)', series: 4, reps: '15-20', weight: 0, sets: [], order: 0 }
          ]
        }
      ]
    }
  ],
  timestamp: new Date()
};
