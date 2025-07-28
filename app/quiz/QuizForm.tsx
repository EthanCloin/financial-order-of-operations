"use client";

import React, { useState } from "react";
// import { QuizData } from "../types/QuizData";
/*
looks like some reasonable vlaues for each form view will be:

- Title of Question
- Short Summary
- Further Detail
- Field Label
- Field Format
- Field Placeholder
*/
const QuizForm: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto">
      <form className="space-y-4 mx-auto p-4 flex-col flex text-mg-navy-600">
        <p className="text-3xl font-bold text-center">Question Title</p>
        <p className="text-xl">
          Here is why i want this data point in a single sentence
        </p>
        <p>
          And here is some more detail about what some possible examples are!
          Sometimes people include this and other times they choose to include a
          different thing. It's important that you input what's right for you!
        </p>
        <div className="space-x-5 text-xl">
          <label>Gross Income</label>
          <input
            className="w-1/4 bg-white border-mg-sky border-2"
            type="number"
            placeholder="eg: 2100"
          />
        </div>
        <button
          type="button"
          className=" text-white ml-auto bg-mg-orange-600 px-4 py-2 w-1/4 rounded hover:bg-mg-orange-400"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
