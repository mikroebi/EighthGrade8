
import { QUESTIONS, LISTENING_PROMPTS } from '../data/questions';
import { Question, ListeningPrompt } from '../types';

export const getQuestionsForLesson = (lessonId: number): Question[] => {
  return QUESTIONS.filter(q => q.lessonId === lessonId);
};

export const getRandomQuestions = (lessonId: number, count: number): Question[] => {
  const lessonQuestions = getQuestionsForLesson(lessonId);
  const shuffled = [...lessonQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getListeningPromptsForLesson = (lessonId: number): ListeningPrompt[] => {
    return LISTENING_PROMPTS.filter(p => p.lessonId === lessonId);
};