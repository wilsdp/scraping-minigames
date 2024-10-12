const { DataTypes } = require("sequelize")
const { sequelize } = require("../libs/dbhelper")

const Pk1Model = sequelize.define(
  "pk1Data",
  {
    mini_code: {
      type: DataTypes.STRING(24),
      defaultValue: "ALP_PENALTYKICK1M",
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
      allowNull: false,
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

exports.insertPk1Data = async (game, isUpdate = false) => {
  const payload = {
    mini_rotation_id: game.rotation,
    mini_round_id: game.round,
    rotationStatus: isUpdate ? 1 : 0,
    rotationCustomYn: isUpdate === 0,
    rotationResult: JSON.stringify({
      kk: game.kk,
      gameDateTime: game.gameDateTime,
      resultDateTime: game.resultDateTime,
    }),
    rotationGameDate: game.gameDateTime,
    rotationGetResultDate: game.resultDateTime,
  }

  try {
    // First, check if a record already exists to prevent duplication
    const existingRecord = await Pk1Model.findOne({
      where: {
        mini_code: game.gameName,
        mini_rotation_id: game.rotation,
      },
    })

    let dataResult

    if (existingRecord && isUpdate) {
      // Record exists and updating is true, update the record
      dataResult = await Pk1Model.update(payload, {
        where: {
          mini_code: game.gameName,
          mini_rotation_id: game.rotation,
        },
      })
      console.log(`\x1b[32mRecord Updated:\x1b[0m`)
    } else if (!existingRecord) {
      // Record does not exist, proceed with creation
      dataResult = await Pk1Model.create(payload)
      console.log(`\x1b[32mRecord Created:\x1b[0m`)
    } else {
      // Record exists and isUpdate is false, handle accordingly
      console.log(
        `Record with mini_code: ${game.gameName} and mini_rotation_id: ${game.rotation} already exists. Skipping creation.`
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
