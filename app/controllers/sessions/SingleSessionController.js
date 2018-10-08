import React from 'react'
import { View, Text, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class SingleSessionController extends React.Component {

    componentDidMount() {
        NetworkAPI.get_specific_session(this.props.sessionID, this.props.username, this.props.token).then(session => {
            
        })
    }

    render() {
        var contents = []
        return (
            <View>
                <Button onPress={this.props.back} title="Back"></Button>
            </View>
        )

    }

}