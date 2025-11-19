
import React from 'react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  onGoHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRetry, onGoHome }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  const getFeedback = () => {
    if (percentage === 100) return "Perfect!";
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Good Job!";
    if (percentage >= 40) return "You can do better!";
    return "Keep practicing!";
  }

  return (
    <div className="text-center bg-slate-800 p-8 rounded-2xl shadow-2xl">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">Quiz Complete!</h1>
      <p className="text-2xl text-white mb-2">{getFeedback()}</p>
      <p className="text-xl text-slate-300 mb-8">
        You scored <span className="font-bold text-yellow-400">{score}</span> out of <span className="font-bold text-yellow-400">{totalQuestions}</span>
      </p>

      <div className="relative w-40 h-40 mx-auto mb-8">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
          <path className="text-cyan-400" strokeDasharray={`${percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">{percentage}%</div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onRetry}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
        >
          Retry Quiz
        </button>
        <button
          onClick={onGoHome}
          className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
