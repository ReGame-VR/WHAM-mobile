import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import NetworkAPI from '../../helpers/NetworkAPI'

export default class RequestController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        NetworkAPI.load_patient_overview(this.props.username, this.props.token).then(overview => {
            this.setState({
                loaded: true,
                requests: overview.requests
            })
        })
    }

    render() {
        if(this.state.loaded) {
            return (
            <View>
                <Text>FILLER</Text>
                <Text>REQUESTS!</Text>
                <Button onPress={this.props.back} title="back"></Button>
            </View>
            )
        } else {
            return <Text>Loading</Text>
        }
    }

} 