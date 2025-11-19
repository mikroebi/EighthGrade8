
import { GoogleGenAI, Type } from "@google/genai";
import { Lesson, Question, ListeningPrompt, QuestionType } from '../types';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-2.5-flash';

export const generateQuestions = async (lesson: Lesson, count: number = 5): Promise<Question[]> => {
  try {
    const prompt = `Generate ${count} English grade 8 questions for the lesson topic: "${lesson.title}: ${lesson.subtitle}".
    Mix between MultipleChoice and FillInTheBlank questions.
    For MultipleChoice, provide 3 or 4 options.
    For FillInTheBlank, provide the answer but no options.
    Ensure questions are appropriate for A2/B1 English learners.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ["MultipleChoice", "FillInTheBlank"] },
              questionText: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING },
            },
            required: ["type", "questionText", "correctAnswer"],
          },
        },
      },
    });

    const rawData = JSON.parse(response.text || '[]');
    
    // Map string types to Enum and ensure structure
    return rawData.map((q: any, index: number) => ({
      id: Date.now() + index,
      lessonId: lesson.id,
      type: q.type as QuestionType,
      questionText: q.questionText,
      options: q.options || [],
      correctAnswer: q.correctAnswer
    }));

  } catch (error) {
    console.error("Error generating quiz:", error);
    // Fallback to a basic error question if API fails
    return [{
      id: 0,
      type: QuestionType.MultipleChoice,
      questionText: "Error loading questions. Please check your connection and API Key.",
      options: ["Retry", "Exit"],
      correctAnswer: "Retry"
    }];
  }
};

export const generateListeningPrompts = async (lesson: Lesson): Promise<ListeningPrompt[]> => {
  try {
    const prompt = `Generate 5 listening practice prompts for English grade 8 students based on: "${lesson.title}: ${lesson.subtitle}".
    Include a mix of single words and simple sentences.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              type: { type: Type.STRING, enum: ["word", "sentence"] },
            },
            required: ["text", "type"],
          },
        },
      },
    });

    const rawData = JSON.parse(response.text || '[]');

    return rawData.map((p: any, index: number) => ({
      id: Date.now() + index,
      lessonId: lesson.id,
      text: p.text,
      type: p.type
    }));

  } catch (error) {
    console.error("Error generating listening prompts:", error);
    return [];
  }
};
