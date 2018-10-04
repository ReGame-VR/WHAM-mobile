import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'
import MessageOverviewController from './MessageOverviewController'
import SingleMessageController from './SingleMessageController'

export default class MessageController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
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
        if(this.state.loaded) {
            var contents;
            if(this.state.stage === 0) {
                contents = []
                for(var i = 0; i < this.state.messages.length; i++) {
                    contents.push(<MessageOverviewController key={this.state.messages[i].messageID} message={this.state.messages[i]} action={this.show_message(this.state.messages[i].messageID)}></MessageOverviewController>)
                } 
            } else {
                contents = <SingleMessageController messageID={this.state.stage}></SingleMessageController>
            }
            return (
            <View>
                <Text>FILLER</Text>
                <Text>MESSAGES!</Text>
                <Button onPress={this.back()} title="back"></Button>
                {contents}
            </View>
            )
        } else {
            return <Text>Loading</Text>
        }
    }

    show_message(messageID) {
        return () => {
            this.setState({
                stage: messageID
            })
        }
    }

    back() {
        return () => {
            if(this.state.stage === 0) {
                this.props.back()
            } else {
                this.setState({
                    stage: 0
                })
            }
        }
    }
    
} 