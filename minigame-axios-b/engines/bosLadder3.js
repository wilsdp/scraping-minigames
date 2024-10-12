const axios = require("axios")

const { insertBl3Data } = require("../models/bl3Model")

const {
  interval_3,
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
  tools,
} = require("../libs/utils")

let game
let intervalID = null
let previousGames = []

const bosLadder3 = {
  start: async () => {
    const now = getCurrentTimeInSeoul()
    if (intervalID !== null) {
      clearInterval(intervalID)
    }

    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    await bosLadder3.createGame(now.minute())
    bosLadder3.showGame()
    intervalID = setInterval(bosLadder3.main, 1000)
  },

  main: () => {
    const now = getCurrentTimeInSeoul()
    previousGames = cleanupOldGames(previousGames, cleanupThresholdSeconds)

    if ((now.minute() + 1) % interval_3 === 0 && now.second() === 58) {
      bosLadder3.getResult()
    }
    if (now.minute() % interval_3 === 0 && now.second() === 5) {
      bosLadder3.showResult()
      bosLadder3.createGame(now.minute() + 1)
      bosLadder3.showGame()
    }
  },

  createGame: async (min) => {
    try {
      const now = getCurrentTimeInSeoul()
      const round =
        bosLadder3.getRound(now.hour() * 3600 + min * 60 + now.second()) /
        (interval_3 * 60)
      const rotation = parseInt(
        `${now.format("YYYYMMDD")}${tools.right(`000${round}`, 4)}`
      )

      if (!previousGames.some((g) => g.round === round)) {
        const minutesUntilNextInterval =
          (interval_3 - ((now.minute() + 1) % interval_3)) % interval_3
        const gameDateTime = now
          .clone()
          .add(minutesUntilNextInterval, "minutes")
          .second(60)

        game = {
          gameName: "BOS_LADDER3M",
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
      const responseModel = await insertBl3Data(game, false)
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
        params: { ld_mode: "3" },
        headers: {
          cookie:
            "AWSALB=0DrX1dWx6uFcoM0oW6a68gK%2F9j3fMek0CBEdKc2r47RjhIjp99YJN7Z7z%2BVhPFHPaVqR1ZW%2BcQsJwEBUz1IMJd32cq4qZ5Hduqepi5ZFbkzybhh2xR7PM7Pst3ZF; AWSALBCORS=0DrX1dWx6uFcoM0oW6a68gK%2F9j3fMek0CBEdKc2r47RjhIjp99YJN7Z7z%2BVhPFHPaVqR1ZW%2BcQsJwEBUz1IMJd32cq4qZ5Hduqepi5ZFbkzybhh2xR7PM7Pst3ZF; PHPSESSID=qr3bos6fp4p5g2k0n9oh9per7l; 2a0d2363701f23f8a75028924a3af643=MjIyLjEyNy4xODkuMjQ5",
          "Content-Type":
            "multipart/form-data; boundary=---011000010111000001101001",
        },
        data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="ld_mode"\r\n\r\n3\r\n-----011000010111000001101001--\r\n',
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

      //   Insert Data into MSSQL Database
      const responseModel = await insertBl3Data(game, true)
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
        return bosLadder3.getResult(retryCount + 1) // Recursive retry
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
    while (sec % (interval_3 * 60) != 0) {
      sec++
    }
    return sec
  },

  delay: (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
  },

  showResult: async () => {
    console.log("LIST RESULTS: ", previousGames)
    await bosLadder3.delay(10000)
  },
}

module.exports = bosLadder3
