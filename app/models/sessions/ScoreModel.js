export default class ScoreModel {

    // Number String -> Void
    constructor(score, time) {
        this.score = score
        this.time = time
    }

    // Void -> JSON
    // Turns this score to JSON
    to_json() {
        return {
            score: this.score,
            time: this.time
        }
    }

}