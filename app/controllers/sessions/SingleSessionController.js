import React from 'react'
import { View, Text, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class SingleSessionController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        NetworkAPI.get_specific_session(this.props.sessionID, this.props.username, this.props.token).then(session => {
            this.setState({
                loaded: true,
                session: session
            })
        })
    }

    render() {
        var contents = []
        if(this.state.loaded === true) {
            var scores = this.state.session.scores
            for(var i = 0; i < scores.length; i++) {
                contents.push(<Text key={scores[i].time}>{scores[i].score}</Text>)
            }
        }
        return (
            <View>
                {contents}
                <Button onPress={this.props.back} title="Back"></Button>
            </View>
        )
    }

}