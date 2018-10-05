import React from 'react'
import { Text, View, Button } from 'react-native'

export default class SettingsController extends React.Component {

    render() {
        return (
            <View>
                <Text>SETTINGS</Text>
                <Text>SETTINGS</Text>
                <Button title="back" onPress={this.props.back}></Button>
            </View>
        )
    }
 
}