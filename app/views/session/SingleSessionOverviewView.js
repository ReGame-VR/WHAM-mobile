import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback} from 'react-native';

export default class SingleSessionOverviewView {
    
    constructor(session, action) {
        this.session = session
        this.action = action
    }
    
    // Button  might remain centered because the width is 100% and the title is centered
    render() {
        return (
        <View style={styles.container}>
            <Text style={{position: "relative", flex: 1}}>{this.session.get_average_score()}</Text>
            <TouchableWithoutFeedback onPress={this.action}
                style={{flex: 1, position: "relative"}}>
                <View><Text>Press Me!</Text></View>
            </TouchableWithoutFeedback>
        </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "green"
    },
  });