import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';

export default class HeaderController extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <View style={styles.container}>
                    <Button
                        onPress={this.logout()}
                        title="Logout"
                        color="#841584"
                    >
                    </Button>
                    <Text>THIS IS A HEADER</Text>
                </View>
    }

    // Void -> (Void -> Promise(Void))
    // Deletes the login info and resets to the login screen
    logout() {
        return async () => {
            console.log("logging");
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