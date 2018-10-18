import ScoreModel from './ScoreModel'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class SessionModel {

    // Optional(Number) Number Number Number [List-of JSON]
    constructor(sessionID, effort, motivation, engagement, scores) {
        if (arguments.length !== 0) {
            this.sessionID = sessionID
            this.effort = effort
            this.motivation = motivation
            this.engagement = engagement
            this.scores = [];
            for (var i = 0; i < scores.length; i++) {
                this.scores.push(new ScoreModel(scores[i].score, scores[i].time));
            }
        } else {
            this.scores = []
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
        for (var i = 0; i < this.scores.length; i++) {
            scores.push(this.scores[i].to_json());
        }
        session_json.scores = scores
        return session_json;
    }

    // Void -> Number
    // Returns the average score of this session
    get_average_score() {
        var total_score = 0
        for (var i = 0; i < this.scores.length; i++) {
            total_score += this.scores[i].score
        }
        total_score /= this.scores.length
        return total_score
    }

    // Void -> Number
    // Returns the total length of this session in minutes
    get_total_length() {
        if (this.scores.length === 0) {
            return 0
        }
        var begin = this.scores[0].time
        var end = this.scores[this.scores.length - 1].time
        return Math.abs((begin - end)) / (60 * 1000)
    }

    // Number String -> Void
    // Adds this score,time pair to the session
    add_score(score, time) {
        this.scores.push(new ScoreModel(score, time));
    }

    // Number -> Void
    // Sets the engagement for this session
    set_engagement(level) {
        this.engagement = level
    }

    // Number -> Void
    // Sets the effort for this session
    set_effort(level) {
        this.effort = level
    }

    // Number -> Void
    // Sets the motivation for this session
    set_motivation(level) {
        this.motivation = level
    }
}