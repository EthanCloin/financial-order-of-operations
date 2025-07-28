"use client";

import React, { useState } from "react";
// import { QuizData } from "../types/QuizData";

const QuizForm: React.FC = () => {
  return (
    <form className="space-y-4 max-w-md mx-auto p-4 h-72 flex-col flex">
      <p className="text-xl text-center">Question Title</p>
      <p>I am going to ask you a question ab your money</p>
      <div className="space-x-5">
        <label>Gross Income</label>
        <input className="w-1/4" type="number" placeholder="2100" />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        See My Results
      </button>
    </form>
  );
};

export default QuizForm;
