const Sequelize = require("sequelize");
const db = require("../db");

const UserConversation = db.define("userconversation", {});

module.exports = UserConversation;
