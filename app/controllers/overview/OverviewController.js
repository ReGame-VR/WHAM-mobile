import React from 'react';
import NetworkAPI from '../../helpers/NetworkAPI'
import OverviewView from '../../views/overview/OverviewView'

export default class OverviewController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
        this.view = new OverviewView(this.props.logout, this.props.settings, 
            this.props.request_action, this.props.message_action, this.props.username, this.props.token, this.state)
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

    setState(state) {
        this.view.state = state;
        super.setState(state);
    }

    render() {
        return this.view.render()
    }

}