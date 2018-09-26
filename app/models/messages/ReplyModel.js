import NetworkAPI from '../../helpers/NetworkAPI'

export default class ReplyModel {

    constructor(messageID, sentID, reply_content, date_sent) {
        this.messageID = messageID
        this.sentID = sentID
        this.reply_content = reply_content
        this.date_sent = date_sent
    }

    // String String -> Promise(Void)
    // Sends this reply to the message
    send_reply(patientID, sentID, token) {
        this.sentID = sentID
        this.date_sent = new Date();
        return NetworkAPI.send_reply(this.messageID, patientID, sentID, this.reply_content, token);
    }

}