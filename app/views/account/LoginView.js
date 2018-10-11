import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';

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
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={this.change_username}
                    value={username_text}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    secureTextEntry={true}
                    onChangeText={this.change_password}
                    value={password_text}
                />
                <Button
                    onPress={this.login}
                    title="Login"
                    color="#841584"
                />
                <Button
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