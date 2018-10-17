import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback} from 'react-native';
import SingleSessionOverviewView from '../../views/session/SingleSessionOverviewView'

export default class SingleSessionOverviewController extends React.Component {
    
    constructor(props) {
        super(props)
        this.view = new SingleSessionOverviewView(this.props.session, this.props.action, this.props.previous_session_score);
    }
    
    // Button  might remain centered because the width is 100% and the title is centered
    render() {
        return this.view.render();
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "green"
    },
  });