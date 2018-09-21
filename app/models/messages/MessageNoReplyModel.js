export default class MessageNoReplyModel {

    constructor(patientID, therapistID, contents, date_sent, is_read, messageID) {
        this.patientID = patientID
        this.therapistID = therapistID
        this.contents = contents
        this.date_sent = date_sent
        this.is_read = is_read
        this.messageID = messageID
    }

}