const moment = require('moment-timezone');
const axios = require('axios');
const tools = require('../libs/tools');
const { db } = require('../libs/db');

const game = 'powerladder3';
const gameCycle = 300000; // 5 minutes in milliseconds
const maxRound = 2880; // 24 hours * 60 minutes * 60 seconds / 30 seconds
const endpoint = 'https://named.com/data/minigame/nball/powerladder3/result.json';
let lastDateRound = -1;

const powerladder3 = {
  start: () => {
    // Start scraping data immediately
    setInterval(powerladder3.scrapeData, 1000);
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

      powerladder3.generateResultObject(data);
    } catch (err) {
      console.error(`An error occurred - ${game}:`, err);
      console.log(`Trying to reconnect in 5 seconds... - ${game}`);
    }
  },

  generateResultObject: async (data) => {
    try {
      const rData = data;

      // Check if the round date has changed
      if (rData.r !== lastDateRound) {
        // Update the lastDateRound variable
        lastDateRound = rData.r;

        // Convert data and the rest of the code
        const startDateTime = moment().tz('Asia/Seoul').startOf('day'); // Set timezone to Asia/Seoul
        const round = parseInt(rData.r);

        let gameDateTime = moment(startDateTime).add(round * gameCycle / 1000, 'seconds').toDate();

        // subtract 1 day because new days
        if (round === maxRound) {
          gameDateTime = moment(startDateTime).subtract(1, 'days').add(round * gameCycle / 1000, 'seconds').toDate();
        }

        // console.log(rData) // to check the data

        let POE = convertLetterTerm(rData.o);
        let SLR = convertLetterTerm(rData.s);
        let section = rData.def_ball_section;
        let ball = rData.l;

        let objResult = {
          gameDateTime,
          round,
          SLR,
          ball,
          POE,
          from: 'named',
          createdAt: moment(rData.create_dt, 'YYYYMMDDHHmmss').toDate(),
          regDateTime: moment().tz('Asia/Seoul').toDate(), // Set timezone to Asia/Seoul
        };

        // Your existing logic for processing and saving data goes here
        console.log(objResult);
        // powerladder3.saveData(objResult)

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
      await pool.collection('testPowerladder3').insertOne(insertQuery);
    } catch (err) {
      console.error(`DB Error ${game}:`, err);
    }
  },
};

// Function to convert Korean terms to English
function convertLetterTerm(term) {
  const bigToSmall = {
    'ODD': 'odd',
    'EVEN': 'even',
    'LEFT': 'left',
    'RIGHT': 'right',
  };

  return bigToSmall[term] || term;
}

module.exports = powerladder3;

// Call the start method to initiate the scraping process
powerladder3.start();

