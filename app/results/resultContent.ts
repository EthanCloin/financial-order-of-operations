import { QuizAnswer, QuizAnswerKey } from "../quiz/quizContent";

export type ResultKey =
  | "deductiblesCovered"
  | "employerMatch"
  | "highInterestDebt"
  | "emergencyReserves"
  | "rothAndHSA"
  | "maxOutRetirement"
  | "hyperaccumulation"
  | "prepaidFutureExpenses"
  | "lowInterestDebt";

export interface Result {
  resultKey: ResultKey;
  scoreFxn(answers: QuizAnswer[]): number; // return a num bw 0-100 for gauge
}
export const resultContent: Result[] = [
  {
    resultKey: "deductiblesCovered",
    scoreFxn: (a) => {
      // for now assuming highest deductible is $1500 maybe that should be another question
      const eFundBalance = a.find(
        (x) => x.answerKey === "emergencyFundBalance"
      )?.answer;
      if (eFundBalance === undefined) return 0;
      if (eFundBalance >= 1500) return 100;

      // x / 100 = efb / 1500 --> efb / 15 = score
      return eFundBalance / 15;
    },
  },
  {
    resultKey: "employerMatch",
    scoreFxn: (a) => {
      const employerOffering = a.find(
        (x) => x.answerKey === "employerMatchPercent"
      )?.answer;
      const yourContribution = a.find(
        (x) => x.answerKey === "employerRetirementContribution"
      )?.answer;
      if (employerOffering === undefined || yourContribution === undefined)
        return 0;
      if (yourContribution >= employerOffering) return 100;
      return Math.min(100, (yourContribution / employerOffering) * 100);
    },
  },
  {
    resultKey: "highInterestDebt",
    scoreFxn: (a) => {
      const debt = a.find((x) => x.answerKey == "highInterestDebt")?.answer;
      const monthlyIncome = a.find(
        (x) => x.answerKey == "grossMonthlyIncome"
      )?.answer;
      if (debt === undefined || debt === 0) return 100;
      if (monthlyIncome === undefined || monthlyIncome == 0) return 0;

      // my heuristic, not moneyguy sourced: if it takes a year+ to payoff debt, u get no points
      const monthlyDebtShovel = 0.2 * monthlyIncome;
      if (12 * monthlyDebtShovel <= debt) return 0;
      return Math.max(0, debt / monthlyDebtShovel);
    },
  },
];
