import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'
import HeaderController from '../header/HeaderController'
import SessionOverviewController from '../sessions/SessionsOverviewController'

export default class OverviewController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
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
        if(this.state.loaded) {
            return <View>
                        <HeaderController logout={this.props.logout} requests={this.state.overview.requests} messages={this.state.overview.messages}
                        message_action={this.props.message_action} request_action={this.props.request_action}
                        ></HeaderController>
                        <SessionOverviewController sessions={this.state.overview.sessions}></SessionOverviewController>
                    </View>
        } else {
            return <View><Text>Loading</Text></View>
        }
    }

}