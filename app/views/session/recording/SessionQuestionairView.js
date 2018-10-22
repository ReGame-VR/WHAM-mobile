import React from 'react'
import { Text, Button, View, TouchableWithoutFeedback } from 'react-native'

export default class SessionQuestionairView {

    constructor(stop_questioning, set_item) {
        this.stop_questioning = stop_questioning
        this.set_item = set_item
    }

    render(stage) {
        if(stage === 0) {
            return <ItemRater id="engagement" set_item={this.set_item}></ItemRater>
        } else if(stage === 1) {
            return <ItemRater id="motivation" set_item={this.set_item}></ItemRater>
        } else if(stage === 2) {
            return <ItemRater id="effort" set_item={this.set_item}></ItemRater>
        } else {
            return <Button title="done" onPress={this.stop_questioning}></Button>
        }
    }

}

class ItemRater extends React.Component {

     render() {
        return (
            <View>
                <Text style={{textAlign: "center", fontSize: 20, height: 25}}>{this.props.id}</Text>
                <View style={{flexDirection: "row"}}>
                    {this.get_item(0)}
                    {this.get_item(5)}
                    {this.get_item(10)}
                </View>
            </View>
        )
     }

     get_item(level) {
        return (
            <View style={this.button_style}>
                <TouchableWithoutFeedback onPress={() => this.props.set_item(this.props.id, level)}>
                    {this.get_emoji(level)}
                </TouchableWithoutFeedback>
            </View>
        )
     }

     get_emoji(level) {
        var text = "";
        if(level < 3) {
            text = "😞"
        } else if(level < 6) {
            text = "😕"
        } else { 
            text = "😊"
        }
        return <View><Text style={{fontSize: 50, textAlign: 'center'}}>{text}</Text></View>
     }
 
     button_style = {
         width: "33%",
         height: "100%",
     }

}