//var main_url = "https://epidemik.us/api"
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
                password: password
            })
        }).then(response => response.json().token)
    }

    // String String -> Promise(PatientOverviewModel)
    static load_patient_overview(username, token) {
        var URL = main_url + "/patients/" + username + "?auth_token=" + token
        return fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => new PatientOverviewModel(response.json()))
    }

}