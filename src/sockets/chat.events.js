const { SocketRouter } = require("../config/socketio");
const messagesKnexService = require("../services/database/messages/messages.knex");

const messageRouterEvents = new SocketRouter(async (io, socket) => {
  const messages = await messagesKnexService.getMessages();
  io.emit("UPDATE_MESSAGES", messages.data);
});

messageRouterEvents.listen("NEW_MESSAGE_TO_SERVER", async (socket, data) => {
  // Aqui se ejecuta la logica del evento escuchado
  await messagesKnexService.createMessage(data);
  messageRouterEvents.sendEveryone("NEW_MESSAGE_FROM_SERVER", data);
});

module.exports = messageRouterEvents;