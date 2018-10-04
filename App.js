import React from 'react';
import { Font } from 'expo'
import { View, Text, AsyncStorage } from 'react-native';
import LoginController from './app/controllers/account/LoginController'
import OverviewController from './app/controllers/overview/OverviewController'
import MessageController from './app/controllers/messages/MessageController'
import RequestController from './app/controllers/requests/RequestController'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stage: 0 // 0 = Loading, 1 = Logging, 2=Overview, 3=Messages
    }
  }

  componentDidMount() {
    _retrieveData = async () => {
      try {
        const value = JSON.parse(await AsyncStorage.getItem('LOGIN'));
        if (value !== null) {
          this.setState({
            stage: 2,
            username: value.username,
            token: value.token
          })
        } else {
          throw new Error("No Login")
        }
       } catch (error) {
        this.setState({
          stage: 1,
        })
      }
    }
    Font.loadAsync({
      "FontAwesome": require('./app/assets/fonts/FontAwesome.ttf')
    }).then(() => _retrieveData())
  }

  render() {
    if(this.state.stage === 0) {
      return <View><Text>Loading</Text></View>
    } else if(this.state.stage === 1) {
      return <LoginController done={this.hasLoggedIn()}></LoginController>
    } else if(this.state.stage === 2) {
      return <OverviewController username={this.state.username} token={this.state.token} logout={this.logout()}
      message_action={this.message_action()} request_action={this.request_action()}
      ></OverviewController>
    } else if(this.state.stage === 3) {
      return <MessageController username={this.state.username} token={this.state.token} back={this.go_to_overview()}></MessageController>
    } else if(this.state.stage === 4) {
      return <RequestController username={this.state.username} token={this.state.token} back={this.go_to_overview()}></RequestController>
    }
  }

  hasLoggedIn() {
    return (username, token) => {
      this.setState({
        stage: 2,
        username: username,
        token: token
      })
    }
  }

  go_to_overview() {
    return () => {
      this.setState({
        stage: 2
      })
    }
  }

  logout() {
    return () => {
      this.setState({
        stage: 1
      })
    }
  }

  message_action() {
    return () => {
      this.setState({
        stage: 3
      })
    }
  }

  request_action() {
    return () => {
      this.setState({
        stage: 4
      })
    }
  }
 }

