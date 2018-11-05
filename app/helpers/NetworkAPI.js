var node_fetch;

if(typeof global.it === 'function') {
    node_fetch = require("node-fetch");
}

var main_url = "http://10.110.189.4:3000"
var version_extension = "?version=1.0"
import PatientOverviewModel from '../models/general/PatientOverviewModel';
import MessageModel from '../models/messages/MessageModel'
import PatientMessagesModel from '../models/messages/PatientMessagesModel'
import SessionModel from '../models/sessions/SessionModel'

export default class NetworkAPI {

    // String String -> Promise(String)
    // Logs this user into the server
    // If sucess, returns the token, if fail throws an error
    static login(username, password) {
        var URL = main_url + "/login/patient"
        return this.my_fetch(URL, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(response => response.json())
        .then(json => {
            return json.token
        })
    }

    // String String String Number Number String -> Promise(String)
    static create_account(username, password, dob, weight, height, information) {
        const body = {
            username: username,
            password: password,
            dob: dob,
            weight: weight,
            height: height,
            information: information
        }
        var URL = main_url + "/register/patient"
        return this.my_fetch(URL, {
            method: "POST",
            body: JSON.stringify(body)
        }).then(response => {
            return response.json()
        }).then(json => {
            return json.token
        })
    }

    // String String -> Promise(PatientOverviewModel)
    static load_patient_overview(username, token) {
        var URL = main_url + "/patients/" + username + "?auth_token=" + token
        return this.my_fetch(URL, {
            method: "GET"
        }).then(response => response.json())
        .then(json => new PatientOverviewModel(json))
    }

    static get_specific_session(sessionID, username, token) {
        var URL = main_url + "/patients/" + username + "/sessions/" + sessionID + "?auth_token=" + token
        return this.my_fetch(URL, {
            method: "GET"
        }).then(response => response.json())
        .then(json => new SessionModel(json.id, json.effort, json.motivation, json.engagement, json.scores))
    }

    // JSON String -> Promise(Void)
    // Sends this session to the patients page
    static send_session_details(session_json, username, token) {
        var URL = main_url + "/patients/" + username + "/sessions?auth_token=" + token
        return this.my_fetch(URL, {
            method: "POST",
            body: JSON.stringify(session_json)
        }).then(res => {
            return
        })
    }

    // String String String -> Promise(Void)
    // Sends a request from this patient to this therapist
    static send_request(therapistID, patientID, token) {
        var URL = main_url + "/therapists/" + therapistID + "/patients/?auth_token=" + token
        return this.my_fetch(URL, {
            method: "POST",
            body: JSON.stringify({
                patientID: patientID
            })
        }).then(res => {
            return
        })
    }

    // String String String -> Promise(Void)
    // Accepts a request from this therapist to a patient
    static accept_request(therapistID, patientID, token) {
        var URL = main_url + "/patients/" + patientID + "/therapists/" + therapistID + "?auth_token=" + token
        return this.my_fetch(URL, {
            method: "PATCH"
        }).then(res => {
            return
        })
    }

    // String String String String -> Promise(Object)
    // Sends a message to this patient from this therapist
    static send_message(patientID, therapistID, message_content, token) {
        var URL = main_url + "/therapists/" + therapistID + "/messages/?auth_token=" + token
        return this.my_fetch(URL, {
            method: "POST",
            body: JSON.stringify({
                patientID: patientID,
                message_content: message_content,
                date_sent: new Date()
            })
        }).then(response => response.json())
    }

    // Number String String String String -> Promise(Void)
    // Sends a reply to this message chain
    // messageID and patientID are only for identifying the proper message
    static send_reply(messageID, patientID, sentID, reply_content, token) {
        var URL = main_url + "/patients/" + patientID + "/messages/" + messageID + "?auth_token=" + token
        return this.my_fetch(URL, {
            method: "PUT",
            body: JSON.stringify({
                sentID: sentID,
                reply_content: reply_content
            })
        }).then(res => {
            return
        })
    }

    // String String -> Promise(PatientMessagesModel)
    // Returns every message this patient has received
    static get_all_patient_messages(patientID, token) {
        var URL = main_url + "/patients/" + patientID + "/messages?auth_token=" + token
        return this.my_fetch(URL, {
            method: "GET"
        }).then(response => response.json())
        .then(json => {return new PatientMessagesModel(json)})
    }

    // String Number String -> Promise(PatientMessagesModel)
    // Returns every message this patient has received
    static get_specific_patient_message(patientID, messageID, token) {
        var URL = main_url + "/patients/" + patientID + "/messages/" + messageID + "?auth_token=" + token
        return this.my_fetch(URL, {
            method: "GET"
        }).then(response => response.json())
        .then(json => {return new MessageModel(json.patientID, json.therapistID, json.message_content, 
            json.date_sent, json.is_read, json.messageID, json.replies)});
    }

    // String JSON -> Promise(JSON)
    static my_fetch(URL, parts) {
        parts.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if(typeof fetch === 'undefined') {
            return node_fetch(URL, parts)
        } else {
            return fetch(URL, parts)
        }
    }


}