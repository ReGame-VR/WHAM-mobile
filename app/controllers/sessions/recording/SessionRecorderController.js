import React from 'react'
import {
    Text,
    Button,
    View
} from 'react-native'
import SessionRecorderView from '../../../views/session/recording/SessionRecorderView'
import SessionModel from '../../../models/sessions/SessionModel'
import NetworkAPI from '../../../helpers/NetworkAPI'

export default class SessionRecorderController extends React.Component {

    constructor(props) {
        super(props)
        this.view = new SessionRecorderView(this.start_recording, this.stop_recording, this.stop_questioning, this.props.username, this.props.token, this.props.loader);
        this.state = {
            recording: false,
            questioning: false
        }
        this.recording = false
    }

    render() {
        return this.view.render(this.state.recording, this.state.session, this.state.questioning);
    }

    start_recording = () => {
        this.recording = true
        this.setState({
            recording: true,
            session: new SessionModel()
        })
        this.add_session_data()
    }

    stop_recording = () => {
        this.recording = false
        this.setState({
            recording: false,
            questioning: true
        })
    }

    stop_questioning = () => {
        this.setState({
            questioning: false
        })
    }

    add_session_data() {
        var tick = () => {
            if (!this.recording) {
                return
            }
            var state_session = this.state.session
            state_session.add_score((Math.random()*100)^2, new Date())
            this.setState({
                session: state_session
            })
            timerId = setTimeout(tick, 100); // (*)
        }
        let timerId = setTimeout(tick, 100);
    }

}