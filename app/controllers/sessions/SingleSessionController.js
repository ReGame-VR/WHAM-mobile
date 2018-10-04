import React from 'react'
import { Text, Button } from 'react-native'

export default class SingleSessionController extends React.Component {

    render() {
        return <Button onPress={this.props.back} title="Back"></Button>

    }

}