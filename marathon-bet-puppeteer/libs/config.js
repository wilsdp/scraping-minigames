const urls = [
  "https://www.marathonbet.com/en/live/18888603",
  // "https://www.marathonbet.com/en/live/18670452",
  // "https://www.marathonbet.com/en/live/18630070",
]

const baseSelectors = {
  gameTime: `div.score-and-time > span.time.bold.nobr`,
  gameScore: `div.score-and-time > span.score-state`,
  teamHome: `div.member-names-view > span:nth-child(1)`,
  teamAway: `div.member-names-view > span:nth-child(2) > span:nth-child(2)`,

  // Match Result
  homeRate: `type1 > div > div[data-mutable-id="MG695_1279526854"] > div > table.td-border > tbody > tr[data-mutable-id="MG695_1279526854_0"] > td > div.result-right > span`,
  drawRate: `type1 > div > div[data-mutable-id="MG695_1279526854"] > div > table.td-border > tbody > tr[data-mutable-id="MG695_1279526854_1"] > td > div.result-right > span`,
  awayRatee: `type1 > div > div[data-mutable-id="MG695_1279526854"] > div > table.td-border > tbody > tr[data-mutable-id="MG695_1279526854_2"] > td > div.result-right > span`,
  resultStatus: `td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,

  // Full Time Result + Total Goals
  fullTimeRTG: `type1 > div > div[data-preference-id="YES_NO_MULTIPLE_670402972"] > div > table.td-border > tbody`,
  statFullTime: `type1 > div > div[data-preference-id="YES_NO_MULTIPLE_670402972"] > div > table.td-border > tbody > tr[data-mutable-id="MG267_670402972_1"] > td.price > span.active-selection`,

  // To Win Match With Handicap
  matchWithHandicap: `type2 > div > div > div > table.td-border > tbody`,
  statHandicap: `td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,

  //Half with most goals
  halfWithMostGoals: `type1 > div > div[data-preference-id="MOST_GOALS_TIME_1833766125"] > div > table.td-border > tbody > tr[data-mutable-id="MG459_1833766125_1"]`,
  statHalfwithMostGoals:`td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,

  // To Win 1st Half With Handicap
  win1stHalfhandicap: `type26 > div > div[data-preference-id="FIRST_HALF_MATCH_HANDICAP_BETTING_1833583086"] > div > table.td-border > tbody`,
  stat1sthalfHandicap: `td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,

  // To Win 2nd Half With Handicap
  win2ndHalfhandicap: `type26 > div > div[data-preference-id="SECOND_HALF_MATCH_HANDICAP_BETTING_1833584492"] > div > table.td-border > tbody`,
  stat2ndHalfHandicap: `type26 > div > div[data-preference-id="SECOND_HALF_MATCH_HANDICAP_BETTING_1833584492"] > div > table.td-border > tbody > tr[data-mutable-id="MG241_1833584492_1"] > td.price > div.coeff-link-2way > div.coeff-price `,
 
  // 1st Half Result
  result1stHalfHome: `type26 > div > div[data-preference-id="FIRST_HALF_RESULT_AND_DOUBLE_CHANCE_6940816"] > div > table.td-border > tbody > tr[data-mutable-id="MG108_6940816_0"] >  td.height-column-with-price > div.result-right`,
  result1stHalfDraw: `type26 > div > div[data-preference-id="FIRST_HALF_RESULT_AND_DOUBLE_CHANCE_6940816"] > div > table.td-border > tbody > tr[data-mutable-id="MG108_6940816_1"] >  td.height-column-with-price > div.result-right`,
  result1stHalfAway: `type26 > div > div[data-preference-id="FIRST_HALF_RESULT_AND_DOUBLE_CHANCE_6940816"] > div > table.td-border > tbody > tr[data-mutable-id="MG108_6940816_2"] >  td.height-column-with-price > div.result-right`,
  stat1stHalfResult: `td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,

  // 2nd Half Result                                                                                                                                  
  result2ndHalfHome: `type26 > div > div[data-preference-id="SECOND_HALF_RESULT_AND_DOUBLE_CHANCE_8867036"] > div > table.td-border > tbody > tr[data-mutable-id="MG109_8867036_0"] > td.height-column-with-price > div.result-right`,
  result2ndHalfDraw: `type26 > div > div[data-preference-id="SECOND_HALF_RESULT_AND_DOUBLE_CHANCE_8867036"] > div > table.td-border > tbody > tr[data-mutable-id="MG109_8867036_1"] > td.height-column-with-price > div.result-right`,
  result2ndHalfAway: `type26 > div > div[data-preference-id="SECOND_HALF_RESULT_AND_DOUBLE_CHANCE_8867036"] > div > table.td-border > tbody > tr[data-mutable-id="MG109_8867036_2"] > td.height-column-with-price > div.result-right`,
  stat2ndHalfResult: `td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,
  
  // secondHalfTest:`type26 > div > div[data-preference-id="SECOND_HALF_RESULT_AND_DOUBLE_CHANCE_8867036"] > div > table.td-border > tbody`,

  // Correct Score
  correctScore: `type1 > div > div[data-preference-id="MAIN_CORRECT_SCORE_DYNAMIC_TYPE_462569935"] > div > table.td-border > tbody`,
  statCorrex: `td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,

  // Total Goals
  totalGoals: `type3 > div > div:nth-child(1) > div > table.td-border > tbody`,
  oddTG: `type3 > div > div:nth-child(1) > div > table.td-border > tbody > tr:last-child > td:nth-child(1) > span`,
  evenTG: `type3 > div > div:nth-child(1) > div > table.td-border > tbody > tr:last-child > td:nth-child(2) > span`,
  statTotalgoals:`td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,

  // Total Goals 1st Half
  totalGoals1stHalf: `type26 > div > div[data-preference-id="TOTALS_WITH_ODDEVEN1_2026104575"] > div > table.td-border > tbody`,
  oddTG1: `type26 > div > div:nth-child(4) > div > table.td-border > tbody > tr:last-child > td:nth-child(1) > span`,
  evenTG1: `type26 > div > div:nth-child(4) > div > table.td-border > tbody > tr:last-child > td:nth-child(2) > span`,
  statTotalgoals1stHalf: `td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,

  // Total Goals 2nd Half
  totalGoals2ndHalf: `type26 > div > div[data-preference-id="TOTALS_WITH_ODDEVEN2_2026156634"] > div > table.td-border > tbody`,
  oddTG2: `type26 > div > div[data-preference-id="TOTALS_WITH_ODDEVEN2_2026156634"] > div > table.td-border > tbody > tr:last-child > td:nth-child(1) > span`,
  evenTG2: `type26 > div > div[data-preference-id="TOTALS_WITH_ODDEVEN2_2026156634"] > div > table.td-border > tbody > tr:last-child > td:nth-child(2) > span`,
  statTotalgoals2ndHalf: `type26 > div > div[data-preference-id="TOTALS_WITH_ODDEVEN2_2026156634"] > div > table.td-border > tbody`,

  // Yes or No Score
  yesNoScore: `type1 > div > div[data-preference-id="SCORING_DRAW_-1796495410"] > div > table.td-border > tbody > tr[data-mutable-id="MG443_-1796495410_1"]`,
  statYesnoScore: `type1 > div > div[data-preference-id="SCORING_DRAW_-1796495410"] > div > table.td-border > tbody > tr[data-mutable-id="MG443_-1796495410_1"] > 
                td.height-column-with-price > span.active-selection`,

  // Team To Score + Result
  teamScoreResult: `type1 > div > div[data-preference-id="RESULT_BOTH_TEAMS_TO_SCORE_-1406105733"] > div > table.td-border > tbody`,
  statTeamscoreResult: `td.coefficients > table > tbody > tr.coefficients-row > td:nth-child(2) > div > span.right-simple > span.active-selection`,
}

module.exports = {
  urls,
  baseSelectors,
}
