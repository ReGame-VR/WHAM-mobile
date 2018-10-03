import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';

export default class MessageController extends React.Component {

    render() {
        return <View>
                    <Text>FILLER</Text>
                    <Text>MESSAGES!</Text>
                    <Button onPress={this.props.back} title="back"></Button>
                </View>
    }
    
} 