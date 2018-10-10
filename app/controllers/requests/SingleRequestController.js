import React from 'react'
import { Text, View, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class SingleRequestController extends React.Component {

    render() {
        return (
            <View>
                <Text>{this.props.therapistID}</Text>
                <Button title="Accept Request" onPress={this.accept_request}></Button>
            </View>
        )
    }

    accept_request = () => {
        return NetworkAPI.accept_request(this.props.therapistID, this.props.username, this.props.token).then(() => {
            this.props.remove_request(this.props.therapistID)
            return
        })
    }
 
}