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
            <View>
                <Text>{"Contents: " + message.contents.substring(0,15) + "..."}</Text>
                <Text>{"From: " + message.therapistID}</Text>
            </View>
            <View style={{position: "absolute", right: 0, width: "40%", height: "100%"}}>
                <Button onPress={this.show_message_contents} title="Show Message"></Button>
            </View>
        </View>
        )
    }

} 