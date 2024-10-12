const axios = require("axios")

const { insertBl1Data } = require("../models/bl1Model")

const {
  interval_1,
  maxRetries,
  retryDelay,
  cleanupThresholdSeconds,
  endpoint,
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

const bosLadder1 = {
  start: async () => {
    const now = getCurrentTimeInSeoul()

    if (intervalID !== null) {
      clearInterval(intervalID)
    }

    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    await bosLadder1.createGame(now.minute())
    await bosLadder1.showGame()
    intervalID = setInterval(bosLadder1.main, 1000)
  },

  main: () => {
    const now = getCurrentTimeInSeoul()

    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    if (now.second() === 58) {
      bosLadder1.getResult()
    }
    if (now.minute() % interval_1 === 0 && now.second() === 0) {
      bosLadder1.showResult()
      bosLadder1.createGame(now.minute() + 1)
      bosLadder1.showGame()
    }
  },

  createGame: async (min) => {
    try {
      const now = getCurrentTimeInSeoul()
      const round =
        bosLadder1.getRound(now.hour() * 3600 + min * 60 + now.second()) /
        (interval_1 * 60)
      const rotation = parseInt(
        `${now.format("YYYYMMDD")}${tools.right(`000${round}`, 4)}`
      )

      if (!previousGames.some((g) => g.round === round)) {
        const minutesUntilNextInterval =
          (interval_1 - ((now.minute() + 1) % interval_1)) % interval_1
        const gameDateTime = now
          .clone()
          .add(minutesUntilNextInterval, "minutes")
          .second(60)

        game = {
          gameName: "BOS_LADDER1M",
          rotation: rotation,
          round: round,
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
      const responseModel = await insertBl1Data(game, false)
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
    console.log("NEXT GAME: ", game)
  },

  getResult: async (retryCount = 0) => {
    try {
      const options = {
        method: "POST",
        url: endpoint,
        params: { ld_mode: "1" },
        headers: {
          cookie:
            "AWSALB=gPUY%2Fr0%2BUd5dQJ5efg4oYv8fo8jjzWbyi7RnyjfoNy63JkaLBsbJBTdZVMQO2poaGLfSBWR1Yv%2B2GnAV5MP2E%2BPXwY7PNmizP0XEZa0IBElzQFkUcGinBuyQGJnJ; AWSALBCORS=gPUY%2Fr0%2BUd5dQJ5efg4oYv8fo8jjzWbyi7RnyjfoNy63JkaLBsbJBTdZVMQO2poaGLfSBWR1Yv%2B2GnAV5MP2E%2BPXwY7PNmizP0XEZa0IBElzQFkUcGinBuyQGJnJ; PHPSESSID=08ac4kd5ano2u6ush26dm6lg01; 2a0d2363701f23f8a75028924a3af643=MjIyLjEyNy4xODkuMjQ5",
          "Content-Type":
            "multipart/form-data; boundary=---011000010111000001101001",
        },
        data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="Id_mode"\r\n\r\n1\r\n-----011000010111000001101001--\r\n',
      }
      const response = await axios.request(options)
      const rData = response.data

      let lr =
        rData.start_point === "first"
          ? "left"
          : rData.start_point === "second"
          ? "right"
          : null
      let tf =
        rData.ladder_type === "type1"
          ? "three"
          : rData.ladder_type === "type2"
          ? "four"
          : null
      let oe = rData.answer
      let lroe = lr + oe
      let resultDateTime = addSecondsAndFormat(game.gameDateTime, 4)

      game = {
        ...game,
        lr,
        tf,
        oe,
        lroe,
        resultDateTime,
      }

      // Insert Data into MSSQL Database
      const responseModel = await insertBl1Data(game, true)
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
        return angelDemon40s.getResult(retryCount + 1)
      } else {
        console.error(
          `\x1b[33mFailed to fetch game results after ${maxRetries} attempts for round ${
            game ? `\x1b[31m${game.round}\x1b[33m` : "Unknown"
          }. Consider notifying the administrator or taking further action.\x1b[0m`
        )
      }
    }
  },

  getRound: (v) => {
    var sec = v
    while (sec % (interval_1 * 60) != 0) {
      sec++
    }
    return sec
  },

  delay: (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
  },

  showResult: async () => {
    console.log("LIST RESULTS: ", previousGames)
    await bosLadder1.delay(10000)
  },
}

module.exports = bosLadder1
