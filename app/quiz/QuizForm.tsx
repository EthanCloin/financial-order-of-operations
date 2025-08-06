"use client";

import React, { useState } from "react";
import { QuizQuestion } from "./quizContent";
// import { QuizData } from "../types/QuizData";

// TODO: Update this to use my QuizProvider as the datastore and its defined actions via dispatch
// to update the state and oncontinue and all that. 'next' 'prev' 'submit' 'setAnswer'
interface QuizFormProps {
  isActive: boolean;
  question: QuizQuestion;
  onContinue: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({
  isActive,
  question,
  onContinue,
}: QuizFormProps) => {
  const handleContinue = () => {
    onContinue();
    // console.log(answers);
  };

  if (!isActive) return null;
  return (
    <div className="max-w-lg mx-auto my-4 h-full">
      <form className="space-y-4 mx-auto p-4 flex-col flex text-mg-navy-600">
        <p className="text-2xl font-semibold text-center md:text-4xl">
          {question.title}
        </p>
        <p className="text-xl md:text-2xl">{question.summary}</p>
        <p>{question.details}</p>
        {question.inputs.map((input, i) => (
          <div key={i} className="flex flex-col text-lg">
            <label>{input.label}</label>
            <input
              className="px-4 py-1 bg-white border-slate-300 border-2"
              type={input.inputType}
              placeholder={input.placeholder}
              // onChange={handleChange}
            />
          </div>
        ))}
        <button
          type="button"
          className=" text-white ml-auto bg-mg-orange-600 px-4 py-2 w-1/4 rounded hover:bg-mg-orange-400"
          onClick={handleContinue}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
