import ScoreModel from './ScoreModel'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class SessionModel {

    // Optional(Number) Number Number Number [List-of JSON]
    constructor(sessionID, effort, motivation, engagement, scores) {
        this.sessionID = sessionID
        this.effort = effort
        this.motivation = motivation
        this.engagement = engagement
        this.scores = [];
        for(var i = 0; i < scores.length; i++) {
            this.scores.push(new ScoreModel(scores[i].score, scores[i].time));
        }
    }

    // String -> Void
    // Sends this session to the server
    send_session(patientID, token) {
        return NetworkAPI.send_session_details(this.to_json(), patientID, token);
    }

    // Void -> JSON
    // Turns this session to JSON
    to_json() {
        var session_json = {
            effort: this.effort,
            motivation: this.motivation,
            engagement: this.engagement
        }
        var scores = [];
        for(var i = 0; i < this.scores.length; i++) {
            scores.push(this.scores[i].to_json());
        }
        session_json.scores = scores
        return session_json;
    }

    // Void -> Number
    // Returns the average score of this session
    get_average_score() {
        var total_score = 0
        for(var i = 0; i < this.scores.length; i++) {
            total_score += this.scores[i].score
        }
        total_score /= this.scores.length
        return total_score
    }
} 