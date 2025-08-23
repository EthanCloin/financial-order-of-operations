"use client";
import React from "react";
import { useQuiz } from "../hooks/QuizProvider";
import { resultContent } from "./resultContent";
import ResultGauge from "./ResultGauge";

export default function Page() {
  const { state, dispatch } = useQuiz();

  return (
    <main>
      {resultContent.map((r) => {
        return (
          <ResultGauge
            label={r.resultKey}
            score={r.scoreFxn(state.allAnswers)}
          />
        );
      })}
    </main>
  );
}
