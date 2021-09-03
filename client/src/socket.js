import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setReadMessages,
} from "./store/conversations";
import { readMessages } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));

    // If active conversation is the same in which the message was received,
    // set the message to read
    const state = store.getState();
    const otherUser = state.conversations.find(
      (convo) => convo.id === data.message.conversationId
    ).otherUser;
    if (state.activeConversation === otherUser.username) {
      store.dispatch(readMessages(otherUser.id, data.message.conversationId));
    }
  });

  socket.on("read-message", (data) => {
    store.dispatch(
      setReadMessages(
        data.messages,
        data.lastReadMessageId,
        data.conversationId,
        true
      )
    );
  });
});

export default socket;
