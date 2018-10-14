import React from 'react'
import { Text, ScrollView, TextInput, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI';
import ReplyModel from '../../models/messages/ReplyModel'
import SingleMessageView from '../../views/message/SingleMessageView'

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
        this.view = new SingleMessageView(this.send_reply, (text) => this.setState({reply_text: text}))
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
        return this.view.render(this.state.loaded, this.state.message, this.state.reply_text)
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