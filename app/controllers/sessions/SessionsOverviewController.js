import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import SingleSessionController from './SingleSessionController'

export default class SessionOverviewController extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        var sessions = this.props.sessions
        var to_display = []
        for(var i = 0; i < sessions.length; i++) {
            to_display.push(<SingleSessionController session={sessions[i]} key={sessions[i].sessionID}></SingleSessionController>)
        }
        return <View style={styles.container}>{to_display}</View>
    }

}

const styles = StyleSheet.create({
    container: {
      height: "80%",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "blue"
    },
  });