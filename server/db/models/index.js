const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConversation = require("./userconversation");
const ReadReceipt = require("./readreceipt");

// associations

User.belongsToMany(Conversation, {through: UserConversation});
Conversation.belongsToMany(User, {through: UserConversation})
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Message.hasMany(ReadReceipt);
ReadReceipt.belongsTo(Message);

module.exports = {
  User,
  Conversation,
  Message,
  UserConversation,
  ReadReceipt,
};
