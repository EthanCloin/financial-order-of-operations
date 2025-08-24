"use client";
import React from "react";
import QuizForm from "./QuizForm";
import { useQuiz } from "../hooks/QuizProvider";

export default function Page() {
  const { state } = useQuiz();
  return (
    <main>
      <div className="w-screen bg-mg-sky text-mg-navy-800 p-4 text-xl font-bold space-y-2">
        <div>
          Financial Order of Operations Quiz
          <p className="text-mg-navy-600">
            Question {state.step} / {Object.keys(state.responses).length}
          </p>
        </div>
      </div>
      <QuizForm />
    </main>
  );
}
