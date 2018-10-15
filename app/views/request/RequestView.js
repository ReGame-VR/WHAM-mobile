import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'
import SingleRequestController from '../../controllers/requests/SingleRequestController'

export default class RequestView {

    constructor(remove_request, back, username, token) {
        this.remove_request = remove_request
        this.back = back
        this.username = username
        this.token = token
    }

    render(loaded, requests) {
        var contents = []
        if(loaded) {
            for(var i = 0; i < requests.length; i++) {
                contents.push(<SingleRequestController 
                    username={this.username} token={this.token}
                    key={requests[i].userID} therapistID={requests[i].userID}
                    remove_request={this.remove_request}/>)
            }
        }
        return (
            <View style={{top: "10%"}}>
                {contents}
                <Button onPress={this.back} title="back" key="button"></Button>
            </View>
            )
    }

} 