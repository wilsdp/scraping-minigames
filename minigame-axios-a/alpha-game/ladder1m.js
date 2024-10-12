const axios = require("axios")

const { insertAL1Data } = require("../models/ladder1Model")

const {
  interval,
  maxRetries,
  retryDelay,
  cleanupThresholdSeconds,
  endpointLAD,
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

const ladder1m = {
  start: async () => {
    if (intervalID !== null) {
      clearInterval(intervalID)
    }

    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    await ladder1m.createGame()
    ladder1m.showGame()
    intervalID = setInterval(ladder1m.main, 1000)
  },

  main: function () {
    const now = getCurrentTimeInSeoul()
    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    if (now.second() === 0) {
      ladder1m.getResult()
    }
    if (now.second() === 11) {
      const currentRound = getRound(now.hour() * 3600 + now.minute() * 60)
      if (!previousGames.some((g) => g.round === currentRound)) {
        ladder1m.createGame()
        ladder1m.showGame()
        ladder1m.showResult()
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
          gameName: "ALP_LADDER1M",
          rotation,
          round,
          lr: null,
          tf: null,
          oe: null,
          lroe: null,
          gameDate: now.format("YYYY-MM-DD"),
          regDateTime: now.format("YYYY-MM-DD HH:mm:ss") + ".000",
          gameDateTime: gameDateTime.format("YYYY-MM-DD HH:mm:ss") + ".000",
          resultDateTime: null,
        }
      }

      const responseModel = await insertAL1Data(game, false)
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
      const urlWithTimestamp = `${endpointLAD}?_=${timeStamp}`
      const response = await axios.get(urlWithTimestamp)
      const rData = response.data

      let lr =
        rData.ladderStart === "1"
          ? "left"
          : rData.ladderStart === "2"
          ? "right"
          : null
      let tf =
        rData.ladderShape === "31110"
          ? "3"
          : rData.ladderShape === "41111"
          ? "4"
          : null
      let oe =
        rData.ladderResult === "1"
          ? "odd"
          : rData.ladderResult === "2"
          ? "even"
          : null
      let lroe = lr + oe
      let resultDateTime = addSecondsAndFormat(game.gameDateTime, 11)

      game = {
        ...game,
        lr,
        tf,
        oe,
        lroe,
        resultDateTime: resultDateTime,
      }

      const responseModel = await insertAL1Data(game, true)
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
        return ladder1m.getResult(retryCount + 1) // Recursive retry
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

  showResult: async () => {
    console.log("RESULTS: ", previousGames)
    await ladder1m.delay(10000)
  },
}

module.exports = ladder1m
