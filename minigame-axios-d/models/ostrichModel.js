const { DataTypes } = require("sequelize")
const { sequelize } = require("../libs/dbhelper")

const jwcOSTModel = sequelize.define(
  "jwcOSTData",
  {
    mini_code: {
      type: DataTypes.STRING(24),
      defaultValue: "JWC_OSTRICH",
      primaryKey: true,
      allowNull: false,
    },
    mini_rotation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    mini_round_id: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
      allowNull: false,
    },
    rotationStatus: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
      allowNull: false,
    },
    rotationResult: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    rotationGameDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rotationGetResultDate: {
      type: DataTypes.DATE,
    },
    rotationCustomYn: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
    },
    useYn: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    tableName: "mini_rotation",
    timestamps: false,
  }
)

exports.insertOSTData = async (currentGame, isUpdate = false) => {
  const payload = {
    mini_code: currentGame.gameName,
    mini_rotation_id: currentGame.rotation,
    mini_round_id: currentGame.round,
    rotationStatus: isUpdate ? 1 : 0,
    rotationCustomYn: isUpdate === 0,
    rotationResult: JSON.stringify({
      lf: currentGame.lf,
      gameDateTime: currentGame.gameDateTime,
      resultDateTime: currentGame.resultDateTime,
    }),
    rotationGameDate: currentGame.gameDateTime,
    rotationGetResultDate: currentGame.resultDateTime,
  }

  try {
    let dataResult

    const existingRecord = await jwcOSTModel.findOne({
      where: {
        mini_code: currentGame.gameName,
        mini_rotation_id: currentGame.rotation,
      },
    })

    if (existingRecord && isUpdate) {
      // Record exists and updating is true, update the record
      dataResult = await jwcOSTModel.update(payload, {
        where: {
          mini_code: currentGame.gameName,
          mini_rotation_id: currentGame.rotation,
        },
      })
      console.log(`\x1b[32mRecord Updated:\x1b[0m`)
    } else if (!existingRecord) {
      // Record does not exist, proceed with creation
      dataResult = await jwcOSTModel.create(payload)
      console.log(`\x1b[32mRecord Created:\x1b[0m`)
    } else {
      // Record exists and isUpdate is false, handle accordingly
      console.log(
        `\x1b[31mRecord with \x1b[32mmini_code: \x1b[33m${currentGame.gameName}\x1b[31m and \x1b[32mmini_rotation_id: \x1b[33m${currentGame.rotation}\x1b[31m already exists. Skipping creation.\x1b[0m`
      )
      return {
        success: false,
        message: "Record already exists. Skipping creation.",
      }
    }

    return { success: true, data: dataResult }
  } catch (err) {
    console.error(`Error in operation: ${err.message}`)
    return { success: false, error: err.message }
  }
}
