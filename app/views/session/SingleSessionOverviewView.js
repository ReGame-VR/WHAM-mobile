import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Image} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome'

export default class SingleSessionOverviewView {
    
    constructor(session, action, previous_session_score) {
        this.session = session
        this.action = action
        this.previous_session_score = previous_session_score
    }
    
    // Button  might remain centered because the width is 100% and the title is centered
    render() {
        var avg = Math.round(100*this.session.get_average_score())/100
        var improv = undefined
        if(this.previous_session_score !== undefined) {
            improv = <Text>Improvement: {this.get_percent_improvement()}%</Text>
        }
        return (
        <View style={{width:"100%", height: "15%"}}>
            <View style={{left: "2%", top: "2%", width: "98%", height:"98%"}}>
                <View style={styles.arrow_container}>
                    <View style={{position: "relative", flex: 1}}>
                        <Text>Score: {avg}</Text>
                        {improv}
                    </View>
                    <View style={{position: "relative", flex: 1}}>
                        {this.get_icon()}
                    </View>
                    <TouchableWithoutFeedback onPress={this.action}
                        style={{flex: 1, position: "relative"}}>
                        <Image source={require('../../assets/arrow.png')} style={{position:"absolute", top:"10%", width:"15%", height:"80%", right: 0}}></Image>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
        )
    }

    get_percent_improvement() {
        var avg = Math.round(100*this.session.get_average_score())/100
        var prev = Math.round(100*this.previous_session_score)/100
        return Math.round(100*(avg - prev) / ((Math.abs(avg)+Math.abs(prev))/2))
    }

    get_icon() {
        var pc = this.get_percent_improvement()/100
        var icon;
        if(this.previous_session_score === undefined) {
            return
        }
        if(pc < 0) {
            icon = Icons.arrowDown
        } else if(pc > 0) {
            icon = Icons.arrowUp
        } else {
            icon = Icons.minus
        }
        color = `rgb(${Math.max(0, -255*pc)},${Math.max(0, 255*pc)},0)`
        return <FontAwesome style={{fontSize: 32, color: color}}>{icon}</FontAwesome>
    }
}

const styles = StyleSheet.create({
    arrow_container: {
        flexDirection: "row",
        width: "100%",
        height: "100%"
    },
  });