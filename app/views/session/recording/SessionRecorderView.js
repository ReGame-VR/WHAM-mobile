import React from 'react'
import { Text, Button, View } from 'react-native'
import SessionQuestionairController from '../../../controllers/sessions/recording/SessionQuestionairController'

export default class SessionRecorderView {

    constructor(start_recording, stop_recording, stop_questioning, username, token, loader) {
        this.start_recording = start_recording 
        this.stop_recording = stop_recording
        this.stop_questioning = stop_questioning
        this.username = username
        this.token = token
        this.loader = loader
    }

    render(recording, session, questioning, status) {
        if(questioning) {
            return <SessionQuestionairController loader={this.loader} username={this.username} token={this.token} session={session} stop_questioning= {this.stop_questioning}></SessionQuestionairController>
        } 
        if(recording) {
            return (
                <View style={{height: "10%"}}>
                    <Text>Time: {Math.round(100*session.get_total_length())/100}</Text>
                    <Text>{status}</Text>
                    <Button onPress={this.stop_recording} title="Stop Recording"></Button>
                </View>
                )
        } else {
            return (
                <View style={{height: "10%"}}>
                    <Button onPress={this.start_recording} title="Record Session"></Button>
                </View>
                )
        }
    }

} 