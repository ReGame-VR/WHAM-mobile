import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'
import SingleMessageOverviewController from '../../controllers/messages/SingleMessageOverviewController'
import SingleMessageController from '../../controllers/messages/SingleMessageController'
import LoadingScreen from '../../controllers/LoadingView'
import { background } from '../../helpers/Colors'

/**
 * Gives an overview for every message this user has sent or received
 */
export default class MessageOverviewView {

    constructor(back, username, token, show_message) {
        this.back = back
        this.username = username
        this.token = token
        this.show_message = show_message
    }

    render(loaded, stage, messages) {
        if(loaded) {
            var contents;
            if(stage === 0) {
                contents = []
                for(var i = 0; i < messages.length; i++) {
                    contents.push(<SingleMessageOverviewController key={messages[i].messageID} message={messages[i]} action={this.show_message(messages[i].messageID)}></SingleMessageOverviewController>)
                    contents.push(<View style={{height: "3%"}} key={Math.random()}></View>)
                } 
            } else {
                contents = <SingleMessageController messageID={stage} username={this.username} token={this.token}></SingleMessageController>
            }
            return (
            <View style={{top: "5%", backgroundColor: background}}>
                <Text style={{textAlign: "center", fontSize: 25}}>Messages</Text>
                <View style={{height: "3%"}} key={Math.random()}></View>
                {contents}
                <Button onPress={this.back} title="back"></Button>
            </View>
            )
        } else {
            return <LoadingScreen></LoadingScreen>
        }
    }
    
} 