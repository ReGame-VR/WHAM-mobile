import React from 'react'
import FontAwesome from 'react-native-fontawesome'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';

export default class NotificationButtonController extends React.Component {

    // Props must include an icon field
    constructor(props) {
        super(props);
    }

    render() {
        return <FontAwesome>{this.props.icon}</FontAwesome>
    }
    
} 