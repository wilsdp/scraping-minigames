// baseball
// ws endpoint : wss://minidata.fusoft001.com/minidata?gametype=6129
// request before results : {"FUN":"GetEndGameList","DATA":{"gametype":6129}}
// server send message when new result : {"FUN":"result","DATA":{"success":200,"message":true,"data":{"game_name":"Baseball","game_type":"6129","results":"1","round_id":"2177","res":1}}}

const WebSocket = require('ws')
const moment = require('moment')
const tools = require('../libs/tools')
const { db } = require('../libs/db')

const game = 'baseball'
const gameCycle = 30 // 30 seconds
const maxRound = 2880 // 24 hours * 60 minutes * 60 seconds / 30 seconds
const endpoint = 'wss://minidata.fusoft001.com/minidata?gametype=6129'

const baseball = {
    start: () => {
        const ws = new WebSocket(endpoint, {
            rejectUnauthorized: false
        })

        ws.on('open', function open() {
            console.log(`Connected to the websocket server - ${game}`)
        })

        ws.on('message', function incoming(data) {
            baseball.generateResultObject(data)
        })

        ws.on('close', function close() {
            console.log(`Disconnected from the websocket server - ${game}`)
            console.log(`Trying to reconnect in 5 seconds... - ${game}`)

            // Reconnect to the WebSocket server after a 5-second delay
            setTimeout(baseball.start, 5000)
        })

        ws.on('error', function error(err) {
            console.error(`WS Error ${game}:`, err)
        })
    },
    generateResultObject: (data) => {
        try {
            //Parse incoming data as JSON
            let rData = data.toString()
            rData = JSON.parse(rData)

            // Check if the received message is of type 'result'
            if(rData.FUN === 'result') {
                // Extract relevant information from the received data
                const startDateTime = moment().startOf('day')
                const round = parseInt(rData.DATA.data.round_id)

                let gameDateTime = moment(startDateTime).add(round * gameCycle, 'seconds').toDate()

                // subtract 1 day because new days
                if(round === maxRound) gameDateTime = moment(startDateTime).subtract(1, 'days').add(round * gameCycle, 'seconds').toDate()

                const rotation = parseInt(`${moment(gameDateTime).format('YYYYMMDD')}${tools.right(`000${round}`, 4)}`)

                // Check the value of 'result' and set 'BBLM' accordingly
                // rData.DATA.data.res === 1, is from rData JSON ex: {DATA: {success: 200, message: true, data: {game_name: 'Baseball', game_type: '6129',results: '2',round_id: '2064',res: 2}}}
                let BBLM = rData.DATA.data.res === 1 ? 'lion' : 'muji'
                // console.log(rData) // check the data

                let objResult = {
                    rotation,
                    gameDateTime,
                    round,
                    BBLM,
                    getDateTime: new Date(),
                    from: 'friends',
                    regDateTime: new Date()
                }

                // console.log("Baseball Game")
                // console.log(objResult)
                baseball.saveData(objResult)
            }
        } catch (err) {
            console.error(`Error ${game}:`, err)
        }
    },
    saveData: async (objResult) => {
        try {
            const insertQuery = objResult

            // Establish a connection to the database and create a connection pool
            const pool = await db.connect()

            // Use the pool to access the 'baseball' collection and insert the data from insertQuery
            await pool.collection('baseball').insertOne(insertQuery)
        } catch (err) {
            console.error(`DB Error ${game}:`, err)
        }
    }
}

module.exports = baseball