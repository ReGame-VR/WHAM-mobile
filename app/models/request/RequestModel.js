import NetworkAPI from "../../helpers/NetworkAPI";

export default class RequestModel {

    // String -> Void
    constructor(userID) {
        this.userID = userID
    }

    // String String -> Promise(Void)
    // Sends a request to the user from this therapist
    send_request(therapistID, token) {
        return NetworkAPI.send_request(therapistID, this.userID, token)
    }

    // String String -> Promise(Void)
    // Accepts a request from the user for this patient
    accept_request(patientID, token) {
        return NetworkAPI.accept_request(this.userID, patientID, token);
    }

}