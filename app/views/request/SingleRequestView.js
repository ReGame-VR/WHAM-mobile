import React from 'react'
import { Text, View, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class SingleRequestView {

    constructor(therapistID, accept_request) {
        this.therapistID = therapistID
        this.accept_request = accept_request
    }

    render() {
        return (
            <View>
                <Text>{this.therapistID}</Text>
                <Button title="Accept Request" onPress={this.accept_request}></Button>
            </View>
        )
    }
 
}