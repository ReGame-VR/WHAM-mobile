import NotificationButtonController from './NotificationButtonController'
import React from 'react'
import { Icons } from 'react-native-fontawesome'

export default class RequestButtonController extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <NotificationButtonController icon={Icons.handshakeO} number={this.props.requests.length} action={this.props.action}>></NotificationButtonController>
    }

}