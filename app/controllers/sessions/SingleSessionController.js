import React from 'react'
import { View, Text, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI'
import SingleSessionView from '../../views/session/SingleSessionView'

export default class SingleSessionController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
        this.view = new SingleSessionView(this.props.back)
    }

    componentDidMount() {
        NetworkAPI.get_specific_session(this.props.sessionID, this.props.username, this.props.token).then(session => {
            this.setState({
                loaded: true,
                session: session
            })
        })
    }

    render() {
        return this.view.render(this.state.loaded, this.state.session)
    }

}