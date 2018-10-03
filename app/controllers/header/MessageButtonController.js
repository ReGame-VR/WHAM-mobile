import NotificationButtonController from './NotificationButtonController'
import React from 'react'
import { Icons } from 'react-native-fontawesome'

export default class MessageButtonController extends NotificationButtonController {

    constructor(props) {
        props.icon = Icons.inbox
        super(props);
    }

}