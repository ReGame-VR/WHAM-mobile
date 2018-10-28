import React from 'react'
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import HeaderController from '../../controllers/header/HeaderController'
import SessionOverviewController from '../../controllers/sessions/SessionsOverviewController'
import SessionRecorderController from '../../controllers/sessions/recording/SessionRecorderController'
import LoadingScreen from '../../controllers/LoadingView'
import { background } from '../../helpers/Colors'

export default class OverviewController {

    constructor(logout_action, settings_action, request_action, message_action, username, token, loader) {
        this.logout_action = logout_action
        this.settings_action = settings_action
        this.request_action = request_action
        this.message_action = message_action
        this.username = username
        this.token = token
        this.loader = loader
    }

    render(loaded, requests, messages, sessions) {
        if(loaded) {
            return <View style={{backgroundColor: background}}>
                        <HeaderController logout={this.logout_action} requests={requests} messages={messages}
                        message_action={this.message_action} request_action={this.request_action} settings={this.settings_action}
                        ></HeaderController>
                        <SessionOverviewController sessions={sessions}
                        username={this.username} token={this.token}></SessionOverviewController>
                        <SessionRecorderController username={this.username} token={this.token} loader={this.loader}></SessionRecorderController>
                    </View>
        } else {
            return <LoadingScreen></LoadingScreen>
        }
    }

}