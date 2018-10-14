import React from 'react'
import { Text, Button, View } from 'react-native'
import SessionRecorderView from '../../views/session/SessionRecorderView'

export default class SessionRecorderController extends React.Component {

    constructor(props) {
        super(props)
        this.view = new SessionRecorderView();
    }

    render() {
        return this.view.render();
    }

} 