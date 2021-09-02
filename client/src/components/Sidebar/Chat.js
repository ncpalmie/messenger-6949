import React from "react";
import { Box, Typography } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { readMessages } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  notificationBox: {
    background: "#3A8DFF",
    borderRadius: "30px",
    marginRight: 24,
  },
  notificationText: {
    fontSize: 12,
    color: "#FFFFFF",
    padding: "4px 9px 3px 9px",
    fontWeight: "bold",
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, unreadMessageCount } = props;
  const { otherUser, messages } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);

    if (messages.some((msg) => !msg.isRead && msg.senderId === otherUser.id))
      await props.readMessages(otherUser.id, conversation.id);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={conversation}
        hasUnreadMessages={unreadMessageCount > 0}
      />
      {unreadMessageCount > 0 && (
        <Box className={classes.notificationBox}>
          <Typography className={classes.notificationText}>
            {unreadMessageCount}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readMessages: (otherUserId, conversationId) => {
      dispatch(readMessages(otherUserId, conversationId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
