// Tone.js stub for audio functionality
export class ToneStub {
  static Oscillator = class {
    constructor() {}
    toDestination() { return this; }
    start() {}
    stop() {}
    dispose() {}
  };
  
  static start() {
    return Promise.resolve();
  }
}

export const playNotificationSound = async (): Promise<void> => {
  try {
    // Try to use Web Audio API if available
    if (typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined') {
      const AudioCtx = AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  } catch (error) {
    console.warn('Audio notification failed:', error);
  }
};