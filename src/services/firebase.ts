import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, setDoc, Timestamp, collection } from 'firebase/firestore';
import { WorkoutData } from '../types';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPdt5a-mcDFGWERZMgwI8F85Sd_6RPZPM",
  authDomain: "carnet-muscu-bnj.firebaseapp.com",
  projectId: "carnet-muscu-bnj",
  storageBucket: "carnet-muscu-bnj.firebasestorage.app",
  messagingSenderId: "376820071555",
  appId: "1:376820071555:web:d73b64179702cc698e6fb6",
  measurementId: "G-4TGBF9YJSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth state management
let isAuthReady = false;
let currentUser: User | null = null;

export const waitForAuth = (): Promise<User | null> => {
  return new Promise((resolve) => {
    if (isAuthReady) {
      resolve(currentUser);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      isAuthReady = true;
      currentUser = user;
      unsubscribe();
      resolve(user);
    });
  });
};

export const signInUser = async (): Promise<User> => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
};

// Firestore operations
export const getWorkoutDataRef = (userId: string, appId: string = 'fitness-tracker') => {
  return doc(db, 'artifacts', appId, 'users', userId, 'sessions', 'current');
};

export const subscribeToWorkoutData = (
  userId: string,
  callback: (data: WorkoutData | null) => void,
  appId: string = 'fitness-tracker'
) => {
  const docRef = getWorkoutDataRef(userId, appId);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data() as WorkoutData;
      // Convert Firestore timestamps to Date objects
      if (data.timestamp) {
        data.timestamp = data.timestamp.toDate();
      }
      callback(data);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Firestore subscription error:', error);
    callback(null);
  });
};

export const saveWorkoutData = async (
  userId: string,
  data: WorkoutData,
  appId: string = 'fitness-tracker'
): Promise<void> => {
  const docRef = getWorkoutDataRef(userId, appId);
  
  // Convert Date objects to Firestore timestamps
  const dataToSave = {
    ...data,
    timestamp: Timestamp.now()
  };
  
  await setDoc(docRef, dataToSave);
};