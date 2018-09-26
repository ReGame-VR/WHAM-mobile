import MessageModel from './MessageModel'
export default class PatientMessagesModel {

    constructor(messages) {
        this.messages = []
        for(var i = 0; i < messages.length; i++) {
            this.messages.push(new MessageModel(messages[i].patientID, messages[i].therapistID, 
                messages[i].message_content,  messages[i].date_sent,  messages[i].is_read,  
                messages[i].messageID))
        }
    }

}