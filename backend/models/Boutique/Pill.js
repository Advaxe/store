const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../utils/sequerize');

const Pill = sequelize.define("pill",{

    ID_PILL:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    DESIGNATION:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    PRICE:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    CREATED_AT:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW

    }

   
},{
    freezeTableName: true,
    tableName: 'pill',
    timestamps: false,
})

module.exports = Pill