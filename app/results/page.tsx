"use client";
import React from "react";
import { useQuiz } from "../hooks/QuizProvider";
import { overallScoreMsg, overallScore, resultContent } from "./resultContent";
import ResultGauge from "./ResultGauge";

export default function Page() {
  const { state } = useQuiz();

  return (
    <main>
      <div className="w-screen bg-mg-sky text-mg-navy-600 p-4 text-xl font-bold space-y-2">
        <p>Your Score: {overallScore(state.allAnswers)} / 9</p>
      </div>
      <div className="flex flex-col gap-4 p-4 justify-center text-lg text-mg-navy-600 text-left md:text-2xl">
        <p className="text-xl">{overallScoreMsg(state.allAnswers)}</p>
      </div>

      <div className="flex justify-center">
        <div className="pt-8 grid grid-cols-1 gap-4 w-2/3 md:grid-cols-3">
          {resultContent.map((r) => {
            return (
              <ResultGauge
                key={r.resultKey}
                label={r.label}
                score={Math.round(r.scoreFxn(state.allAnswers))}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
