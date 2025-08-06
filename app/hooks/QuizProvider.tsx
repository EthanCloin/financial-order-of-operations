"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  quizQuestions,
  QuizData,
  QuizState,
  QuizAction,
  QuizQuestionResponse,
  QuizAnswer,
} from "../quiz/quizContent";

const defaultData: QuizData = Object.fromEntries(
  quizQuestions.map((q) => [
    q.questionKey,
    q.inputs.map((i) => ({ answerKey: i.answerKey, answer: 0 })),
  ])
) as QuizData;

const initialState: QuizState = { step: 0, responses: defaultData };

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "setAnswer":
      // find the question via key
      // update the answer in array which has given answer key
      const updatedAnswers = state.responses[action.response.questionKey].map(
        (a) =>
          a.answerKey === action.response.answer.answerKey
            ? action.response.answer
            : a
      );
      console.log(updatedAnswers);
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.response.questionKey]: updatedAnswers,
        },
      };
    case "next":
      return { ...state, step: Math.min(state.step + 1, 3) };
    case "previous":
      return { ...state, step: Math.max(state.step - 1, 0) };
    default:
      return state;
  }
}

export const QuizContext = createContext<
  { state: QuizState; dispatch: React.Dispatch<QuizAction> } | undefined
>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}
export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
