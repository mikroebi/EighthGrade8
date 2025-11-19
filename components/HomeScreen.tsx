
import React from 'react';
import { Lesson } from '../types';
import { LESSONS } from '../data/questions';

interface HomeScreenProps {
  onStartQuiz: (lesson: Lesson) => void;
  onStartListening: (lesson: Lesson) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartQuiz, onStartListening }) => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-cyan-400 mb-2">English Grade 8</h1>
      <p className="text-xl text-slate-300 mb-8">Choose your practice mode</p>
      
      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-white">Start a Quiz</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => onStartQuiz(lesson)}
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-2 rounded-lg transition-transform transform hover:scale-105"
            >
              <span className="block text-lg">{lesson.title}</span>
              <span className="block text-xs font-normal">{lesson.subtitle}</span>
            </button>
          ))}
        </div>

        <hr className="my-8 border-slate-600"/>

        <h2 className="text-3xl font-bold mb-6 text-white">Listening Practice</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => onStartListening(lesson)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-2 rounded-lg transition-transform transform hover:scale-105"
            >
              <span className="block text-lg">{lesson.title}</span>
              <span className="block text-xs font-normal">{lesson.subtitle}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;