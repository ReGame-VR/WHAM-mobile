import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import MessageButtonController from '../../controllers/header/MessageButtonController'
import RequestButtonController from '../../controllers/header/RequestButtonController'

export default class HeaderView {

    constructor(messages, message_action, requests, request_action, logout, settings_action) {
        this.messages = messages
        this.message_action = message_action
        this.requests = requests
        this.request_action = request_action
        this.logout = logout
        this.settings_action = settings_action
    }

    render() {
        return <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <MessageButtonController messages={this.messages} style={{alignSelf: 'flex-start', flex: 1}} action={this.message_action}></MessageButtonController>
                        <View style={{flex: 1}}></View>
                        <RequestButtonController requests={this.requests} style={{alignSelf: 'flex-end', flex: 1}} action={this.request_action}></RequestButtonController>
                    </View>
                    <Button
                        onPress={this.logout}
                        title="Logout"
                        color="#841584"
                    />
                    <Button
                        onPress={this.settings_action}
                        title="Settings"
                        color="#841584"
                    />
                </View>
    }

}

const styles = StyleSheet.create({
    container: {
      height: "20%",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "red"
    },
  });