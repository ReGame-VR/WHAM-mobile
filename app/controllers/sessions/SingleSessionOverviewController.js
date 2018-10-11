import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback} from 'react-native';

export default class SingleSessionOverviewController extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    // Button  might remain centered because the width is 100% and the title is centered
    render() {
        return (
        <View style={styles.container}>
            <Text style={{position: "relative", flex: 1}}>{this.props.session.get_average_score()}</Text>
            <TouchableWithoutFeedback onPress={this.props.action}
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