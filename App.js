import React from 'react';
import { Font } from 'expo'
import { View, Text, AsyncStorage } from 'react-native';
import LoginController from './app/controllers/account/LoginController'
import OverviewController from './app/controllers/overview/OverviewController'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    _retrieveData = async () => {
      try {
        const value = JSON.parse(await AsyncStorage.getItem('LOGIN'));
        if (value !== null) {
          this.setState({
            loaded: true,
            login: false,
            username: value.username,
            token: value.token
          })
        } else {
          throw new Error("No Login")
        }
       } catch (error) {
        this.setState({
          loaded: true,
          login: true
        })
      }
    }
    Font.loadAsync({
      "FontAwesome": require('./app/assets/fonts/FontAwesome.ttf')
    }).then(() => _retrieveData())
  }

  render() {
    if(!this.state.loaded) {
      return <View><Text>Loading</Text></View>
    }
    if(this.state.login) {
      return (
        <LoginController done={this.hasLoggedIn()}></LoginController>
      );
    } else {
      return (
        <OverviewController username={this.state.username} token={this.state.token} logout={this.logout()}></OverviewController>
      )
    }
  }

  hasLoggedIn() {
    return (username, token) => {
      this.setState({
        login: false,
        username: username,
        token: token
      })
    }
  }

  logout() {
    return () => {
      this.setState({
        login: true
      })
    }
  }
 }

