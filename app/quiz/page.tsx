"use client";
import React from "react";
import QuizForm from "./QuizForm";

export default function Page() {
  /* TODO: put this info into the landing page instead of including in every page of the quiz */
  return (
    <main>
      <div className="w-screen h-1/5 bg-mg-sky text-mg-navy-600 p-4 pt-12 font-bold space-y-4">
        <p className="text-xl font-semibold md:text-3xl">
          The Financial Order of Operations
        </p>
        <p className="text-4xl md:text-6xl">
          9 Steps Toward a Beautiful Tomorrow
        </p>
      </div>
      <div className="bg-slate-100 p-4 pl-1 pr-0">
        <p className="bg-slate-50 px-4 border-mg-orange-600 border-l-8 ml-2 text-mg-navy-800">
          The Money Guys' Financial Order of Operations is a foundational
          resource, outlining a set of milestones that guide you along your
          financial journey.
        </p>
      </div>
      <QuizForm />
      <footer className="text-xs text-mg-navy-600 bg-white p-2 border-slate-200 border-t-2">
        The Money Guys are financial advisors who produce educational content
        simplifying your journey towards financial independence. This quiz is
        not affiliated with the Money Guy company, but uses their publicly
        available resource as a guide.
      </footer>
    </main>
  );
}
