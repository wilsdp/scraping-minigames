// const dayjs = require('dayjs')
// const utc = require('dayjs/plugin/utc')
// const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

// dayjs.extend(utc)
// dayjs.extend(timezone)
// dayjs.tz.setDefault('Asia/Seoul')

// // server / local time depend on your pc
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

// // always dayjs.tz.setDefault('Asia/Seoul')
// console.log(dayjs().tz().format('YYYY-MM-DD HH:mm:ss'))

function getCurrentRound(intervalMinutes, maxRounds) {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0))
    const elapsedTimeMs = new Date() - startOfDay;
    const elapsedTimeMinutes = elapsedTimeMs / 60000;
    let currentRound = Math.floor(elapsedTimeMinutes / intervalMinutes) + 1
    if (currentRound > maxRounds) {
        currentRound = maxRounds
    }
    const dateStr = now.toISOString().split('T')[0].replace(/-/g, '')
    const roundStr = currentRound.toString().padStart(4, '0')
    return dateStr + roundStr
}

// Usage
const intervalMinutes = 3; // Interval of 5 minutes
const maxRounds = 2880; // Maximum of 288 rounds per day
console.log(getCurrentRound(intervalMinutes, maxRounds))