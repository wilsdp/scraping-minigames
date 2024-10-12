// utils.js
const dayjs = require("dayjs")
const utc = require("dayjs/plugin/utc")
const timezone = require("dayjs/plugin/timezone")
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Seoul")

let previousData = []
let previousDataHandicap = []
let previousData1stHalfHandicap = []
let previousData2ndHalfHandicap = []
let previousDataTG2ndHalf = []
let previousDataTG1stHalf = []

function updatedData2ndHalfHandicap(currentData) {
  if (!currentData) {
    currentData = []
  }

  //Create a map of current data for quick lookup
  const currentMap = new Map()
  currentData.forEach((item, index) => {
    currentMap.set(item.homeStandard, { ...item, index})
  })

  // Iterate over previous data to check for missing elements and mark them as suspended
  const updatedPreviousData = previousData2ndHalfHandicap.map((item) => {
    if (!currentMap.has(item.homeStandard)) {
      return { ...item, status: "SUSPENDED"}
    } else {
      // Update the existing item with current data
      const currentItem = currentMap.get(item.homeStandard)
      return { ...item, ...currentItem}
    }
  })
  //Find new elements in the current data and add them to previous data
  currentData.forEach((item) => {
    if (
      !updatedPreviousData.some(
        (prevItem) => prevItem.homeStandard === item.homeStandard,
      )
    ) {

      updatedPreviousData.push(item)

    }
  })
  // Sort previousData to maintain order if needed
  updatedPreviousData.sort((a, b) => a.index - b.index)

  //Remove index property if it was added
  previousData2ndHalfHandicap = updatedPreviousData.map(({ index, ...rest}) => rest)

  return previousData2ndHalfHandicap
}

function updatedData1stHalfHandicap(currentData) {
  if (!currentData) {
    currentData = []
  }

  //Create a map of current data for quick lookup
  const currentMap = new Map()
  currentData.forEach((item, index) => {
    currentMap.set(item.homeStandard, { ...item, index})
  })

  // Iterate over previous data to check for missing elements and mark them as suspended
  const updatedPreviousData = previousData1stHalfHandicap.map((item) => {
    if (!currentMap.has(item.homeStandard)) {
      return { ...item, status: "SUSPENDED"}
    } else {
      // Update the existing item with current data
      const currentItem = currentMap.get(item.homeStandard)
      return { ...item, ...currentItem}
    }
  })
  //Find new elements in the current data and add them to previous data
  currentData.forEach((item) => {
    if (
      !updatedPreviousData.some(
        (prevItem) => prevItem.homeStandard === item.homeStandard,
      )
    ) {

      updatedPreviousData.push(item)

    }
  })
  // Sort previousData to maintain order if needed
  updatedPreviousData.sort((a, b) => a.index - b.index)

  //Remove index property if it was added
  previousData1stHalfHandicap = updatedPreviousData.map(({ index, ...rest}) => rest)

  return previousData1stHalfHandicap
}

function updateDataHandicap(currentData) {
  if (!currentData) {
    currentData = []
  }

  //Create a map of current data for quick lookup
  const currentMap = new Map()
  currentData.forEach((item, index) => {
    currentMap.set(item.homeStandard, { ...item, index})
  })

  // Iterate over previous data to check for missing elements and mark them as suspended
  const updatedPreviousData = previousDataHandicap.map((item) => {
    if (!currentMap.has(item.homeStandard)) {
      return { ...item, status: "SUSPENDED"}
    } else {
      // Update the existing item with current data
      const currentItem = currentMap.get(item.homeStandard)
      return { ...item, ...currentItem}
    }
  })
  //Find new elements in the current data and add them to previous data
  currentData.forEach((item) => {
    if (
      !updatedPreviousData.some(
        (prevItem) => prevItem.homeStandard === item.homeStandard,
      )
    ) {

      updatedPreviousData.push(item)

    }
  })
  // Sort previousData to maintain order if needed
  updatedPreviousData.sort((a, b) => a.index - b.index)

  //Remove index property if it was added
  previousDataHandicap = updatedPreviousData.map(({ index, ...rest}) => rest)

  return previousDataHandicap
}

function updateDataTG1stHalf(currentData) {
  if (!currentData) {
    currentData = []
  }

  //Create a map of current data for quick lookup
  const currentMap = new Map()
  currentData.forEach((item, index) => {
    currentMap.set(item.standard, { ...item, index})
  })

  // Iterate over previous data to check for missing elements and mark them as suspended
  const updatedPreviousData = previousDataTG1stHalf.map((item) => {
    if (!currentMap.has(item.standard)) {
      return { ...item, status: "SUSPENDED"}
    } else {
      // Update the existing item with current data
      const currentItem = currentMap.get(item.standard)
      return { ...item, ...currentItem}
    }
  })
  //Find new elements in the current data and add them to previous data
  currentData.forEach((item) => {
    if (
      !updatedPreviousData.some(
        (prevItem) => prevItem.standard === item.standard,
      )
    ) {

      updatedPreviousData.push(item)

    }
  })
  // Sort previousData to maintain order if needed
  updatedPreviousData.sort((a, b) => a.index - b.index)

  //Remove index property if it was added
  previousDataTG1stHalf = updatedPreviousData.map(({ index, ...rest}) => rest)

  return previousDataTG1stHalf
}

function updateDataTG2ndHalf(currentData) {
  if (!currentData) {
    currentData = []
  }

  //Create a map of current data for quick lookup
  const currentMap = new Map()
  currentData.forEach((item, index) => {
    currentMap.set(item.standard, { ...item, index })
  })

  // Iterate over previous data to check for missing elements and mark them as suspended
  const updatedPreviousData = previousDataTG2ndHalf.map((item) => {
    if (!currentMap.has(item.standard)) {
      return { ...item, status: "SUSPENDED" }
    } else {
      // Update the existing item with current data
      const currentItem = currentMap.get(item.standard)
      return { ...item, ...currentItem }
    }
  })
  //Find new elements in the current data and add them to previous data
  currentData.forEach((item) => {
    if (
      !updatedPreviousData.some(
        (prevItem) => prevItem.standard === item.standard,
      )
    ) {
      updatedPreviousData.push(item)
    }
  })
  // Sort previousData to maintain order if needed
  updatedPreviousData.sort((a, b) => a.index - b.index)

  //Remove index property if it was added
  previousDataTG2ndHalf = updatedPreviousData.map(({ index, ...rest }) => rest)

  return previousDataTG2ndHalf
}

function updateData(currentData) {
  if (!currentData) {
    currentData = []
  }

  // Create a map of current data for quick lookup
  const currentMap = new Map()
  currentData.forEach((item, index) => {
    currentMap.set(item.standard, { ...item, index })
  })

  // Iterate over previous data to check for missing elements and mark them as suspended
  const updatedPreviousData = previousData.map((item) => {
    if (!currentMap.has(item.standard)) {
      return { ...item, status: "SUSPENDED" }
    } else {
      // Update the existing item with current data
      const currentItem = currentMap.get(item.standard)
      return { ...item, ...currentItem }
    }
  })
  // Find new elements in the current data and add them to previous data
  currentData.forEach((item) => {
    if (
      !updatedPreviousData.some(
        (prevItem) => prevItem.standard === item.standard,
      )
    ) {
      updatedPreviousData.push(item)
    }
  })

  // Sort previousData to maintain order if needed
  updatedPreviousData.sort((a, b) => a.index - b.index)

  //Remove index property if it was added
  previousData = updatedPreviousData.map(({ index, ...rest }) => rest)

  return previousData
}

// Clean Up Data
const cleanupOldData = async (mb_football) => {
  const currentTime = dayjs().unix()
  for (const [url, lastUpdateTime] of Object.entries(
    mb_football.lastUpdateTime,
  )) {
    if (currentTime - lastUpdateTime > mb_football.cleanupThresholdSeconds) {
      console.log(`Cleaning up game data for URL: ${url}`)
      const page = mb_football.pageMap.get(url)
      if (page) {
        await page.close()
        mb_football.pageMap.delete(url)
      }
      delete mb_football.lastUpdateTime[url]
    }
  }
}

// Match Result
function parseMatchResult(homeRate, drawRate, awayRate, resultStatus) {
  // Check if any of the rates are missing or invalid
  let status = resultStatus === "0" ? "HIDE" : "ACTIVE"
  if (
    homeRate === "0" ||
    homeRate === null ||
    isNaN(parseFloat(homeRate)) ||
    drawRate === "0" ||
    drawRate === null ||
    isNaN(parseFloat(drawRate)) ||
    awayRate === "0" ||
    awayRate === null ||
    isNaN(parseFloat(awayRate))
  ) {
    return []
  }

  // If all rates are valid, create the matchResult array
  return [
    {
      homeRate: parseFloat(homeRate),
      drawRate: parseFloat(drawRate),
      awayRate: parseFloat(awayRate),
      status,
    },
  ]
}

// To Win Match With Handicap
function parseDataHandicap(handicapString, statusHandicap) {
  const results = []
  const regex = /\(([\+\-]?\d+\.?\d*)\)\s(\d+\.?\d+)/g
  let matches
  let status = statusHandicap === "0" ? "HIDE" : "ACTIVE"

  // Initialize the default structure for home and away only if needed
  let homeResult = null
  let awayResult = null

  // Keep track of the match index
  let index = 0

  // Process each regex match and assign the values to the correct object
  while ((matches = regex.exec(handicapString)) !== null) {
    if (index === 0) {
      homeResult = {
        homeStandard: parseFloat(matches[1]),
        homeRate: parseFloat(matches[2]),
      }
    } else if (index === 1) {
      awayResult = {
        awayStandard: parseFloat(matches[1]),
        awayRate: parseFloat(matches[2]),
      }
    }
    index++
  }

  // Only add to results if homeResult and awayResult were set
  if (homeResult && awayResult) {
    results.push({
      ...homeResult,
      ...awayResult,
      status: status,
    })
  }

  return results
}

// To Win 1st Half With Handicap
function parseData1stHalfHandicap(win1stHalfhandicap, stat1sthalfHandicap) {
  const results = []
  const regex = /\(([\+\-]?\d+\.?\d*)\)\s(\d+\.?\d+)/g
  let matches
  let status = stat1sthalfHandicap === "0" ? "HIDE" : "ACTIVE"

  // Process each regex match and create result objects for both home and away
  while ((matches = regex.exec(win1stHalfhandicap)) !== null) {
    let homeResult = {
      homeStandard: parseFloat(matches[1]),
      homeRate: parseFloat(matches[2]),
    }

    matches = regex.exec(win1stHalfhandicap)
    if (matches) {
      let awayResult = {
        awayStandard: parseFloat(matches[1]),
        awayRate: parseFloat(matches[2]),
      }

      // Add both home and away results to the results array
      results.push({
        ...homeResult,
        ...awayResult,
        status: status,
      });
    }
  }

  return results
}

// To Win 2nd Half With Handicap
function parseData2ndHalfHandicap(win2ndHalfhandicap, stat2ndHalfHandicap) {
  const results = []
  const regex = /\(([\+\-]?\d+\.?\d*)\)\s(\d+\.?\d+)/g
  let matches
  let status = stat2ndHalfHandicap === "0" ? "HIDE" : "ACTIVE"

  // Process each regex match and create result objects for both home and away
  while ((matches = regex.exec(win2ndHalfhandicap)) !== null) {
    let homeResult = {
      homeStandard: parseFloat(matches[1]),
      homeRate: parseFloat(matches[2]),
    }

    matches = regex.exec(win2ndHalfhandicap)
    if (matches) {
      let awayResult = {
        awayStandard: parseFloat(matches[1]),
        awayRate: parseFloat(matches[2]),
      }

      // Add both home and away results to the results array
      results.push({
        ...homeResult,
        ...awayResult,
        status: status,
      });
    }
  }

  return results
}

// Full Time Result + Total Goals
function parseData1(fullTimeRTG, teamHome, teamAway, statFullTime) {
  const regex =
    /([\w\s-]+(?:To Win|To Draw|Draw)\s\+\sTotal\s(?:Under|Over)\s(\d+\.\d+))\s(\d+\.\d+)\s(\d+\.\d+)/g
  let matches
  const results = []

  while ((matches = regex.exec(fullTimeRTG)) !== null) {
    const team = matches[1].trim()
    const standard = parseFloat(matches[2])
    const yesRate = parseFloat(matches[3])
    const noRate = parseFloat(matches[4])

    // Determine status based on the provided statusFT value
    let status = "ACTIVE"
    if (statFullTime === "0") {
      status = "HIDE"
    }

    // Identify team type (home, away, or draw)
    let teamType = "draw"
    if (team.includes(teamHome)) {
      teamType = "home"
    } else if (team.includes(teamAway)) {
      teamType = "away"
    }

    let type
    if (team.includes("Under")) {
      type = "Under"
    } else if (team.includes("Over")) {
      type = "Over"
    }

    // Skip entries with "Or" in the team name
    if (!team.includes("Or")) {
      results.push({ team: teamType, standard, type, yesRate, noRate, status })
    }
  }

  return results
}

// Correct Score
function parseDataCorrectScore(correctScore, teamHome, teamAway, statCorrex) {
  // Regex to capture scores and rate, without needing a team name
  const regex = /\((\d+)\s*-\s*(\d+)\)\s*([\d.]+)/g
  const results = []
  let match

  while ((match = regex.exec(correctScore)) !== null) {
    const homeScore = parseInt(match[1], 10)
    const awayScore = parseInt(match[2], 10)
    const rate = parseFloat(match[3])

    let status = "ACTIVE"
    if (statCorrex === "0") {
      status = "HIDE"
    }

    // Determine the correct team name
    let teamName = ""
    if (homeScore > awayScore) {
      teamName = teamHome
    } else if (homeScore < awayScore) {
      teamName = teamAway
    } else {
      teamName = "Draw"
    }

    results.push({
      teamName: teamName,
      homeScore: homeScore,
      awayScore: awayScore,
      rate: rate,
      status,
    })
  }

  return results
}

// Team Result + Score
function parseData3(fullTimeRTG, teamHome, teamAway, statTeamscoreResult) {
  const regex = /([\w\s+]+) (\d+\.\d+) (\d+\.\d+)/g
  let matches
  const results = []

  while ((matches = regex.exec(fullTimeRTG)) !== null) {
    const type = matches[1].trim() // Full description
    const yesRate = parseFloat(matches[2])
    const noRate = parseFloat(matches[3])

    // Skip if "Or" is present in the type
    if (type.includes("Or")) {
      continue
    }

    // Default status, change based on specific conditions
    let status = "ACTIVE"
    if (statTeamscoreResult === "0") {
      status = "HIDE"
    }

    // Identify team type (home, away, or draw)
    let teamType
    if (type.includes(`Both Teams To Score + ${teamHome} To Win`)) {
      teamType = "firstTeamWin"
    } else if (type.includes(`Both Teams To Score + ${teamAway} To Win`)) {
      teamType = "secondTeamWin"
    } else if (type.includes(`Both Teams To Score + Draw`)) {
      teamType = "draw"
    }

    // Construct the result object
    results.push({ type: teamType, yesRate, noRate, status })
  }

  return results
}

function parseData4(fullTimeRTG, teamHome, teamAway, statTeamscoreResult) {
  const regex = /([\w\s+]+) (\d+\.\d+) (\d+\.\d+)/g
  let matches
  const results = []

  while ((matches = regex.exec(fullTimeRTG)) !== null) {
    const type = matches[1].trim() // Full description
    const yesRate = parseFloat(matches[2])
    const noRate = parseFloat(matches[3])

    // Only process if "Or" is present in the type
    if (!type.includes("Or")) {
      continue
    }

    // Default status, change based on specific conditions
    let status = "ACTIVE"
    if (statTeamscoreResult === "0") {
      status = "HIDE"
    }

    // Identify team type (home, away, or both)
    let teamType
    if (type.includes(`Both Teams To Score + ${teamHome} To Win Or Draw`)) {
      teamType = "firstTeamWinOrDraw"
    } else if (
      type.includes(
        `Both Teams To Score + ${teamHome} To Win Or ${teamAway} To Win`,
      )
    ) {
      teamType = "firstTeamWinOrSecondTeamWin"
    } else if (
      type.includes(`Both Teams To Score + ${teamAway} To Win Or Draw`)
    ) {
      teamType = "secondTeamWinOrDraw"
    }

    // Construct the result object
    results.push({ type: teamType, yesRate, noRate, status })
  }

  return results
}

// TotalGoals
function parseTotalGoals(totalGoals, statTotalgoals = "ACTIVE") {
  const regex = /\(([\+\-]?\d+\.?\d*)\)\s(\d+\.?\d+)/g
  let matches
  let status = statTotalgoals === "0" ? "HIDE" : "ACTIVE"

  // Initialize an empty results array
  const results = []
  let currentStandard = null
  let underRate = null

  // Process each regex match and assign the values to the correct object
  while ((matches = regex.exec(totalGoals)) !== null) {
    if (currentStandard === null) {
      // Capture the standard
      currentStandard = parseFloat(matches[1])
      underRate = parseFloat(matches[2])
    } else {
      // Capture the over rate and create the object
      results.push({
        standard: currentStandard,
        underRate: underRate,
        overRate: parseFloat(matches[2]),
        status: status,
      })
      // Reset for the next set of data
      currentStandard = null
    }
  }

  return results
}

// Total Goals 1st Half
function parseTotalGoals1stHalf(totalGoals2ndHalf, statTotalgoals1stHalf = "ACTIVE") {
  const regex = /\(([\+\-]?\d+\.?\d*)\)\s(\d+\.?\d+)/g
  let matches
  let status = statTotalgoals1stHalf === "0" ? "HIDE" : "ACTIVE"

  // Initialize an empty results array
  const results = []
  let currentStandard = null
  let underRate = null

  // Process each regex match and assign the values to the correct object
  while ((matches = regex.exec(totalGoals2ndHalf)) !== null) {
    if (currentStandard === null) {
      // Capture the standard
      currentStandard = parseFloat(matches[1])
      underRate = parseFloat(matches[2])
    } else {
      // Capture the over rate and create the object
      results.push({
        standard: currentStandard,
        underRate: underRate,
        overRate: parseFloat(matches[2]),
        status: status,
      })
      // Reset for the next set of data
      currentStandard = null
    }
  }

  return results
}

//Total Goals 2nd Half 
function parseTotalGoals2ndHalf(totalGoals2ndHalf, statTotalgoals2ndHalf = "ACTIVE") {
  const regex = /\(([\+\-]?\d+\.?\d*)\)\s(\d+\.?\d+)/g
  let matches
  let status = statTotalgoals2ndHalf === "0" ? "HIDE" : "ACTIVE"

  // Initialize an empty results array
  const results = []
  let currentStandard = null
  let underRate = null

  // Process each regex match and assign the values to the correct object
  while ((matches = regex.exec(totalGoals2ndHalf)) !== null) {
    if (currentStandard === null) {
      // Capture the standard
      currentStandard = parseFloat(matches[1])
      underRate = parseFloat(matches[2])
    } else {
      // Capture the over rate and create the object
      results.push({
        standard: currentStandard,
        underRate: underRate,
        overRate: parseFloat(matches[2]),
        status: status,
      })
      // Reset for the next set of data
      currentStandard = null
    }
  }

  return results
}



// Total Goals Odd Even
function parseTGoalsOddEven(oddTG, evenTG, statTotalgoals) {
  // Check if any of the rates are missing or invalid
  let status = statTotalgoals === "0" ? "HIDE" : "ACTIVE"
  if (
    oddTG === "0" ||
    oddTG === null ||
    isNaN(parseFloat(oddTG)) ||
    evenTG === "0" ||
    evenTG === null ||
    isNaN(parseFloat(evenTG))
  ) {
    return []
  }

  // If all rates are valid, create the matchResult array
  return [
    {
      oddRate: parseFloat(oddTG),
      evenRate: parseFloat(evenTG),
      status,
    },
  ]
}

function parseTGoals1stHalfOddEven(oddTG, evenTG, statTotalgoals1stHalf) {
  // Check if any of the rates are missing or invalid
  let status = statTotalgoals1stHalf === "0" ? "HIDE" : "ACTIVE"
  if (
    oddTG === "0" ||
    oddTG === null ||
    isNaN(parseFloat(oddTG)) ||
    evenTG === "0" ||
    evenTG === null ||
    isNaN(parseFloat(evenTG))
  ) {
    return []
  }

  // If all rates are valid, create the matchResult array
  return [
    {
      oddRate: parseFloat(oddTG),
      evenRate: parseFloat(evenTG),
      status,
    },
  ]
}

function parseTGoals2ndHalfOddEven(oddTG, evenTG, statTotalgoals2ndHalf) {
  // Check if any of the rates are missing or invalid
  let status = statTotalgoals2ndHalf === "0" ? "HIDE" : "ACTIVE"
  if (
    oddTG === "0" ||
    oddTG === null ||
    isNaN(parseFloat(oddTG)) ||
    evenTG === "0" ||
    evenTG === null ||
    isNaN(parseFloat(evenTG))
  ) {
    return []
  }

  // If all rates are valid, create the matchResult array
  return [
    {
      oddRate: parseFloat(oddTG),
      evenRate: parseFloat(evenTG),
      status,
    },
  ]
}

// x1stHalf 
function parseX1stHalf(
  resultHalfhome,
  resultHalfdraw,
  resultHalfaway,
  stat1stHalfResult,
) {
  // Check if any of the rates are missing or invalid
  let status = stat1stHalfResult === "0" ? "HIDE" : "ACTIVE"
  if (
    resultHalfhome === "0" ||
    resultHalfhome === null ||
    isNaN(parseFloat(resultHalfhome)) ||
    resultHalfdraw === "0" ||
    resultHalfdraw === null ||
    isNaN(parseFloat(resultHalfdraw)) ||
    resultHalfaway === "0" ||
    resultHalfaway === null ||
    isNaN(parseFloat(resultHalfaway))
  ) {
    return []
  }
  // If all rates are valid, create the matchResult array
  return [
    {
      homeRate: parseFloat(resultHalfhome),
      drawRate: parseFloat(resultHalfdraw),
      awayRate: parseFloat(resultHalfaway),
      status,
    },
  ]
}

function parseX2ndHalf(
  resultHalfhome,
  resultHalfdraw,
  resultHalfaway,
  stat2ndHalfResult,
) {
  // Check if any of the rates are missing or invalid
  let status = stat2ndHalfResult === "0" ? "HIDE" : "ACTIVE"
  if (
    resultHalfhome === "0" ||
    resultHalfhome === null ||
    isNaN(parseFloat(resultHalfhome)) ||
    resultHalfdraw === "0" ||
    resultHalfdraw === null ||
    isNaN(parseFloat(resultHalfdraw)) ||
    resultHalfaway === "0" ||
    resultHalfaway === null ||
    isNaN(parseFloat(resultHalfaway))
  ) {
    return []
  }
  // If all rates are valid, create the matchResult array
  return [
    {
      homeRate: parseFloat(resultHalfhome),
      drawRate: parseFloat(resultHalfdraw),
      awayRate: parseFloat(resultHalfaway),
      status,
    },
  ]
}

// Score Draw
function parseScoreDraw(ratesString, statYesnoScore) {
  // Split the input string by spaces
  const rates = ratesString.split(" ")

  // Ensure the array has two elements
  if (rates.length === 2) {
    const yesRate = parseFloat(rates[0])
    const noRate = parseFloat(rates[1])

    let status = "ACTIVE"
    if (statYesnoScore === "0") {
      status = "HIDE"
    }

    // Return the parsed rates as an object
    return {
      yesRate: yesRate,
      noRate: noRate,
      status,
    }
  } else {
    return []
  }
}

// Half With Most Score
function parseHalfwithMostScore(
  halfWithMostscoreString,
  statHalfwithMostGoals = "ACTIVE",
) {
  // Split the raw data string by spaces to isolate the rates
  const rates = halfWithMostscoreString
    .split(" ")
    .map((rate) => parseFloat(rate))
  let status = "ACTIVE"

  // Set the status based on the statusHandicap parameter
  if (statHalfwithMostGoals === "0") {
    status = "HIDE"
  }

  // Check if we have exactly three rates (expected input format)
  if (rates.length === 3) {
    return {
      half1stRate: rates[0],
      drawEqualNumberRate: rates[1],
      half2ndRate: rates[2],
      status,
    }
  } else {
    // Return an error object or null if the data format is incorrect
    return []
  }
}

module.exports = {
  cleanupOldData,
  parseMatchResult,
  parseDataHandicap,
  parseData1stHalfHandicap,
  parseData2ndHalfHandicap,
  parseData1,
  parseDataCorrectScore,
  parseData3,
  parseData4,
  parseTotalGoals,
  parseTotalGoals1stHalf,
  parseTotalGoals2ndHalf,
  parseScoreDraw,
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
}
