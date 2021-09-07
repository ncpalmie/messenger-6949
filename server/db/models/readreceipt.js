const Sequelize = require("sequelize");
const db = require("../db");

const ReadReceipt = db.define("readreceipt", {
  receiverId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

module.exports = ReadReceipt;
