import { WorkoutData } from '../types';
import { generateUUID } from '../utils/calculations';

export const baseInitialData: WorkoutData = {
  days: [
    {
      id: generateUUID(),
      name: 'Push (Poussée)',
      order: 0,
      categories: [
        {
          id: generateUUID(),
          name: 'Pectoraux',
          order: 0,
          exercises: [
            {
              id: generateUUID(),
              name: 'Développé couché',
              sets: [],
              order: 0
            },
            {
              id: generateUUID(),
              name: 'Développé incliné',
              sets: [],
              order: 1
            }
          ]
        },
        {
          id: generateUUID(),
          name: 'Épaules',
          order: 1,
          exercises: [
            {
              id: generateUUID(),
              name: 'Développé militaire',
              sets: [],
              order: 0
            },
            {
              id: generateUUID(),
              name: 'Élévations latérales',
              sets: [],
              order: 1
            }
          ]
        },
        {
          id: generateUUID(),
          name: 'Triceps',
          order: 2,
          exercises: [
            {
              id: generateUUID(),
              name: 'Dips',
              sets: [],
              order: 0
            }
          ]
        }
      ]
    },
    {
      id: generateUUID(),
      name: 'Pull (Traction)',
      order: 1,
      categories: [
        {
          id: generateUUID(),
          name: 'Dos',
          order: 0,
          exercises: [
            {
              id: generateUUID(),
              name: 'Tractions',
              sets: [],
              order: 0
            },
            {
              id: generateUUID(),
              name: 'Rowing barre',
              sets: [],
              order: 1
            }
          ]
        },
        {
          id: generateUUID(),
          name: 'Biceps',
          order: 1,
          exercises: [
            {
              id: generateUUID(),
              name: 'Curl barre',
              sets: [],
              order: 0
            }
          ]
        }
      ]
    },
    {
      id: generateUUID(),
      name: 'Legs (Jambes)',
      order: 2,
      categories: [
        {
          id: generateUUID(),
          name: 'Quadriceps',
          order: 0,
          exercises: [
            {
              id: generateUUID(),
              name: 'Squat',
              sets: [],
              order: 0
            }
          ]
        },
        {
          id: generateUUID(),
          name: 'Ischio-jambiers',
          order: 1,
          exercises: [
            {
              id: generateUUID(),
              name: 'Soulevé de terre',
              sets: [],
              order: 0
            }
          ]
        }
      ]
    }
  ],
  timestamp: new Date()
};