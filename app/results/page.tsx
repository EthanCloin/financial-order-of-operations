"use client";
import React from "react";
import { useQuiz } from "../hooks/QuizProvider";

export default function Page() {
    const { state, dispatch } = useQuiz();

    return (
        <main>
            {JSON.stringify(state.responses)}
        </main>
    );
}