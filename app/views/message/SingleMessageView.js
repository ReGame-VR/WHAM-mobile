import React from 'react'
import { Text, ScrollView, TextInput, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI';
import ReplyModel from '../../models/messages/ReplyModel'

/**
 * Gives a detailed view for a single message
 * Allows replies and viewing the whole thread
 */
export default class SingleMessageView {

    constructor(send_reply, reply_action) {
        this.send_reply = send_reply
        this.reply_action = reply_action
    }

    render(loaded, message, reply_text) {
        var replies = []
        if(loaded) {
            var replies_object = message.replies
            for(var i = 0; i < replies_object.length; i++) {
                replies.push(<Text key={Math.random()}>{replies_object[i].reply_content}</Text>)
            }
            return (
            <ScrollView>
                <Text>{message.contents}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={this.reply_action}
                    value={reply_text}
                />
                <Button title="Send Reply" onPress={this.send_reply}></Button>
                {replies}
            </ScrollView>
            )
        } else {
            return <Text>Loading</Text>
        }
    }
 
}