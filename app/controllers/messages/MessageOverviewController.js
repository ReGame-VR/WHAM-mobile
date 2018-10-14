import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'
import SingleMessageOverviewController from './SingleMessageOverviewController'
import SingleMessageController from './SingleMessageController'
import MessageOverviewView from '../../views/message/MessageOverviewView'

/**
 * Gives an overview for every message this user has sent or received
 */
export default class MessageOverviewController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
        this.view = new MessageOverviewView(this.back, this.props.username, this.props.token, this.show_message)
    }

    componentDidMount() {
        NetworkAPI.get_all_patient_messages(this.props.username, this.props.token).then(messages => {
            this.setState({
                loaded: true,
                messages: messages.messages,
                stage: 0
            })
        })
    }

    render() {
        return this.view.render(this.state.loaded, this.state.stage, this.state.messages)
    }

    show_message = (messageID) => {
        return () => {
            this.setState({
                stage: messageID
            })
        }
    }

    back = () => {
            if(this.state.stage === 0) {
                this.props.back()
            } else {
                this.setState({
                    stage: 0
                })
            }
        }
    
} 