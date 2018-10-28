import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import SingleSessionOverviewController from '../../controllers/sessions/SingleSessionOverviewController'
import SingleSessionController from '../../controllers/sessions/SingleSessionController'
import SessionGraphView from './graphs/SessionGraphView'
import { background } from '../../helpers/Colors'

export default class SessionOverviewView{
    
    constructor(back, action, username, token) {
        this.back = back
        this.action = action
        this.username = username
        this.token = token
    }

    render(sessions, stage) {
        return (
        <View style={styles.container}>
            {this.get_inner_part(sessions, stage)}
        </View>
        )
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
        for(var i = sessions.length-1; i >= Math.max(0, sessions.length-5); i--) {
            prev_score = undefined;
            if(i !== 0) {
                prev_score = sessions[i-1].get_average_score()
            }
            contents.push(<SingleSessionOverviewController session={sessions[i]} key={sessions[i].sessionID} previous_session_score={prev_score}
            action={this.action(sessions[i].sessionID)}></SingleSessionOverviewController>)
        }
        return <View style={{width: "100%", height: "100%", backgroundColor: background}}>
                    <View style={{height: "50%"}}>
                        <View style={{height: "5%"}}></View>
                        <View style={{height: "90%"}}>
                            {contents}
                        </View>
                        <View style={{height: "5%"}}></View>
                    </View>
                    <View style={{height:"50%", backgroundColor: background}}>
                        {this.get_bar_chart(sessions)}
                    </View>
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