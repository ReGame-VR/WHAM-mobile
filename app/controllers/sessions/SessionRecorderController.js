import React from 'react'
import {
    Text,
    Button,
    View
} from 'react-native'
import SessionRecorderView from '../../views/session/SessionRecorderView'
import SessionModel from '../../models/sessions/SessionModel'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class SessionRecorderController extends React.Component {

    constructor(props) {
        super(props)
        this.view = new SessionRecorderView(this.start_recording, this.stop_recording);
        this.state = {
            recording: false
        }
    }

    render() {
        return this.view.render(this.state.recording, this.state.session);
    }

    start_recording = () => {
        this.setState({
            recording: true,
            session: new SessionModel()
        })
        this.add_session_data()
    }

    stop_recording = () => {
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

    add_session_data() {
        var tick = () => {
            if (!this.state.recording) {
                return
            }
            var state_session = this.state.session
            state_session.add_score(Math.random(), new Date())
            this.setState({
                session: state_session
            })
            this.setState({

            })
            timerId = setTimeout(tick, 100); // (*)
        }
        let timerId = setTimeout(tick, 100);
    }

}