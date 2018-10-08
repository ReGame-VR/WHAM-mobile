import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import SingleSessionOverviewController from './SingleSessionOverviewController'
import SingleSessionController from './SingleSessionController'

export default class SessionOverviewController extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            stage: 0
        }
    }

    render() {
        return <View style={styles.container}>{this.get_inner_part()}</View>
    }

    get_inner_part() {
        if(this.state.stage === 0) {
            return this.render_overview()
        } else {
            return this.render_specific_session(this.state.stage)
        }
    }

    render_overview() {
        var sessions = this.props.sessions
        var to_display = []
        for(var i = 0; i < sessions.length; i++) {
            to_display.push(<SingleSessionOverviewController session={sessions[i]} key={sessions[i].sessionID}
            action={this.action(sessions[i].sessionID)}></SingleSessionOverviewController>)
        }
        return to_display
    }

    render_specific_session(id) {
        return <SingleSessionController sessionID={id} back={this.back()}
        username={this.props.username} token={this.props.token}></SingleSessionController>
    }
 
    action(id) {
        return () => {
            this.setState({
                stage: id
            })
        }
    }

    back() {
        return () => {
            this.setState({
                stage: 0
            })
        }
    }

} 

const styles = StyleSheet.create({
    container: {
      height: "70%",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "blue"
    },
  });