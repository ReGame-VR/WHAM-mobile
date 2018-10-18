export default class ScoreModel {

    // Number String -> Void
    constructor(score, time) {
        this.score = score
        this.time = new Date(time)
    }

    // Void -> JSON
    // Turns this score to JSON
    to_json() {
        var dateFormat = require('dateformat');
        if(this.time === undefined) {
            return
        }
        return {
            score: this.score,
            time: dateFormat(this.time, "YYYY-mm-DDTHH:MM:SS")
        }
    }

}