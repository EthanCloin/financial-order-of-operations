import { HTMLInputTypeAttribute } from "react";

export type QuizQuestionKey =
  | "emergencyFund"
  | "retirementContributions"
  | "savingForYourFuture"
  | "currentDebts";

export type QuizAnswerKey =
  | "emergencyFundBalance"
  | "monthsOfExpenses"
  | "grossMonthlyIncome"
  | "employerRetirementContribution"
  | "employerMatchPercent"
  | "iraContribution"
  | "brokerageContribution"
  | "futureExpenseSavings"
  | "lowInterestDebt"
  | "highInterestDebt";

interface QuizInput {
  answerKey: QuizAnswerKey;
  label: string;
  inputType: HTMLInputTypeAttribute;
  placeholder: string;
}

export interface QuizQuestion {
  questionKey: QuizQuestionKey;
  title: string;
  summary: string;
  details: string;
  inputs: QuizInput[];
}

export interface QuizAnswer {
  answerKey: QuizAnswerKey;
  answer: number | undefined;
}
export interface QuizQuestionResponse {
  questionKey: QuizQuestionKey;
  answer: QuizAnswer;
}
export type QuizData = Record<QuizQuestionKey, QuizAnswer[]>;
export interface QuizState {
  step: number;
  responses: QuizData;
  allAnswers: QuizAnswer[];
}
export type QuizAction =
  | { type: "setAnswer"; response: QuizQuestionResponse }
  | { type: "next" }
  | { type: "previous" };

// TODO: enforce limitations and formatting.
// maybe this should be defining a JSX input element
// instead of strings in the inputs array
export const quizQuestions: QuizQuestion[] = [
  {
    questionKey: "emergencyFund",
    title: "Emergency Fund",
    summary: "Our first financial milestone is building a cash cushion.",
    details: `In the case of a real emergency, like a car accident or flood, we want you to be able to cover immediate expenses.
      Let's figure out how much you have available for such an emergency.
      Your total should include any amount that is immediately accessible to you;
      think High-Yield Savings Accounts, not investment accounts.`,
    inputs: [
      {
        answerKey: "emergencyFundBalance",
        label: "How much money do you have available in savings?",
        inputType: "number",
        placeholder: "Emergency Fund Balance",
      },
      // {
      //   answerKey: "monthsOfExpenses",
      //   label: "How many months of expenses would this amount cover?",
      //   inputType: "number",
      //   placeholder: "Months of Expenses",
      // },
      {
        answerKey: "grossMonthlyIncome",
        label:
          "How much money do you make on average each month, before taxes and expenses?",
        inputType: "number",
        placeholder: "Gross Income",
      },
    ],
  },
  {
    questionKey: "retirementContributions",
    title: "Retirement Contributions",
    summary:
      "Beyond a fund for immediate expenses, retirement savings provide an additional layer of security.",
    details: `There are two main types of retirement accounts: Individual and Employer.
    You usually set your Employer contribution as a percentage of your income,
    and contribute to Individual Retirement Accounts independently. 
    One of the most valuable investments you can make is to ensure you acheive the maximum employer match possible, 
    since each dollar matched is an instant 100% return!`,
    inputs: [
      {
        answerKey: "employerRetirementContribution",
        label:
          "What percent of your income goes to your Employer retirement account each paycheck?",
        inputType: "number",
        placeholder: "401k / 403b / 457b Contribution",
      },
      {
        answerKey: "employerMatchPercent",
        label: "What percent of your contribution is matched by your employer?",
        inputType: "number",
        placeholder: "Employer Match",
      },
      {
        answerKey: "iraContribution",
        label:
          "How much money do you contribute to your Individual Retirement Account each month?",
        inputType: "number",
        placeholder: "IRA Contribution",
      },
    ],
  },
  {
    questionKey: "savingForYourFuture",
    title: "Saving for Your Future",
    summary:
      "Saving in retirement accounts is excellent, but we can do more than just that.",
    details: `The great benefit of retirement accounts is their tax advantages; you don't have
    to pay capital gains tax on money you earn in there. But for a full financial future, you
    should ultimately squirrel away some money that you can more easily access, especially if you 
    know you have a big expense in your future. Big expenses in this case refers to kids' tuition, or
    a down payment on a house.`,
    inputs: [
      {
        answerKey: "brokerageContribution",
        label:
          "How much money do you invest monthly into a non-retirement investment account?",
        inputType: "number",
        placeholder: "Non-Retirement Brokerage Balance",
      },
      {
        answerKey: "futureExpenseSavings",
        label: "How much money do you have set aside for future expenses?",
        inputType: "number",
        placeholder: "Tuition / House Savings Balance",
      },
    ],
  },
  {
    questionKey: "currentDebts",
    title: "Current Debts",
    summary:
      "Debt isn't always a bad thing, but it always needs to be carefully managed.",
    details: `The difference between 'good' debt and 'bad' debt usually comes down to its interest rate.
    Think of the interest rate of your debt as the cover charge that a debtor demands you pay for access to their money.
    A debt with a lower interest rate, below 4% a year, is less scary than one with a higher rates.
    Common low-interest debts are mortgages and federal student loans, while high-interest debts are more likely
    credit cards and auto loans.`,
    inputs: [
      {
        answerKey: "lowInterestDebt",
        label: "How much <em>low</em>-interest (<=4%) debt do you have?",
        inputType: "number",
        placeholder: "Low Interest Debt",
      },
      {
        answerKey: "highInterestDebt",
        label:
          "How much <strong>high</strong>-interest (<4%) debt do you have?",
        inputType: "number",
        placeholder: "High Interest Debt",
      },
    ],
  },
];
