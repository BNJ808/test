export interface AIAnalysis {
  analysis: string;
  recommendations: string[];
}

const GEMINI_API_KEY = 'demo-api-key'; // This would normally come from environment variables

export const analyzeWorkoutProgress = async (
  exerciseName: string,
  recentSessions: Array<{ date: Date; sets: Array<{ weight: number; reps: number }> }>
): Promise<AIAnalysis> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis for demo purposes
    const mockAnalyses = [
      {
        analysis: "Votre progression sur cet exercice montre une tendance positive avec une augmentation constante de la charge de travail. Vos performances sont cohérentes et montrent une bonne adaptation musculaire.",
        recommendations: [
          "Continuez à augmenter progressivement la charge",
          "Maintenez une technique parfaite",
          "Considérez l'ajout de variantes pour stimuler davantage"
        ]
      },
      {
        analysis: "Les données révèlent quelques fluctuations dans vos performances récentes. Cela peut indiquer un besoin d'ajustement dans votre programme ou votre récupération.",
        recommendations: [
          "Vérifiez votre qualité de sommeil",
          "Assurez-vous d'avoir une nutrition adéquate",
          "Considérez une semaine de décharge"
        ]
      },
      {
        analysis: "Excellente progression ! Vos gains de force sont réguliers et durables. Votre approche actuelle semble très efficace pour cet exercice.",
        recommendations: [
          "Maintenez cette approche",
          "Documentez ce qui fonctionne bien",
          "Pensez à des objectifs plus ambitieux"
        ]
      }
    ];
    
    return mockAnalyses[Math.floor(Math.random() * mockAnalyses.length)];
  } catch (error) {
    console.error('AI Analysis error:', error);
    throw new Error('Impossible d\'analyser les données pour le moment');
  }
};