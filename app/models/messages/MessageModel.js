import NetworkAPI from '../../helpers/NetworkAPI'
import ReplyModel from './ReplyModel'

export default class MessageModel {

    constructor(patientID, therapistID, contents, date_sent, is_read, messageID, replies = []) {
        this.patientID = patientID
        this.therapistID = therapistID
        this.contents = contents
        this.date_sent = date_sent
        this.is_read = is_read
        this.messageID = messageID
        this.replies = []
        for(var i = 0; i < replies.length; i++) {
            this.replies.push(new ReplyModel(replies[i].messageID, replies[i].sentID, 
                replies[i].reply_content, replies[i].date_sent))
        }
    }

    // String -> Void
    // Sends a message to this patient
    send_message(patientID, token) {
        this.patientID = patientID
        this.date_sent = new Date();
        this.is_read = false;
        return NetworkAPI.send_message(patientID, this.therapistID, this.contents, token);
    }

}