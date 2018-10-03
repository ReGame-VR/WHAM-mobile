import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';


export default class RequestController extends React.Component {

    render() {
        return  <View>
                    <Text>FILLER</Text>
                    <Text>REQUESTS!</Text>
                    <Button onPress={this.props.back} title="back">BACK</Button>
                </View>
    }

} 