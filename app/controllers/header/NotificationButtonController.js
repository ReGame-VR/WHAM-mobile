import React from 'react'
import FontAwesome from 'react-native-fontawesome'
import { Text, View, TouchableWithoutFeedback} from 'react-native';
import NotificationButtonView from '../../views/header/NotificationButtonView'

export default class NotificationButtonController extends React.Component {

    // Props must include an icon, number, and action field
    constructor(props) {
        super(props);
        this.button = new NotificationButtonView(this.props.action, this.props.icon, this.props.number)
    }

    render() {
        return this.button.render()
    }
    
} 