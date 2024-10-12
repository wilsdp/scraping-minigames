const axios = require("axios")

const { insertMarioJWData } = require("../models/marioModel")
const {
  interval,
  maxRetries,
  retryDelay,
  cleanupThresholdSeconds,
  endpointMario,
} = require("../libs/config")
const {
  getCurrentTimeInSeoul,
  calculateRoundNumber,
  updatePreviousGames,
  addSecondsAndFormat,
  cleanupOldGames,
  tools,
} = require("../libs/utils")

let game
let intervalID = null
let previousGames = []

const mario40s = {
  start: async () => {
    if (intervalID !== null) {
      clearInterval(intervalID)
    }

    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    await mario40s.createGame()
    mario40s.showGame()
    intervalID = setInterval(mario40s.main, 1000)
  },

  main: () => {
    const now = getCurrentTimeInSeoul()
    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    const totalOfSeconds = now.minute() * 60 + now.second()

    if (totalOfSeconds % interval === 0) {
      mario40s.getResult()
    }
    if (totalOfSeconds % interval === 5) {
      // mario40s.showResult()
      mario40s.createGame(now.minute())
      mario40s.showGame()
    }
  },

  createGame: async () => {
    try {
      const now = getCurrentTimeInSeoul()
      const round = calculateRoundNumber(interval)
      if (typeof round === "string") {
        console.error(round)
        return
      }
      const rotation = parseInt(
        `${now.format("YYYYMMDD")}${tools.right(`000${round}`, 4)}`
      )
      if (!previousGames.some((g) => g.round === round)) {
        const totalOfSeconds = now.minute() * 60 + now.second()
        const secondsUntilNextInterval =
          interval - ((totalOfSeconds % interval) % interval)
        const gameDateTime = now
          .clone()
          .add(secondsUntilNextInterval, "seconds")

        game = {
          gameName: "JWC_SUPERMARIO",
          rotation: rotation,
          round: round,
          sg: null,
          bs: null,
          gameDate: now.format("YYYY-MM-DD"),
          regDateTime: now.format("YYYY-MM-DD HH:mm:ss") + ".000",
          gameDateTime: gameDateTime.format("YYYY-MM-DD HH:mm:ss") + ".000",
          resultDateTime: null,
        }
      }
      const responseModel = await insertMarioJWData(game, false)
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
      const urlWithTimestamp = `${endpointMario}?_=${timeStamp}`
      const response = await axios.get(urlWithTimestamp)
      const rData = response.data

      let sg =
        rData.result === 1 ? "silver" : rData.result === 2 ? "gold" : null
      let bs = rData.style === 1 ? "small" : rData.style === 2 ? "big" : null
      let resultDateTime = addSecondsAndFormat(game.gameDateTime, 4)

      game = {
        ...game,
        sg,
        bs,
        resultDateTime: resultDateTime,
      }

      const responseModel = await insertMarioJWData(game, true)
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
        )
        return mario40s.getResult(retryCount + 1)
      } else {
        console.error(
          `\x1b[33mFailed to fetch game results after ${maxRetries} attempts for round ${
            game ? `\x1b[31m${game.round}\x1b[33m` : "Unknown"
          }. Consider notifying the administrator or taking further action.\x1b[0m`
        )
      }
    }
  },

  delay: (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
  },

  showGame: () => {
    timerCountDown = interval * 60
    console.log("NEW GAME: ", game)
  },

  showResult: async () => {
    console.log("LIST RESULTS: ", previousGames)
    await mario40s.delay(10000)
  },
}

module.exports = mario40s
