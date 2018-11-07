import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class SingleRequestView {

    constructor(therapistID, accept_request) {
        this.therapistID = therapistID
        this.accept_request = accept_request
    }

    render() {
        return (
            <View>
                <Button title={"Accept Request From " + this.therapistID} 
                onPress={this.accept_request}
                buttonStyle={{borderRadius: 20}}
                icon={{name: 'check', type: 'font-awesome', color: "green"}}></Button>
            </View>
        )
    }
 
}