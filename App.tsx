
import React, { useState, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ListeningPracticeScreen from './components/ListeningPracticeScreen';
import ResultsScreen from './components/ResultsScreen';
import { Screen, Lesson } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const startQuiz = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentScreen(Screen.Quiz);
  }, []);

  const startListeningPractice = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentScreen(Screen.Listening);
  }, []);
  
  const showResults = useCallback((finalScore: number, total: number) => {
    setScore(finalScore);
    setTotalQuestions(total);
    setCurrentScreen(Screen.Results);
  }, []);

  const goHome = useCallback(() => {
    setCurrentScreen(Screen.Home);
    setSelectedLesson(null);
    setScore(0);
    setTotalQuestions(0);
  }, []);

  const retryQuiz = useCallback(() => {
    if (selectedLesson) {
      // Reset score for retry, but keep the lesson
      setScore(0);
      setTotalQuestions(0);
      setCurrentScreen(Screen.Quiz);
    } else {
      goHome(); // Fallback if lesson is lost
    }
  }, [selectedLesson, goHome]);


  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Quiz:
        return selectedLesson && <QuizScreen lesson={selectedLesson} onQuizComplete={showResults} onGoHome={goHome} />;
      case Screen.Listening:
        return selectedLesson && <ListeningPracticeScreen lesson={selectedLesson} onGoHome={goHome} />;
      case Screen.Results:
        return <ResultsScreen score={score} totalQuestions={totalQuestions} onRetry={retryQuiz} onGoHome={goHome} />;
      case Screen.Home:
      default:
        return <HomeScreen onStartQuiz={startQuiz} onStartListening={startListeningPractice} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;