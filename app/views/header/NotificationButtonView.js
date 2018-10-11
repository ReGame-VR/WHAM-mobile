import React from 'react'
import FontAwesome from 'react-native-fontawesome'
import { Text, View, TouchableWithoutFeedback} from 'react-native';

export default class NotificationButtonController {

    // Props must include an icon, number, and action field
    constructor(action, icon, number) {
        this.action = action
        this.icon = icon
        this.number = number
    }

    render() {
        return  <TouchableWithoutFeedback onPress={this.action}>
                    <View style={{backgroundColor: "green"}} title="Hello">
                        <Text style={{margin: 10, fontSize: 60, textAlign: 'center'}}>
                            <FontAwesome>{this.icon}</FontAwesome>
                        </Text> 
                        <Text style={{position: "absolute", left: "45%", top: "50%"}}>{this.number}</Text>
                    </View>
                </TouchableWithoutFeedback>
    }
    
} 