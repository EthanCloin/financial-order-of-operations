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
  {
    resultKey: "emergencyReserves",
    scoreFxn: (a) => {
      const monthlyIncome =
        a.find((x) => x.answerKey == "grossMonthlyIncome")?.answer ?? 0;
      const emergencyFundBalance = a.find(
        (x) => x.answerKey == "emergencyFundBalance"
      )?.answer;
      if (emergencyFundBalance === undefined || emergencyFundBalance == 0)
        return 0;
      const emergencyGoal = 3 * monthlyIncome;
      const progressToGoal = Math.min(
        (emergencyFundBalance / emergencyGoal) * 100,
        100
      );

      return Math.max(0, progressToGoal);
    },
  },
  {
    resultKey: "rothAndHSA",
    scoreFxn: (a) => {
      const CONTRIBUTION_LIMIT = 7_000;
      const contributionGoal = CONTRIBUTION_LIMIT / 12;

      const monthlyIraContribution = a.find(
        (x) => x.answerKey == "iraContribution"
      )?.answer;
      if (monthlyIraContribution === undefined || monthlyIraContribution == 0)
        return 0;

      const contributionProgress = Math.min(
        (monthlyIraContribution / contributionGoal) * 100,
        100
      );
      return Math.max(0, contributionProgress);
    },
  },
  {
    resultKey: "maxOutRetirement",
    scoreFxn: (a) => {
      const CONTRIBUTION_LIMIT = 23_000;
      const contributionGoal = CONTRIBUTION_LIMIT / 12;

      const retirementContributionPercent = a.find(
        (x) => x.answerKey == "employerRetirementContribution"
      )?.answer;
      const grossMonthlyIncome = a.find(
        (x) => x.answerKey == "grossMonthlyIncome"
      )?.answer;

      if (grossMonthlyIncome === undefined || grossMonthlyIncome == 0) return 0;
      if (
        retirementContributionPercent === undefined ||
        retirementContributionPercent == 0
      )
        return 0;

      const actualContribution =
        grossMonthlyIncome * retirementContributionPercent;
      const contributionProgress = Math.min(
        (actualContribution / contributionGoal) * 100,
        100
      );
      return Math.max(0, contributionProgress);
    },
  },
  {
    resultKey: "hyperaccumulation",
    scoreFxn: (a) => {
      // get all investments into dollars/month format
      const grossMonthlyIncome = a.find(
        (x) => x.answerKey == "grossMonthlyIncome"
      )?.answer;
      if (grossMonthlyIncome === undefined || grossMonthlyIncome == 0) return 0;

      const retirementContributionPercent =
        a.find((x) => x.answerKey == "employerRetirementContribution")
          ?.answer ?? 0;
      const brokerageContribution =
        a.find((x) => x.answerKey == "brokerageContribution")?.answer ?? 0;
      const iraContribution =
        a.find((x) => x.answerKey == "iraContribution")?.answer ?? 0;
      const retirementContribution =
        retirementContributionPercent * grossMonthlyIncome;

      const allMonthlyInvestments =
        retirementContribution + brokerageContribution + iraContribution;
      if (allMonthlyInvestments >= grossMonthlyIncome) console.log("ur lyin");

      const percentInvested =
        (allMonthlyInvestments / grossMonthlyIncome) * 100;
      const INVESTING_GOAL_PCT = 25;

      return Math.max((percentInvested / INVESTING_GOAL_PCT) * 100, 0);
    },
  },
  {
    resultKey: "prepaidFutureExpenses",
    scoreFxn: (a) => {
      const prepaidFutureExpenses = a.find(
        (x) => x.answerKey == "futureExpenseSavings"
      )?.answer;
      if (prepaidFutureExpenses == undefined || prepaidFutureExpenses === 0)
        return 0;
      // if they saved anything give full points i guess
      return 100;
    },
  },
  {
    resultKey: "lowInterestDebt",
    scoreFxn: (a) => {
      const lowInterestDebt = a.find(
        (x) => x.answerKey == "lowInterestDebt"
      )?.answer;
      const monthlyIncome = a.find(
        (x) => x.answerKey == "grossMonthlyIncome"
      )?.answer;
      if (monthlyIncome === undefined || monthlyIncome == 0) return 0;
      if (lowInterestDebt == undefined || lowInterestDebt === 0) return 100;

      // my heuristic, not moneyguy sourced: if it takes 3 years+ to payoff debt, u get no points
      const monthlyDebtShovel = 0.2 * monthlyIncome;
      if (36 * monthlyDebtShovel <= lowInterestDebt) return 0;
      return Math.max(0, lowInterestDebt / monthlyDebtShovel);
    },
  },
];
