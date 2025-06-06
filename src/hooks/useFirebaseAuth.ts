import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { waitForAuth, signInUser } from '../services/firebase';

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authUser = await waitForAuth();
        if (!authUser) {
          const newUser = await signInUser();
          setUser(newUser);
        } else {
          setUser(authUser);
        }
      } catch (err) {
        setError('Authentication failed');
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return { user, loading, error };
};