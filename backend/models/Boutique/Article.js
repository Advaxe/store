const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../utils/sequerize.js');
const Category = require('./Category.js');

const Article= sequelize.define("article",{

    ARTICLE_ID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    ID_CATEGORY: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    NAME_ARTICLE:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    PRICE_ARTICLE:{
        type: DataTypes.FLOAT,
        allowNull:false

    },
    IMAGE:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: true
    },
    CREATED_AT:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW

    }

    
},{

    freezeTableName: true,
    tableName: 'article',
    timestamps: false,
})

Article.belongsTo(Category,{ foreignKey: "ID_CATEGORY", as: 'category' })

module.exports=Article