import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import SessionOverviewView from '../../views/session/SessionOverviewView'

export default class SessionOverviewController extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            stage: 0
        }
        this.view = new SessionOverviewView(this.back, this.action, this.props.username, this.props.token)
    }

    render() {
        return this.view.render(this.props.sessions, this.state.stage)
    }
 
    action = (
    (id) => {
        return () => {
            this.setState({
                stage: id
            })
        }
    }
    )

    back = () => {
            this.setState({
                stage: 0
            })
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