
import React, { useState, useMemo } from 'react';
import { Lesson, ListeningPrompt } from '../types';
import { getListeningPromptsForLesson } from '../services/quizService';

interface ListeningPracticeScreenProps {
  lesson: Lesson;
  onGoHome: () => void;
}

const SpeakerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.66 1.905H6.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.584 5.106a.75.75 0 0 1 1.06 0c3.807 3.808 3.807 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06z" />
        <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06z" />
    </svg>
);


const ListeningPracticeScreen: React.FC<ListeningPracticeScreenProps> = ({ lesson, onGoHome }) => {
  const prompts = useMemo(() => getListeningPromptsForLesson(lesson.id), [lesson.id]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'correct' | 'incorrect' | 'info' } | null>(null);

  const currentPrompt = prompts[currentIndex];

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentPrompt.text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
        alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === currentPrompt.text.toLowerCase()) {
      setFeedback({ message: 'Correct!', type: 'correct' });
    } else {
      setFeedback({ message: `Nice try! The correct answer was: "${currentPrompt.text}"`, type: 'incorrect' });
    }
  };
  
  const nextPrompt = () => {
      if(currentIndex < prompts.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setUserInput('');
          setFeedback(null);
      } else {
          setFeedback({ message: "You've completed this lesson!", type: 'info' });
      }
  };

  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-emerald-400">{lesson.title}: <span className="text-white">Listening Practice</span></h2>
        <button onClick={onGoHome} className="text-sm text-slate-400 hover:text-white">Exit</button>
      </div>

      <p className="text-slate-300 mb-6">Listen to the {currentPrompt.type} and type what you hear.</p>

      <div className="mb-6">
        <button onClick={playAudio} className="bg-cyan-500 hover:bg-cyan-600 p-6 rounded-full transition-transform transform hover:scale-110">
          <SpeakerIcon className="w-12 h-12 text-white" />
        </button>
      </div>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={!!feedback}
        className="w-full md:w-4/5 mx-auto p-4 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-400 text-center text-lg"
        placeholder="Type here..."
      />

      {feedback && (
        <div className={`mt-4 text-lg font-bold ${feedback.type === 'correct' ? 'text-green-400' : feedback.type === 'incorrect' ? 'text-red-400' : 'text-cyan-400'}`}>
            {feedback.message}
        </div>
      )}

      <div className="mt-8">
        {feedback ? (
            <button onClick={nextPrompt} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg">
                {currentIndex === prompts.length - 1 ? 'Finish' : 'Next'}
            </button>
        ) : (
            <button onClick={checkAnswer} className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg">
                Check Answer
            </button>
        )}
      </div>
    </div>
  );
};

export default ListeningPracticeScreen;