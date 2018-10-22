export default class ScoreModel {

    // Number String -> Void
    constructor(score, time) {
        this.score = score
        this.time = new Date(time)
    }

    // Void -> JSON
    // Turns this score to JSON
    to_json() {
        var yr = this.time.getFullYear()
        var mth = this.time.getMonth()+1
        var day = this.time.getDate()
        var hr = this.time.getHours()
        var min = this.time.getMinutes()
        var sec = this.time.getSeconds()
        var time = `${yr}-${mth}-${day}T${hr}:${min}:${sec}`
        return {
            score: this.score,
            time: time
        }
    }

}