const axios = require("axios")

const { insertPk1Data } = require("../models/penaltykick1Model")

const {
  interval,
  maxRetries,
  retryDelay,
  cleanupThresholdSeconds,
  endpointPK,
} = require("../libs/config")

const {
  getCurrentTimeInSeoul,
  updatePreviousGames,
  addSecondsAndFormat,
  cleanupOldGames,
  getRound,
  tools,
} = require("../libs/utils")

let game
let intervalID = null
let previousGames = []

const penaltykick1m = {
  start: async () => {
    if (intervalID !== null) {
      clearInterval(intervalID)
    }

    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    await penaltykick1m.createGame()
    penaltykick1m.showGame()
    intervalID = setInterval(penaltykick1m.main, 1000)
  },

  main: () => {
    const now = getCurrentTimeInSeoul()
    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    if (now.second() === 0) {
      penaltykick1m.getResult()
    }
    if (now.second() === 11) {
      const currentRound = getRound(now.hour() * 3600 + now.minute() * 60)
      if (!previousGames.some((g) => g.round === currentRound)) {
        penaltykick1m.createGame()
        penaltykick1m.showGame()
        penaltykick1m.showResult()
      }
    }
  },

  createGame: async () => {
    try {
      const now = getCurrentTimeInSeoul()
      const round =
        getRound(now.hour() * 3600 + now.minute() * 60 + now.second()) /
        (interval * 60)
      const rotation = parseInt(
        `${now.format("YYYYMMDD")}${tools.right(`000${round}`, 4)}`
      )
      if (!previousGames.some((g) => g.round === round)) {
        const gameDateTime = now.clone().add(1, "minute").second(0)

        game = {
          gameName: "ALP_PENALTYKICK1M",
          rotation: rotation,
          round: round,
          kk: null,
          gameDate: now.format("YYYY-MM-DD"),
          regDateTime: now.format("YYYY-MM-DD HH:mm:ss") + ".000",
          gameDateTime: gameDateTime.format("YYYY-MM-DD HH:mm:ss") + ".000",
          resultDateTime: null,
        }
      }

      const responseModel = await insertPk1Data(game, false)
      if (!responseModel.success) {
        throw new Error(responseModel.error)
      } else {
        console.log(
          `\x1b[32mNext\x1b[0m \x1b[31mRound\x1b[0m \x1b[33m${game.round}\x1b[0m \x1b[32minserted successfully.\x1b[0m`
        )
        updatePreviousGames(previousGames, game)
      }
    } catch (err) {
      console.error({
        message: "Error during game creation",
        error: err.message,
        gameName: game ? game.gameName : "Unknown",
        rotation: game ? game.rotation : "Unknown",
        timestamp: new Date().toISOString(),
      })

      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
      ) {
        console.warn(
          "Validation or uniqueness constraint failed. This may indicate duplicate game creation attempts."
        )
      } else {
        console.error(
          "An unexpected error occurred, which may require immediate attention."
        )
      }

      return { success: false, error: err.message }
    }
  },

  showGame: () => {
    console.log("NEW GAME: ", game)
  },

  getResult: async (retryCount = 0) => {
    try {
      const timeStamp = Date.now()
      const urlWithTimestamp = `${endpointPK}?_=${timeStamp}`
      const response = await axios.get(urlWithTimestamp)
      const rData = response.data

      const intStart = parseInt(rData.intStart)
      const intResult = parseInt(rData.intResult)
      let kk =
        intStart === intResult
          ? "keeper"
          : intStart === null || intResult === null
          ? null
          : "kicker"
      let resultDateTime = addSecondsAndFormat(game.gameDateTime, 11)

      game = {
        ...game,
        kk,
        resultDateTime: resultDateTime,
      }

      const responseModel = await insertPk1Data(game, true)
      if (!responseModel.success) {
        throw new Error(responseModel.error)
      } else {
        console.log(
          `\x1b[31m${game.gameName}\x1b[0m \x1b[33m${game.round}\x1b[0m \x1b[32mupdated data successfully.\x1b[0m `
        )
        updatePreviousGames(previousGames, game)
      }
    } catch (error) {
      console.error(
        `Error fetching game results for round ${game.round}:`,
        error
      )
      if (retryCount < maxRetries) {
        console.log(`Retrying... Attempt ${retryCount + 1} of ${maxRetries}`)
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        await penaltykick1m.getResult(retryCount + 1)
      } else {
        console.error(
          `Failed to fetch game results after ${maxRetries} attempts for round ${game.round}. Consider notifying the administrator or taking further action.`
        )
      }
    }
  },

  delay: (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
  },

  showResult: async () => {
    console.log("RESULTS: ", previousGames)
    await penaltykick1m.delay(10000)
  },
}

module.exports = penaltykick1m
