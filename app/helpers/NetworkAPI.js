const fetch = require("node-fetch")
var main_url = "http://localhost:3000"
var version_extension = "?version=1.0"
import PatientOverviewModel from '../models/general/PatientOverviewModel';

export default class NetworkAPI {

    // String String -> Promise(String)
    // Logs this user into the server
    // If sucess, returns the token, if fail throws an error
    static login(username, password) {
        var URL = main_url + "/login/patient"
        return fetch(URL, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
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
        var URL = main_url + "/patients"
        return fetch(URL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        }).then(response => {
            return response.json()
        }).then(json => json.token)
    }

    // String String -> Promise(PatientOverviewModel)
    static load_patient_overview(username, token) {
        var URL = main_url + "/patients/" + username + "?auth_token=" + token
        return fetch(URL, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(json => new PatientOverviewModel(json))
    }

    // JSON String -> Promise(Void)
    // Sends this session to the patients page
    static send_session_details(session_json, username, token) {
        var URL = main_url + "/patients/" + username + "/sessions?auth_token=" + token
        return fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(session_json)
        }).then(res => {
            return
        })
    }

    // String String String -> Promise(Void)
    // Sends a request from this patient to this therapist
    static send_request(therapistID, patientID, token) {
        var URL = main_url + "/therapists/" + therapistID + "/patients/?auth_token=" + token
        return fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
        return fetch(URL, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return
        })
    }


}