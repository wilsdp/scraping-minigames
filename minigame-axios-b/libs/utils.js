const dayjs = require("dayjs")
const utc = require("dayjs/plugin/utc")
const timezone = require("dayjs/plugin/timezone")
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Seoul")

// Utility function to get the current time in "Asia/Seoul" timezone
function getCurrentTimeInSeoul() {
  return dayjs().tz("Asia/Seoul")
}

// Utility function for cleaning up old games
function cleanupOldGames(games, cleanupThresholdSeconds) {
  const currentTime = dayjs().unix()
  return games.filter((game) => {
    const gameTime = dayjs(game.gameDateTime).unix()
    return currentTime - gameTime < cleanupThresholdSeconds
  })
}

function updatePreviousGames(previousGames, game) {
  const existingGameIndex = previousGames.findIndex(
    (g) => g.round === game.round
  )
  if (existingGameIndex === -1) {
    previousGames.push({ ...game })
  } else {
    previousGames[existingGameIndex] = { ...game }
  }
}

// Utility function for resultDateTime
function addSecondsAndFormat(
  dateTime,
  secondsToAdd,
  format = "YYYY-MM-DD HH:mm:ss"
) {
  const dayjs = require("dayjs")
  return dayjs(dateTime).add(secondsToAdd, "seconds").format(format) + ".000"
}

const tools = {
  left(str, n) {
    return str.substring(0, n)
  },
  right(str, n) {
    return str.substring(str.length - n, str.length)
  },
}

module.exports = {
  getCurrentTimeInSeoul,
  updatePreviousGames,
  addSecondsAndFormat,
  cleanupOldGames,
  tools,
}
