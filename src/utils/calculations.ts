export const calculate1RM = (weight: number, reps: number): number => {
  if (reps === 1) return weight;
  
  // Using Brzycki formula as primary method
  const brzycki = weight * (36 / (37 - reps));
  const epley = weight * (1 + reps / 30);
  const oConnor = weight * (1 + 0.025 * reps);
  
  // Return average of the three formulas
  return Math.round((brzycki + epley + oConnor) / 3);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};

export const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

export const normalizeDateToStartOfDay = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const findPersonalRecord = (sessions: Array<{ date: Date; sets: { weight: number; reps: number; }[] }>): { weight: number; date: Date; reps: number } | null => {
  let maxWeight = 0;
  let recordDate = new Date();
  let recordReps = 0;
  
  for (const session of sessions) {
    for (const set of session.sets) {
      if (set.weight > maxWeight) {
        maxWeight = set.weight;
        recordDate = session.date;
        recordReps = set.reps;
      }
    }
  }
  
  return maxWeight > 0 ? { weight: maxWeight, date: recordDate, reps: recordReps } : null;
};