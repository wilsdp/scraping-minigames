const axios = require("axios")

const { insertSplitData } = require("../models/splitModel")
const {
  interval,
  maxRetries,
  retryDelay,
  cleanupThresholdSeconds,
  endpointSplit,
} = require("../libs/config")
const {
  getCurrentTimeInSeoul,
  updatePreviousGames,
  addSecondsAndFormat,
  cleanupOldGames,
  tools,
} = require("../libs/utils")

let game
let intervalID = null
let previousGames = []

const split30s = {
  start: async () => {
    if (intervalID !== null) {
      clearInterval(intervalID)
    }

    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    await split30s.createGame()
    await split30s.showGame()
    intervalID = setInterval(split30s.main, 1000)
  },

  main: () => {
    const now = getCurrentTimeInSeoul()

    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    if ((now.second() + 1) % interval === 0) {
      split30s.getResult()
    }
    if (now.second() % interval === 5) {
      // split30s.showResult()
      split30s.createGame(now.minute())
      split30s.showGame()
    }
  },

  createGame: async () => {
    try {
      const now = getCurrentTimeInSeoul()
      const totalSeconds = now.hour() * 3600 + now.minute() * 60 + now.second()
      const round = Math.floor(totalSeconds / interval) + 1
      const rotation = parseInt(
        `${now.format("YYYYMMDD")}${tools.right(`000${round}`, 4)}`
      )
      if (!previousGames.some((g) => g.round === round)) {
        const secondsUntilNextInterval = interval - (now.second() % interval)
        const gameDateTime = now
          .clone()
          .add(secondsUntilNextInterval, "seconds")
        game = {
          gameName: "GST_SPLIT30S",
          rotation: rotation,
          round: round,
          suits: null,
          hc: null,
          oc: null,
          oe: null,
          uo: null,
          gameDate: now.format("YYYY-MM-DD"),
          regDateTime: now.format("YYYY-MM-DD HH:mm:ss") + ".000",
          gameDateTime: gameDateTime.format("YYYY-MM-DD HH:mm:ss") + ".000",
          resultDateTime: null,
        }
      }
      const responseModel = await insertSplitData(game, false)
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

  getResult: async (retryCount = 0) => {
    try {
      const timeStamp = Date.now()
      const urlWithTimestamp = `${endpointSplit}?_=${timeStamp}`
      const response = await axios.get(urlWithTimestamp)
      const rData = response.data

      let suits =
        rData.s === "s"
          ? "spade"
          : rData.s === "d"
          ? "diamond"
          : rData.s === "c"
          ? "clover"
          : rData.s === "h"
          ? "heart"
          : null
      const hc = rData.hc
      const oc = rData.oc
      const oe = rData.o
      const uo = rData.u
      let resultDateTime = addSecondsAndFormat(game.gameDateTime, 5)
      game = {
        ...game,
        suits,
        hc,
        oc,
        oe,
        uo,
        resultDateTime: resultDateTime,
      }

      const responseModel = await insertSplitData(game, true)
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
        `Error fetching game results for round ${
          game ? game.round : "Unknown"
        }:`,
        error
      )
      if (retryCount < maxRetries) {
        console.log(`Retrying... Attempt ${retryCount + 1} of ${maxRetries}`)
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * Math.pow(2, retryCount))
        ) // Exponential backoff
        return split30s.getResult(retryCount + 1) // Recursive retry
      } else {
        console.error(
          `Failed to fetch game results after ${maxRetries} attempts for round ${
            game ? game.round : "Unknown"
          }. Consider notifying the administrator or taking further action.`
        )
      }
    }
  },

  delay: (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
  },

  showGame: () => {
    console.log("NEXT GAME: ", game)
  },

  showResult: async () => {
    console.log("LIST RESULTS: ", previousGames)
    await split30s.delay(10000)
  },
}

module.exports = split30s
