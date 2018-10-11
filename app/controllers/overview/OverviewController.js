import React from 'react';
import NetworkAPI from '../../helpers/NetworkAPI'
import OverviewView from '../../views/overview/OverviewView'

export default class OverviewController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            overview: {
                requests: undefined,
                sessions: undefined,
                messages: undefined
            }
        }
        this.view = new OverviewView(this.props.logout, this.props.settings, 
            this.props.request_action, this.props.message_action, this.props.username, this.props.token)
    }
    
    componentDidMount() {
        NetworkAPI.load_patient_overview(this.props.username, this.props.token).then(overview => {
            this.setState({
                loaded: true,
                overview: overview
            })
        }).catch(error => {
            this.props.logout()
        })
    }

    render() {
        return this.view.render(this.state.loaded, this.state.overview.requests, this.state.overview.messages, this.state.overview.sessions);
    }

}