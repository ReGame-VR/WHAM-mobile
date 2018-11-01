import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginView {
    
    constructor(change_username, change_password, login, create) {
        this.change_username = change_username
        this.change_password = change_password
        this.login = login
        this.create = create
    }

    render(username_text, password_text, warning) {
        return (
            <View style={styles.container}>
                <Text>{warning}</Text>
                <FormInput
                    containerStyle={{left: "2%", width: "98%"}}
                    placeholder='username'
                    onChangeText={this.change_username}
                    value={username_text}
                    autoCapitalize="none"
                />
                <FormInput
                    containerStyle={{left: "2%", width: "98%"}}
                    placeholder='password'
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    secureTextEntry={true}
                    onChangeText={this.change_password}
                    value={password_text}
                    autoCapitalize="none"
                />
                <Button
                    icon={{name: 'sign-in', type: 'font-awesome'}}
                    buttonStyle={{borderRadius: 5, marginTop: 5}}
                    onPress={this.login}
                    title="Login"
                    color="#841584"
                />
                <Button
                    icon={{name: 'user', type: 'font-awesome'}}
                    buttonStyle={{borderRadius: 5, marginTop: 5}}
                    onPress={this.create}
                    title="Create Account"
                    color="#841584"
                />
            </View>
        );
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