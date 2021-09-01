import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const getLastReadMessageId = (messages, otherUser) => {
    // Looks in reverse order as most recent read message as unread messages
    // are the most recently sent
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].senderId !== otherUser.id && messages[i].isRead)
        return messages[i].id;
    }
    return null;
  };

  const { messages, otherUser, userId } = props;
  const lastReadMessageId = getLastReadMessageId(messages, otherUser);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            isLastReadMessage={lastReadMessageId === message.id}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
