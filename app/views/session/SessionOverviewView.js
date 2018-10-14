import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import SingleSessionOverviewController from '../../controllers/sessions/SingleSessionOverviewController'
import SingleSessionController from '../../controllers/sessions/SingleSessionController'
import { BarChart, Grid } from 'react-native-svg-charts'

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
        for(var i = 0; i < sessions.length; i++) {
            data.push(sessions[i].get_average_score()*-200)
        }
        data.push(0)
        const fill = 'rgb(255, 0, 0)'
        return (
            <BarChart
                style={{ height: 100, top: 30 }}
                data={ data }
                svg={{ fill }}
                spacingInner={0.3}
                contentInset={{top: 30, left: 30}}
            ><Grid/>
            </BarChart>
        )
    }

    render_specific_session(id) {
        return <SingleSessionController sessionID={id} back={this.back}
        username={this.username} token={this.token}></SingleSessionController>
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