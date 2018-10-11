import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    AsyncStorage
} from 'react-native';
import HeaderView from '../../views/header/HeaderView'

export default class HeaderController extends React.Component {

    constructor(props) {
        super(props)
        this.view = new HeaderView(this.props.messages, this.props.message_action, this.props.requests, this.props.request_action, this.logout, this.props.settings)
    }

    render() {
        return this.view.render()
    }

    // Void -> (Void -> Promise(Void))
    // Deletes the login info and resets to the login screen
    logout = async () => {
        await AsyncStorage.removeItem('LOGIN')
        this.props.logout();
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