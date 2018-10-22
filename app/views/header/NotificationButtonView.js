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
                    <View style={{}} title="Hello">
                        <Text style={{margin: 10, fontSize: 60, textAlign: 'center'}}>
                            <FontAwesome>{this.icon}</FontAwesome>
                        </Text> 
                        <View style={{position: "absolute", left: "35%", top: "35%", width: "30%", height: "30%"}}>
                            <NumberIcon number={this.number}></NumberIcon>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
    }
    
} 

class NumberIcon extends React.Component {

    render() {
        return (
            <View style={{borderRadius: 10, backgroundColor: "red", width: "100%", height: "100%", justifyContent: 'center'}}>
                <Text style={{textAlign: "center", fontSize: 20}}>{this.props.number}</Text>
            </View>
        )
    }

}