import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'

export default class MessageController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        NetworkAPI.get_all_patient_messages(this.props.username, this.props.token).then(messages => {
            this.setState({
                loaded: true,
                messages: messages
            })
        })
    }

    render() {
        if(this.state.loaded) {
            return (
            <View>
                <Text>FILLER</Text>
                <Text>MESSAGES!</Text>
                <Button onPress={this.props.back} title="back"></Button>
            </View>
            )
        } else {
            return <Text>Loading</Text>
        }
    }
    
} 