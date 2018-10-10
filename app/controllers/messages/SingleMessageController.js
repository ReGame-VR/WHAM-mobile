import React from 'react'
import { Text, ScrollView, TextInput, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI';
import ReplyModel from '../../models/messages/ReplyModel'

/**
 * Gives a detailed view for a single message
 * Allows replies and viewing the whole thread
 */
export default class SingleMessageController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            reply_text: "Reply"
        }
    }

    componentDidMount() {
        NetworkAPI.get_specific_patient_message(this.props.username, this.props.messageID, this.props.token).then(message => {
            this.setState({
                loaded: true,
                message: message
            })
        })
    }

    render() {
        var replies = []
        if(this.state.loaded) {
            var replies_object = this.state.message.replies
            for(var i = 0; i < replies_object.length; i++) {
                replies.push(<Text key={Math.random()}>{replies_object[i].reply_content}</Text>)
            }
            return (
            <ScrollView>
                <Text>{this.state.message.contents}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({reply_text: text})}
                    value={this.state.reply_text}
                />
                <Button title="Send Reply" onPress={this.send_reply}></Button>
                {replies}
            </ScrollView>
            )
        } else {
            return <Text>Loading</Text>
        }
    }

    send_reply = () => {
        NetworkAPI.send_reply(this.props.messageID, this.props.username, this.props.username, this.state.reply_text, this.props.token).then(() => {
            var next_message = this.state.message
            next_message.replies.push(new ReplyModel(this.props.messageID, this.props.username, this.state.reply_text, new Date()))
            this.setState({
                reply_text: "Reply",
                message: next_message
            })
        })
    }
 
}