import React from 'react'
import { Text, Button, View } from 'react-native'

/**
 * Gives an overview for a single message, and a button to show more detail
 */
export default class MessageOverviewController extends React.Component {

    render() {
        return (
        <View>
            <Button onPress={this.show_message_contents()} title="Show Message"></Button>
            <Text>{this.props.message.contents}</Text>
        </View>
        )
    }

    show_message_contents() {
        return () => {
            this.props.action()
        }
    }

} 