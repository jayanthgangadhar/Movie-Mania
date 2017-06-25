var mongoose = require("mongoose");
var messageSchema = require("./message.schema.server");
var messageModel = mongoose.model("messageModel", messageSchema);

messageModel.createMessage = createMessage;
messageModel.findAllmessagesforId = findAllmessagesforId;
messageModel.deleteMessage= deleteMessage;
messageModel.deleteMessagesforUser = deleteMessagesforUser;

module.exports = messageModel;


function createMessage(message) {
    return messageModel.create(message)
}

function findAllmessagesforId(userID) {
    return messageModel.find({to_id: userID})
}

function deleteMessage(mid) {
    return messageModel.findByIdAndRemove({_id: mid})
}

function deleteMessagesforUser(uid) {
    return messageModel.deleteMany({to_id : uid })
}