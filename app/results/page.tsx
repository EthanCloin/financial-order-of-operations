"use client";
import React from "react";
import { useQuiz } from "../hooks/QuizProvider";
import { overallScoreMsg, resultContent } from "./resultContent";
import ResultGauge from "./ResultGauge";

export default function Page() {
  const { state } = useQuiz();

  return (
    <main>
      <p className="text-xl">{overallScoreMsg(state.allAnswers)}</p>
      <div className="flex justify-center">
        <div className="pt-8 grid grid-cols-1 gap-4 w-2/3 lg:grid-cols-3">
          {resultContent.map((r) => {
            return (
              <ResultGauge
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
