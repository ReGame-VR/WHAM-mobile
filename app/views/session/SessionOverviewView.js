import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import SingleSessionOverviewController from '../../controllers/sessions/SingleSessionOverviewController'
import SingleSessionController from '../../controllers/sessions/SingleSessionController'
import SessionGraphView from './graphs/SessionGraphView'

export default class SessionOverviewView{
    
    constructor(back, action, username, token) {
        this.back = back
        this.action = action
        this.username = username
        this.token = token
    }

    render(sessions, stage) {
        return <View style={styles.container}>{this.get_inner_part(sessions, stage)}</View>
    }

    get_inner_part(sessions, stage) {
        if(stage === 0) {
            return this.render_overview(sessions)
        } else {
            return this.render_specific_session(stage)
        }
    }

    render_overview(sessions) {
        var contents = []
        for(var i = 0; i < sessions.length; i++) {
            contents.push(<SingleSessionOverviewController session={sessions[i]} key={sessions[i].sessionID}
            action={this.action(sessions[i].sessionID)}></SingleSessionOverviewController>)
        }
        return <View style={{width: "100%", height: "100%"}}>
            {contents}
            {this.get_bar_chart(sessions)}
            </View>
    }

    get_bar_chart(sessions) {
        var data = []
        var labels = []
        for(var i = 0; i < sessions.length; i++) {
            if(sessions[i].scores.length === 0) {
                continue;
            }
            data.push(sessions[i].get_average_score()*-200)
            labels.push(sessions[i].scores[0].time);
        }
        return new SessionGraphView(data, labels).render();     
    }

    render_specific_session(id) {
        return <SingleSessionController sessionID={id} back={this.back}
        username={this.username} token={this.token}></SingleSessionController>
    }

} 

const styles = StyleSheet.create({
    container: {
      height: "70%",
      alignItems: 'center',
      justifyContent: 'center'
    },
  });