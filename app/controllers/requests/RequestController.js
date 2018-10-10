import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'
import SingleRequestController from './SingleRequestController'

export default class RequestController extends React.Component {

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
                requests: overview.requests
            })
        })
    }

    render() {
        var contents = []
        var requests = this.state.requests
        if(this.state.loaded) {
            for(var i = 0; i < requests.length; i++) {
                contents.push(<SingleRequestController 
                    username={this.props.username} token={this.props.token}
                    key={requests[i].userID} therapistID={requests[i].userID}
                    remove_request={this.remove_request}/>)
            }
        }
        return (
            <View style={{top: "10%"}}>
                {contents}
                <Button onPress={this.props.back} title="back" key="button"></Button>
            </View>
            )
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