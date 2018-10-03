import React from 'react'
import FontAwesome from 'react-native-fontawesome'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';

export default class NotificationButtonController extends React.Component {

    // Props must include an icon, number, and action field
    constructor(props) {
        super(props);
    }

    render() {
        return  <View style={{backgroundColor: "green"}}>
                    <Text style={{margin: 10, fontSize: 60, textAlign: 'center'}}>
                        <FontAwesome>{this.props.icon}</FontAwesome>
                    </Text> 
                    <Text style={{position: "absolute", left: "45%", top: "50%"}}>{this.props.number}</Text>
                </View>
    }
    
} 