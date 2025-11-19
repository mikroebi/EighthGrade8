
import React, { useState, useEffect, useMemo } from 'react';
import { Lesson, Question, QuestionType } from '../types';
import { getRandomQuestions } from '../services/quizService';

interface QuizScreenProps {
  lesson: Lesson;
  onQuizComplete: (score: number, total: number) => void;
  onGoHome: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ lesson, onQuizComplete, onGoHome }) => {
  const questions = useMemo(() => getRandomQuestions(lesson.id, 10), [lesson.id]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion: Question = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    const correct = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestion.type === QuestionType.FillInTheBlank && !isAnswered) {
        handleAnswer(typedAnswer);
        return; // Show feedback first
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTypedAnswer('');
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      onQuizComplete(score, questions.length);
    }
  };

  const getOptionClass = (option: string) => {
    if (!isAnswered) {
      return "bg-slate-700 hover:bg-slate-600";
    }
    if (option === currentQuestion.correctAnswer) {
      return "bg-green-600";
    }
    if (option === selectedAnswer) {
      return "bg-red-600";
    }
    return "bg-slate-700 opacity-50";
  };
  
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cyan-400">{lesson.title}: <span className="text-white">{lesson.subtitle}</span></h2>
        <button onClick={onGoHome} className="text-sm text-slate-400 hover:text-white">Exit</button>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
        <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      
      <p className="text-slate-300 mb-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
      <h3 className="text-2xl font-semibold mb-6 min-h-[6rem]">{currentQuestion.questionText}</h3>
      
      {currentQuestion.type === QuestionType.MultipleChoice && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => { setSelectedAnswer(option); handleAnswer(option); }}
              disabled={isAnswered}
              className={`p-4 rounded-lg text-left transition-all duration-300 ${getOptionClass(option)}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {currentQuestion.type === QuestionType.FillInTheBlank && (
        <div className="flex flex-col items-center">
            <input 
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                disabled={isAnswered}
                className="w-full md:w-2/3 p-4 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-center"
                placeholder="Type your answer here"
            />
            {isAnswered && (
              <p className={`mt-4 text-lg font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct!' : `The correct answer is: ${currentQuestion.correctAnswer}`}
              </p>
            )}
        </div>
      )}
      
      <div className="mt-8 text-right">
        <button
          onClick={handleNext}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnswered ? (currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next') : 'Check'}
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;