import ScoreModel from './ScoreModel'

export default class SessionModel {

    constructor(sessionID, effort, motivation, engagement, scores) {
        this.sessionID = sessionID
        this.effort = effort
        this.motivation = motivation
        this.engagement = engagement
        this.scores = [];
        for(var i = 0; i < scores.length; i++) {
            this.scores.push(new ScoreModel(scores[i].activityLevel, scores[i].time));
        }
    }

} 