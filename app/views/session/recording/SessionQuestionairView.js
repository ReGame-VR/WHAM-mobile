import React from 'react'
import { Text, Button } from 'react-native'

export default class SessionQuestionairView {

    constructor(stop_questioning, advance_stage, set_item) {
        this.stop_questioning = stop_questioning
        this.advance_stage = advance_stage
    }

    render(stage) {
        if(stage === 0) {
            return <Button title="next" onPress={this.advance_stage}></Button>
        } else if(stage === 1) {
            return <Button title="next" onPress={this.advance_stage}></Button>
        } else {
            return <Button title="done" onPress={this.stop_questioning}></Button>
        }
    }

    send_session = () => {
        var session = this.state.session
        session.set_engagement(1)
        session.set_motivation(1)
        session.set_effort(1)
        NetworkAPI.send_session_details(session.to_json(), this.props.username, this.props.token).then(() => {
            this.setState({
                recording: false,
                session: undefined
            })  
            this.props.loader()
        })
    }

}