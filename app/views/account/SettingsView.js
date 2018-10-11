import React from 'react'
import { Text, View, Button } from 'react-native'

export default class SettingsView {

    constructor(back) {
        this.back = back
    }

    render() {
        return (
            <View>
                <Text>SETTINGS</Text>
                <Text>SETTINGS</Text>
                <Button title="back" onPress={this.back}></Button>
            </View>
        )
    }
 
}