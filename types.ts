
export enum Screen {
  Home,
  Quiz,
  Listening,
  Results,
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
}

export enum QuestionType {
  MultipleChoice = "MultipleChoice",
  FillInTheBlank = "FillInTheBlank",
}

export interface Question {
  id?: number;
  lessonId?: number;
  type: QuestionType;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  image?: string;
}

export interface ListeningPrompt {
    id?: number;
    lessonId?: number;
    text: string;
    type: 'word' | 'sentence';
}
