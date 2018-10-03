import NotificationButtonController from './NotificationButtonController'
import React from 'react'
import { Icons } from 'react-native-fontawesome'

export default class MessageButtonController extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <NotificationButtonController icon={Icons.inbox} number={this.props.messages.length} action={this.props.action}></NotificationButtonController>
    }

}