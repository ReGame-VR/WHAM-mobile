import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'
import SingleRequestController from './SingleRequestController'
import RequestView from '../../views/request/RequestView'

export default class RequestController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
        this.view = new RequestView(this.remove_request, this.props.back, this.props.username, this.props.token);
    }

    componentDidMount() {
        NetworkAPI.load_patient_overview(this.props.username, this.props.token).then(overview => {
            this.setState({
                loaded: true,
                requests: overview.requests
            })
        })
    }

    render() {
        return this.view.render(this.state.loaded, this.state.requests);
    }
    
    remove_request = (userID) => {
        var requests = this.state.requests
        for(var i = 0; i < requests.length; i++) {
            if(requests[i].userID === userID) {
                requests.splice(i, 1);
                this.setState({
                    requests: requests
                })
                return
            }
        }
    }

} 