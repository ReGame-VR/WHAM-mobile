import PatientInfoModel from './PatientInfoModel'
import SessionModel from '../sessions/SessionModel'
import MessageModel from '../messages/MessageNoReplyModel'
import RequestModel from '../request/RequestModel'

export default class PatientOverviewModel {

    // JSON -> Void
    // Constructs this model
    constructor(json) {
        this.make_this(json.info, json.sessions, json.messages, json.requests);
    }

    // JSON JSON JSON JSON -> Void
    // constructs this model
    make_this(info, sessions, messages, requests) {
        this.info = new PatientInfoModel(info.username, info.dob, info.weight, info.height, info.information);
        this.sessions = []
        for(var i = 0; i < sessions.length; i++) {
            this.sessions.push(new SessionModel(sessions[i].sessionID, sessions[i].effort, 
                sessions[i].motivation, sessions[i].engagement, sessions[i].scores));
        }
        this.messages = []
        for(var i = 0; i < messages.length; i++) {
            this.messages.push(new MessageModel(messages[i].patientID, messages[i].therapistID,
                 messages[i].message_content, message[i].date_sent, message[i].is_read, message[i].messageID));
        } 
        this.requests = []
        for(var i = 0; i < requests.length; i++) {
            this.requests.push(new RequestModel(requests[i]))
        }
    }

}