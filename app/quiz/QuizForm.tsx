"use client";

import React, { useState } from "react";
import {
  QuizAnswerKey,
  QuizQuestionKey,
  quizQuestions,
} from "./quizContent";
import { useQuiz } from "../hooks/QuizProvider";
import Link from "next/link";

const QuizForm: React.FC = () => {
  const { state, dispatch } = useQuiz();
  const currentIndex = state.step;
  const isLastQuestion = currentIndex === quizQuestions.length - 1;
  const question = quizQuestions[currentIndex];
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Updates the quiz state with the user's answer to the current question.
   * @param e The change event from the input element.
   * @param questionKey The key of the question being answered.
   * @param answerKey The key of the answer being set.
   */
  function handleChange(
    value: number | undefined,
    questionKey: QuizQuestionKey,
    answerKey: QuizAnswerKey
  ) {
    dispatch({
      type: "setAnswer",
      response: {
        questionKey,
        answer: {
          answerKey,
          answer: value,
        },
      },
    });
  }

  function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
    setIsExpanded(false);
    dispatch({ type: "next" });
  }
  function handlePrevious(e: React.MouseEvent<HTMLButtonElement>) {
    setIsExpanded(false);
    dispatch({ type: "previous" });
  }

  return (
    <div className="max-w-lg mx-auto my-4 h-full">
      <form className="space-y-4 mx-auto p-4 flex-col flex text-mg-navy-600">
        <p className="text-2xl font-semibold text-center md:text-4xl">
          {question.title}
        </p>
        <p className="text-xl md:text-2xl">{question.summary}</p>
        <div className="relative">
          <p className={`${isExpanded ? '' : 'line-clamp-3'} transition-all duration-300`}>
            {question.details}
          </p>
          {question.details.length > 150 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-mg-orange-600 hover:text-mg-orange-400 font-medium mt-2 text-sm"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>
        {question.inputs.map((input, i) => {
          const currentAnswer = state.responses[question.questionKey]?.find(
            (answer) => answer.answerKey === input.answerKey
          );
          return (
            <div key={i} className="flex flex-col text-lg">
              <label>{input.label}</label>
              <input
                className="px-4 py-1 bg-white border-slate-300 border-2"
                type={input.inputType}
                placeholder={input.placeholder}
                value={currentAnswer?.answer === undefined ? "" : currentAnswer.answer}
                onChange={(e) => {
                  const raw = e.target.value;
                  const value = raw === "" ? undefined : Number(raw);
                  handleChange(value, question.questionKey, input.answerKey)
                }
                }
              />
            </div>
          );
        })}
        <div className="flex justify-between">
          <button
            type="button"
            className=" text-white bg-mg-orange-600 px-4 py-2 w-1/4 rounded hover:bg-mg-orange-400"
            onClick={(e) => handlePrevious(e)}
          >
            Previous
          </button>
          {isLastQuestion ? (
            <Link
              href="/results"
              className=" text-white ml-auto bg-mg-orange-600 px-4 py-2 w-1/4 rounded hover:bg-mg-orange-400"
            >
              Finish
            </Link>
          ) : (
            <button
              type="button"
              className=" text-white ml-auto bg-mg-orange-600 px-4 py-2 w-1/4 rounded hover:bg-mg-orange-400"
              onClick={(e) => handleContinue(e)}
            >
              Continue
            </button>)}
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
