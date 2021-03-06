import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import LoginController from './app/controllers/account/LoginController'
import OverviewController from './app/controllers/overview/OverviewController'
import MessageOverviewController from './app/controllers/messages/MessageOverviewController'
import RequestController from './app/controllers/requests/RequestController'
import SettingsController from './app/controllers/account/SettingsController'
import CreateController from './app/controllers/account/CreateController'
import LoadingScreen from './app/controllers/LoadingView'
import { background } from './app/helpers/Colors'

var LOADING_STAGE = 0
var LOGIN_STAGE = 1
var OVERVIEW_STAGE = 2
var MESSAGE_STAGE = 3
var REQUEST_STAGE = 4
var SETTINGS_STAGE = 5
var CREATE_STAGE = 6


export default function() {

  class App extends React.Component {

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
              stage: OVERVIEW_STAGE,
              username: value.username,
              token: value.token
            })
          } else {
            throw new Error("No Login")
          }
         } catch (error) {
          this.setState({
            stage: LOGIN_STAGE
          })
        }
      }
      _retrieveData()
    }
  
    render() {
      return <View style={{backgroundColor: background, height: "100%", width: "100%"}}>
        {this.get_sub_part()}
      </View>
    }
  
    get_sub_part() {
      if(this.state.stage === LOADING_STAGE) {
        return <LoadingScreen></LoadingScreen>
      } else if(this.state.stage === LOGIN_STAGE) {
        return <LoginController done={this.hasLoggedIn()} create={this.create_account()}/>
      } else if(this.state.stage === OVERVIEW_STAGE) {
        return <OverviewController username={this.state.username} token={this.state.token} logout={this.logout()}
        message_action={this.message_action()} request_action={this.request_action()} settings={this.settings()}
        />
      } else if(this.state.stage === MESSAGE_STAGE) {
        return <MessageOverviewController username={this.state.username} token={this.state.token} back={this.go_to_overview()}/>
      } else if(this.state.stage === REQUEST_STAGE) {
        return <RequestController username={this.state.username} token={this.state.token} back={this.go_to_overview()}/>
      } else if(this.state.stage === SETTINGS_STAGE) {
        return <SettingsController username={this.state.username} token={this.state.token} back={this.go_to_overview()}/>
      } else if(this.state.stage === CREATE_STAGE) {
        return <CreateController login={this.login()} done={this.hasLoggedIn()}/>
      }
    }
  
    hasLoggedIn() {
      return (username, token) => {
        _storeData = async () => {
          await AsyncStorage.setItem('LOGIN', JSON.stringify({
              username: username,
              token: token
          }));
        }
        _storeData().then(() => {
          this.setState({
            stage: OVERVIEW_STAGE,
            username: username,
            token: token
          })
        })
      }
    }
  
    go_to_overview() {
      return () => {
        this.setState({
          stage: OVERVIEW_STAGE
        })
      }
    }
    
    login() {
      return () => {
        this.setState({
          stage: LOGIN_STAGE
        })
      }
    }
  
    logout() {
      return () => {
        this.setState({
          stage: LOGIN_STAGE
        })
      }
    }
  
    message_action() {
      return () => {
        this.setState({
          stage: MESSAGE_STAGE
        })
      }
    }
  
    request_action() {
      return () => {
        this.setState({
          stage: REQUEST_STAGE
        })
      }
    }
  
    settings() {
      return () => {
        this.setState({
          stage: SETTINGS_STAGE
        })
      }
    }
  
    create_account() {
      return () => {
        this.setState({
          stage: CREATE_STAGE
        })
      }
    }
   }

   return App
}

