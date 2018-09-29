import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'

export default class LoginController extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username_text: "username",
            password_text: "password",
            warning: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.warning}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({username_text: text})}
                    value={this.state.username_text}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password_text: text})}
                    value={this.state.password_text}
                />
                <Button
                    onPress={() => this.login()}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }

    login() {
        NetworkAPI.login(this.state.username_text, this.state.password_text).then(token => {
            _storeData = async () => {
                await AsyncStorage.setItem('LOGIN', JSON.stringify({
                    username: this.state.username_text,
                    token: token
                }));
                this.props.done(this.state.username_text, token);
              }
            _storeData()
        }).catch(error => {
            this.setState({
                warning: "Incorrect password/username"
            })
        })
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });