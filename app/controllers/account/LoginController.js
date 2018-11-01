import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'
import LoginView from '../../views/account/LoginView'

export default class LoginController extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username_text: "",
            password_text: "",
            warning: ""
        }
        this.view = new LoginView((text) => this.setState({username_text: text}), (text) => this.setState({password_text: text}), this.login, this.props.create)
    }

    render() {
        return this.view.render(this.state.username_text, this.state.password_text, this.state.warning)
    }

    login = () => {
        NetworkAPI.login(this.state.username_text, this.state.password_text).then(token => {
            this.props.done(this.state.username_text, token);
        }).catch(error => {
            this.setState({
                warning: "Incorrect password/username"
            })
        })
    }

}