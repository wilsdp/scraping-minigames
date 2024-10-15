// golf
// ws endpoint : wss://minidata.fusoft001.com/minidata?gametype=6180
// request before results : {"FUN":"GetEndGameList","DATA":{"gametype":6180}}
// server send message when new result : {"FUN":"result","DATA":{"success":200,"message":true,"data":{"game_name":"Golf","game_type":"6180","results":"{\"result\":3,\"rank\":0}","round_id":"2179","res":{"result":3,"rank":0}}}}

const WebSocket = require('ws')
const moment = require('moment')
const tools = require('../libs/tools')
const { db } = require('../libs/db')

const game = 'golf'
const gameCycle = 30 // 30 seconds
const maxRound = 2880 // 24 hours * 60 minutes * 60 seconds / 30 seconds
const endpoint = 'wss://minidata.fusoft001.com/minidata?gametype=6180'

const golf = {
    start: () => {
        const ws = new WebSocket(endpoint, {
            rejectUnauthorized: false
        })

        ws.on('open', function open() {
            console.log(`Connected to the websocket server - ${game}`)
        })

        ws.on('message', function incoming(data) {
            golf.generateResultObject(data)
        })

        ws.on('close', function close() {
            console.log(`Disconnected from the websocket server - ${game}`)
            console.log(`Trying to reconnect in 5 seconds... - ${game}`)

            // Reconnect to the WebSocket server after a 5-second delay
            setTimeout(golf.start, 5000)
        })

        ws.on('error', function error(err) {
            console.error(`WS Error ${game}:`, err)
        })
    },
    generateResultObject: (data) => {
        try {
            let rData = data.toString()
            rData = JSON.parse(rData)

            if(rData.FUN === 'result') {
                const startDateTime = moment().startOf('day')
                const round = parseInt(rData.DATA.data.round_id)

                let gameDateTime = moment(startDateTime).add(round * gameCycle, 'seconds').toDate()
                // subtract 1 day because new days
                if(round === maxRound) gameDateTime = moment(startDateTime).subtract(1, 'days').add(round * gameCycle, 'seconds').toDate()

                const rotation = parseInt(`${moment(gameDateTime).format('YYYYMMDD')}${tools.right(`000${round}`, 4)}`)
                
                // let GLM = rData.DATA.data.res.result === 1 ? 'lion' : 'muji'
                let GLM;
                let stat;
                let rDataResult = rData.DATA.data.res.result;
                let rank = rData.DATA.data.res.rank;

                if ((rDataResult === 1 || rDataResult === 2) && rank === 0) {
                    GLM = 'lion';
                    stat = 's';
                } else if ((rDataResult === 1 || rDataResult === 2) && rank !== 0) {
                    GLM = 'lion';
                    stat = 'f';
                } else if ((rDataResult === 3 || rDataResult === 4) && rank === 0) {
                    GLM = 'muji';
                    stat = 's';
                } else if ((rDataResult === 3 || rDataResult === 4) && rank !== 0) {
                    GLM = 'muji';
                    stat = 'f';
                } 
                // console.log(rData) // to check the data

                let objResult = {
                    rotation,
                    gameDateTime,
                    round,
                    GLM,
                    stat,
                    getDateTime: new Date(),
                    from: 'friends',
                    regDateTime: new Date()
                }

                // console.log("Golf Game")
                // console.log(objResult)
                golf.saveData(objResult)
            }
        } catch (err) {
            console.error(`Error ${game}:`, err)
        }
    },
    saveData: async (objResult) => {
        try {
            const insertQuery = objResult

            const pool = await db.connect()
            await pool.collection('golf').insertOne(insertQuery)
        } catch (err) {
            console.error(`DB Error ${game}:`, err)
        }
    }
}

module.exports = golf