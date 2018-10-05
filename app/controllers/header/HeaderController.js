import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import MessageButtonController from './MessageButtonController'
import RequestButtonController from './RequestButtonController'

export default class HeaderController extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <MessageButtonController messages={this.props.messages} style={{alignSelf: 'flex-start', flex: 1}} action={this.props.message_action}></MessageButtonController>
                        <View style={{flex: 1}}></View>
                        <RequestButtonController requests={this.props.requests} style={{alignSelf: 'flex-end', flex: 1}} action={this.props.request_action}></RequestButtonController>
                    </View>
                    <Button
                        onPress={this.logout()}
                        title="Logout"
                        color="#841584"
                    />
                    <Button
                        onPress={this.props.settings}
                        title="Settings"
                        color="#841584"
                    />
                </View>
    }

    // Void -> (Void -> Promise(Void))
    // Deletes the login info and resets to the login screen
    logout() {
        return async () => {
            await AsyncStorage.removeItem('LOGIN')
            this.props.logout();
          }
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