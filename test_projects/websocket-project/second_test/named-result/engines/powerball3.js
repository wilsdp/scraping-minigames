const moment = require('moment-timezone');
const axios = require('axios');
const tools = require('../libs/tools');
const { db } = require('../libs/db');

const game = 'powerball3';
const gameCycle = 300000; // 5 minutes in milliseconds
const maxRound = 2880; // 24 hours * 60 minutes * 60 seconds / 30 seconds
const endpoint = 'https://named.com/data/minigame/nball/powerball3/result.json';
let lastDateRound = -1;

const powerball3 = {
  start: () => {
    // Start scraping data immediately
    setInterval(powerball3.scrapeData, 1000);
  },

  scrapeData: async () => {
    try {
      const now = moment();

      // Use Axios to make HTTP request for data with a timestamp
      const timeStamp = Date.now();
      // const timeStamp = moment().tz('Asia/Seoul').valueOf();
      const urlWithTimestamp = `${endpoint}?_=${timeStamp}`;

      const response = await axios.get(urlWithTimestamp);
      const data = response.data;

      powerball3.generateResultObject(data);
    } catch (err) {
      console.error(`An error occurred - ${game}:`, err);
      console.log(`Trying to reconnect in 5 seconds... - ${game}`);
    }
  },

  generateResultObject: async (data) => {
    try {
      const rData = data;

      // Check if the round date has changed
      if (rData.date_round !== lastDateRound) {
        // Update the lastDateRound variable
        lastDateRound = rData.date_round;

        // Convert data and the rest of the code
        const startDateTime = moment().tz('Asia/Seoul').startOf('day'); // Set timezone to Asia/Seoul
        const round = parseInt(rData.date_round);

        let gameDateTime = moment(startDateTime).add(round * gameCycle / 1000, 'seconds').toDate();

        // subtract 1 day because new days
        if (round === maxRound) {
          gameDateTime = moment(startDateTime).subtract(1, 'days').add(round * gameCycle / 1000, 'seconds').toDate();
        }

        // const rotation = parseInt(`${moment(gameDateTime).format('YYYYMMDD')}${tools.right(`${rData.times}`)}`);

        let POE = convertKoreanTerm(rData.pow_ball_oe);
        let PUO = convertKoreanTerm(rData.pow_ball_unover);
        let NOE = convertKoreanTerm(rData.def_ball_oe);
        let NUO = convertKoreanTerm(rData.def_ball_unover);
        let size = convertKoreanTerm(rData.def_ball_size);
        let rotation = rData.times;
        let section = rData.def_ball_section;
        let ball = [
          firstNum = rData.ball[0],
          secondNum = rData.ball[1],
          thirdNum = rData.ball[2],
          fourthNum = rData.ball[3],
          fifthNum = rData.ball[4],
          sixthNum = rData.ball[5]
        ];
        let sum =  firstNum + secondNum + thirdNum + fourthNum + fifthNum + sixthNum;

        let objResult = {
          gameDateTime,
          rotation,
          round,
          ball,
          sum,
          from: 'named',
          size,
          POE,
          PUO,
          NOE,
          NUO,
          section,
          createdAt: moment(rData.create_dt, 'YYYYMMDDHHmmss').toDate(),
          regDateTime: moment().tz('Asia/Seoul').toDate(), // Set timezone to Asia/Seoul
        };

        // Your existing logic for processing and saving data goes here
        console.log(objResult);
        powerball3.saveData(objResult)

        // Wait for 3 minutes and 2 seconds before the next scrape
        await new Promise(resolve => setTimeout(resolve, 3 * 60 * 1000 + 2000));
      }
    } catch (err) {
      console.error(`Error ${game}:`, err);
    }
  },

  saveData: async (objResult) => {
    try {
      const insertQuery = objResult;

      const pool = await db.connect();
      await pool.collection('testPowerball3').insertOne(insertQuery);
    } catch (err) {
      console.error(`DB Error ${game}:`, err);
    }
  },
};

// Function to convert Korean terms to English
function convertKoreanTerm(term) {
  const koreanToEnglish = {
    '홀': 'odd',
    '짝': 'even',
    '언더': 'under',
    '오버': 'over',
    '대': 'big',
    '중': 'middle',
    '소': 'small',
    // Add more translations as needed
  };

  return koreanToEnglish[term] || term;
}

module.exports = powerball3;

// Call the start method to initiate the scraping process
powerball3.start();

// odd = 홀
// even = 짝
// under = 언더
// over = 오버
// big = 대
// middle = 중
// small = 소

// pow_ball_oe, def_ball_oe 홀 = Odd
// pow_ball_oe, def_ball_oe 짝 = Even

// pow_ball_unover, def_ball_unover 언더 = Under
// pow_ball_unover, def_ball_unover오버 = Over

// def_ball_size 대 = Big
// def_ball_size 중 = Middle
// def_ball_size 소 = Small