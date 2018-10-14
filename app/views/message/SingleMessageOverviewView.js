import React from 'react'
import { Text, Button, View } from 'react-native'

/**
 * Gives an overview for a single message, and a button to show more detail
 */
export default class SingleMessageOverviewView {

    constructor(show_message_contents) {
        this.show_message_contents = show_message_contents
    }

    render(message) {
        return (
        <View>
            <Button onPress={this.show_message_contents} title="Show Message"></Button>
            <Text>{message.contents}</Text>
        </View>
        )
    }

} 