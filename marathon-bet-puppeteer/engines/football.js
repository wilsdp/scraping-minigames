const puppeteer = require("puppeteer")
const _ = require("lodash")
const { urls, baseSelectors } = require("../libs/config")
const {
  cleanupOldData,
  parseMatchResult,
  parseDataHandicap,
  parseData1stHalfHandicap,
  parseData2ndHalfHandicap,
  parseData1,
  parseDataCorrectScore,
  parseData3,
  parseData4,
  parseScoreDraw,
  parseTotalGoals,
  parseTotalGoals1stHalf,
  parseTotalGoals2ndHalf,
  parseHalfwithMostScore,
  parseTGoalsOddEven,
  parseTGoals1stHalfOddEven,
  parseTGoals2ndHalfOddEven,
  parseX1stHalf,
  parseX2ndHalf,
  updateData,
  updateDataTG2ndHalf,
  updateDataTG1stHalf,
  updateDataHandicap,
  updatedData1stHalfHandicap,
  updatedData2ndHalfHandicap,
  dayjs,
} = require("../libs/utils")

const mb_football = {
  browser: null,
  pageMap: new Map(),
  lastUpdateTime: {},
  gameArray: [],
  cleanupThresholdSeconds: 300, // Cleanup threshold set to 5 minutes

  start: async () => {
    try {
      mb_football.browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
      })

      const pagePromises = urls.map(async (url) => {
        const page = await mb_football.browser.newPage()
        try {
          await page.goto(url, { waitUntil: "networkidle2" })
          mb_football.pageMap.set(url, page)
          mb_football.lastUpdateTime[url] = dayjs().unix() // Store the current unix timestamp
        } catch (error) {
          console.error({
            message: `Failed to load URL ${url}`,
            error: error.message,
            timestamp: new Date().toISOString(),
          })
          await page.close()
        }
      })

      await Promise.all(pagePromises)
      setInterval(mb_football.getLivedata, 2000) // Fetch game data every 2 seconds
      setInterval(() => cleanupOldData(mb_football), 100000) // Cleanup every minute
    } catch (error) {
      console.error({
        message: "Error launching browser",
        error: error.message,
        timestamp: new Date().toISOString(),
      })
    }
  },

  getLivedata: async () => {
    try {
      mb_football.pageMap.forEach(async (page, url) => {
        const gDataHandles = await page.$$("div > div > div.coupon-row")
        // Check if no game data is available and close the page if true
        if (gDataHandles.length === 0) {
          console.log(
            `No more game data available at URL ${url}. Stopping data collection for this game.`,
          )
          await page.close()
          mb_football.pageMap.delete(url)
          delete mb_football.lastUpdateTime[url]
          return
        }

        for (const datahandle of gDataHandles) {
          const data = await mb_football.extractdata(page, datahandle)

          mb_football.processdata(data)
          mb_football.lastUpdateTime[url] = data.time // Update the last known time
        }
      })
    } catch (error) {
      console.error("Error during game data fetching:", error)
    }
  },

  extractdata: async (page, datahandle) => {
    try {
      const IDstamps = page.url().substring(page.url().lastIndexOf("/") + 1)
      const buildSelector = (baseSelector) => `#block${IDstamps}${baseSelector}`

      const time = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.gameTime,
      )

      const score = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.gameScore,
      )

      const teamHome = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.teamHome,
      )

      const teamAway = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.teamAway,
      )

      const homeRate = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.homeRate),
      )

      const drawRate = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.drawRate),
      )

      const awayRate = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.awayRatee),
      )

      const resultStatus = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.resultStatus,
      )

      const fullTimeRTG = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.fullTimeRTG),
      )

      const statFullTime = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.statFullTime),
      )

      const matchWithHandicap = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.matchWithHandicap),
      )
      
      const statusHandicap = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.statHandicap,
      )

      const halfWithMostGoals = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.halfWithMostGoals),
      )

      const statHalfwithMostGoals = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.statHalfwithMostGoals,
      )

      const win1stHalfhandicap = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.win1stHalfhandicap),
      )

      const stat1sthalfHandicap = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.stat1sthalfHandicap,
      )
      
      const win2ndHalfhandicap = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.win2ndHalfhandicap),
      )

      const stat2ndHalfHandicap = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.stat2ndHalfHandicap)
      )

      const correctScore = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.correctScore),
      )

      const statCorrex = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.statCorrex,
      )

      const totalGoals = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.totalGoals),
      )

      const oddTG = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.oddTG),
      )
      const evenTG = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.evenTG),
      )

      const statTotalgoals = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.statTotalgoals,
      )

      const totalGoals1stHalf = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.totalGoals1stHalf),
      )

      const oddTG1 = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.oddTG1),
      )

      const evenTG1 = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.evenTG1),
      )

      const statTotalgoals1stHalf = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.statTotalgoals1stHalf,
      )

      const totalGoals2ndHalf = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.totalGoals2ndHalf),
      )

      const oddTG2 = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.oddTG2),
      )

      const evenTG2 = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.evenTG2),
      )

      const statTotalgoals2ndHalf = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.statTotalgoals2ndHalf)
      )

      const result1stHalfHome = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.result1stHalfHome),
      )

      const result1stHalfDraw = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.result1stHalfDraw),
      )

      const result1stHalfAway = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.result1stHalfAway),
      )

      const stat1stHalfResult = await mb_football.extractElementText(
        page,
        datahandle,
       baseSelectors.stat1stHalfResult,
      )

      // const secondHalfTest = await mb_football.extractElementText(
      //   page,
      //   datahandle,
      //   buildSelector(baseSelectors.secondHalfTest)
      // )
      // console.log("secondHalfTest:", secondHalfTest)

      const result2ndHalfHome = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.result2ndHalfHome),
      )

      const result2ndHalfDraw = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.result2ndHalfDraw),
      )

      const result2ndHalfAway = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.result2ndHalfAway),
      )

      const stat2ndHalfResult = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.stat2ndHalfResult
      )

      const teamScoreResult = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.teamScoreResult),
      )

      const statTeamscoreResult = await mb_football.extractElementText(
        page,
        datahandle,
        baseSelectors.statTeamscoreResult,
      )

      const scoreYesorNo = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.yesNoScore),
      )

        
      const statYesnoScore = await mb_football.extractElementText(
        page,
        datahandle,
        buildSelector(baseSelectors.statYesnoScore)
      )

      return {
        time,
        score,
        teamHome,
        teamAway,
        homeRate,
        drawRate,
        awayRate,
        resultStatus,
        fullTimeRTG,
        statFullTime,
        matchWithHandicap,
        statusHandicap,
        win2ndHalfhandicap,
        stat2ndHalfHandicap,
        win1stHalfhandicap,
        stat1sthalfHandicap,
        correctScore,
        statCorrex,
        totalGoals,
        oddTG,
        evenTG,
        statTotalgoals,
        halfWithMostGoals,
        statHalfwithMostGoals,
        totalGoals1stHalf,
        oddTG1,
        evenTG1,
        statTotalgoals1stHalf,
        totalGoals2ndHalf,
        oddTG2,
        evenTG2,
        statTotalgoals2ndHalf,
        result1stHalfHome,
        result1stHalfDraw,
        result1stHalfAway,
        stat1stHalfResult,
        result2ndHalfHome,
        result2ndHalfDraw,
        result2ndHalfAway,
        stat2ndHalfResult,
        teamScoreResult,
        statTeamscoreResult,
        scoreYesorNo,
        statYesnoScore,
      }
    } catch (error) {
      console.error("Error during data extraction:", error.message)
      return null
    }
  },

  processdata: async (data) => {
    const {
      time,
      score,
      teamHome,
      teamAway,
      homeRate,
      drawRate,
      awayRate,
      resultStatus,
      fullTimeRTG,
      statFullTime,
      matchWithHandicap,
      statusHandicap,
      win1stHalfhandicap,
      stat1sthalfHandicap,
      win2ndHalfhandicap,
      stat2ndHalfHandicap,
      correctScore,
      statCorrex,
      totalGoals,
      oddTG,
      evenTG,
      statTotalgoals,
      halfWithMostGoals,
      statHalfwithMostGoals,
      totalGoals1stHalf,
      oddTG1,
      evenTG1,
      statTotalgoals1stHalf,
      totalGoals2ndHalf,
      oddTG2,
      evenTG2,
      statTotalgoals2ndHalf,
      result1stHalfHome,
      result1stHalfDraw,
      result1stHalfAway,
      stat1stHalfResult,
      result2ndHalfHome,
      result2ndHalfDraw,
      result2ndHalfAway,
      stat2ndHalfResult,
      teamScoreResult,
      statTeamscoreResult,
      scoreYesorNo,
      statYesnoScore,
    } = data

    // Parse Data
    const matchResult = parseMatchResult(
      homeRate,
      drawRate,
      awayRate,
      resultStatus,
    )
  
    const parsedHandicaps = parseDataHandicap(matchWithHandicap, statusHandicap)

    const parsedTG1stHalf = parseTotalGoals1stHalf(totalGoals1stHalf, statTotalgoals1stHalf)

    const parseFTTG = parseData1(fullTimeRTG, teamHome, teamAway, statFullTime)

    const parsedTG2ndHalf = parseTotalGoals2ndHalf(totalGoals2ndHalf, statTotalgoals2ndHalf)

    const tGoals = parseTotalGoals(totalGoals, statTotalgoals)

    const parseScoreDrawYesOrNo = parseScoreDraw(scoreYesorNo, statYesnoScore)

    const parseWithMostScore = parseHalfwithMostScore(
      halfWithMostGoals,
      statHalfwithMostGoals,
    )
    const parseToWin1stHalfHandicap = parseData1stHalfHandicap(
      win1stHalfhandicap,
      stat1sthalfHandicap,
    )
    const parseToWin2ndHalfHandicap = parseData2ndHalfHandicap(
      win2ndHalfhandicap,
      stat2ndHalfHandicap,
    )

    const parseCorrectScore = parseDataCorrectScore(
      correctScore,
      teamHome,
      teamAway,
      statCorrex,
    )
    const parsedTeamScoreResult1 = parseData3(
      teamScoreResult,
      teamHome,
      teamAway,
      statTeamscoreResult,
    )
    const parsedTeamScoreResult2 = parseData4(
      teamScoreResult,
      teamHome,
      teamAway,
      statTeamscoreResult,
    )

    // Directly
    const tGoalsoddEven = parseTGoalsOddEven(oddTG, evenTG, statTotalgoals)

    const tg1stHalfoddEven = parseTGoals1stHalfOddEven(oddTG1, evenTG1, statTotalgoals1stHalf)

    const tg2ndHalfoddEven = parseTGoals2ndHalfOddEven(oddTG2, evenTG2, statTotalgoals2ndHalf)

    const x1stHalf = parseX1stHalf(
      result1stHalfHome,
      result1stHalfDraw,
      result1stHalfAway,
      stat1stHalfResult,
    )
    const x2ndHalf = parseX2ndHalf(
      result2ndHalfHome,
      result2ndHalfDraw,
      result2ndHalfAway,
      stat2ndHalfResult,
    )

    const game = {
      matchResult,
      parseFTTG,
      parseCorrectScore,
      parsedHandicaps,
      parseToWin1stHalfHandicap,
      parseToWin2ndHalfHandicap,
      parsedTG1stHalf,
      tg1stHalfoddEven,
      parsedTG2ndHalf,
      tg2ndHalfoddEven,
      tGoals,
      tGoalsoddEven,
      x1stHalf,
      x2ndHalf,
      parsedTeamScoreResult1,
      parsedTeamScoreResult2,
      parseScoreDrawYesOrNo,
      parseWithMostScore,
    }
                          
    const updatedTG = updateData(game.tGoals || [])
    const updatedHandicap = updateDataHandicap(game.parsedHandicaps || [])
    const updated1stHalfHandicap = updatedData1stHalfHandicap(game.parseToWin1stHalfHandicap || [])
    const updated2ndHalfHandicap = updatedData2ndHalfHandicap(game.parseToWin2ndHalfHandicap || [])
    const updatedTG2ndHalf = updateDataTG2ndHalf(game.parsedTG2ndHalf || [])
    const updatedTG1stHalf = updateDataTG1stHalf(game.parsedTG1stHalf || [])
    
    const update = {
      x: matchResult,
      // xWithUnderOver: parseFTTG,
      // correctScoreFullTime: parseCorrectScore,
      // handicap: updatedHandicap,
      // handicap1stHalf: updated1stHalfHandicap,
      // handicap2ndHalf: updated2ndHalfHandicap,
      // underOver1stHalf: updatedTG1stHalf,
      // oddEven1stHalf: tg1stHalfoddEven,
      // underOver2ndHalf: updatedTG2ndHalf,
      // oddEven2ndHalf: tg2ndHalfoddEven,
      // underOver: updatedTG,
      // oddEvenFullTime: tGoalsoddEven,
      // x1stHalf: x1stHalf,
      // x2ndHalf: x2ndHalf,
      // bothTeamsGoalWin: parsedTeamScoreResult1,
      // bothTeamsGoalWinOrDraw: parsedTeamScoreResult2,
      // bothTeamScore: parseScoreDrawYesOrNo,
      // mostScore: parseWithMostScore,
    }
    // Find existing game data by matching
    const existingGameIndex = mb_football.gameArray.findIndex(
      (item) =>
        _.isEqual(item.x, update.x) &&
        _.isEqual(item.parseFTTG, update.parseFTTG),
    )

    if (existingGameIndex !== -1) {
      const existingGame = mb_football.gameArray[existingGameIndex]

      // Compare and update if changes are detected
      if (
        !_.isEqual(existingGame.matchResult, update.matchResult) ||
        !_.isEqual(existingGame.x, update.x) ||
        !_.isEqual(existingGame.xWithUnderOver, update.xWithUnderOver) ||
        !_.isEqual(
          existingGame.correctScoreFullTime,
          update.correctScoreFullTime,
        ) ||
        !_.isEqual(existingGame.handicap, update.handicap) ||
        !_.isEqual(existingGame.handicap1stHalf, update.handicap1stHalf) ||
        !_.isEqual(existingGame.handicap2ndHalf, update.handicap2ndHalf) ||
        !_.isEqual(existingGame.underOver1stHalf, update.underOver1stHalf) ||
        !_.isEqual(existingGame.oddEven1stHalf, update.oddEven1stHalf) ||
        !_.isEqual(existingGame.underOver2ndHalf, update.underOver2ndHalf) ||
        !_.isEqual(existingGame.oddEven2ndHalf, update.oddEven2ndHalf) ||
        !_.isEqual(existingGame.underOver, update.underOver) ||
        !_.isEqual(existingGame.oddEvenFullTime, update.oddEvenFullTime) ||
        !_.isEqual(existingGame.x1stHalf, update.x1stHalf) ||
        !_.isEqual(existingGame.x2ndHalf, update.x2ndHalf) ||
        !_.isEqual(existingGame.bothTeamsGoalWin, update.bothTeamsGoalWin) ||
        !_.isEqual(
          existingGame.bothTeamsGoalWinOrDraw,
          update.bothTeamsGoalWinOrDraw,
        ) ||
        !_.isEqual(existingGame.bothTeamScore, update.bothTeamScore) ||
        !_.isEqual(existingGame.mostScore, update.mostScore) ||
        existingGame.time !== update.time
      ) {
        console.log(`Changes detected, updating game data...`)
        console.log("Updated MB_FOOTBALL Data:", update)
        mb_football.gameArray[existingGameIndex] = {
          ...existingGame,
          ...update,
        }
        // mb_football.lastUpdateTime[gameId] = gameData.time
      }
      // else {
      //   console.log("No changes detected for the given handicaps.")
      // }
    } else {
      console.log("New game data detected.")
      console.log("New MB_FOOTBALL Data:", update)
      mb_football.gameArray.push(update)
    }
  },

  extractElementText: async (page, datahandle, selector) => {
    try {
      return await page.evaluate(
        (el, selector) => {
          const element = el.querySelector(selector)
          return element ? element.textContent.trim().replace(/\s+/g, " ") : "0"
        },
        datahandle,
        selector,
      )
    } catch (error) {
      const isSessionClosed = error.message.includes("Session closed")
      if (isSessionClosed) {
        console.error("Error fetching data: Page session was closed.")
      } else {
        console.error(
          `Error fetching data for selector ${selector}:`,
          error.message,
        )
      }
      return "Error"
    }
  },
}

module.exports = mb_football
