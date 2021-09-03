const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.patch("/read", async (req, res, next) => {
  try {
    if (!req.body.otherUserId || !req.body.conversationId) {
      return res.sendStatus(404);
    }
    const { otherUserId, conversationId } = req.body;
    const conversation = Conversation.findOne( 
      {where: {
        [Op.or]: {
          user1Id: otherUserId,
          user2Id: otherUserId,
        },
      }
    });

    if (conversation === null) return res.sendStatus(403);

    await Message.update({isRead: true}, {
      where: {
        [Op.and]: [{senderId: otherUserId}, {conversationId: conversationId}]
      }
    });

    const newMessages = 
      await Message.findAll({ 
        where: {
          conversationId: conversationId
        }, 
        order: [['createdAt', 'ASC']]});

    const newLastReadMessageId = (await Message.findOne({
      where: {
        [Op.and]: {
          senderId: otherUserId,
          isRead: true
        }
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id'],
      raw: true
    })).id;

    res.json({messages: newMessages, lastReadMessageId: newLastReadMessageId});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
