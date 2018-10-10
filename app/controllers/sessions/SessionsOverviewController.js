import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import SingleSessionOverviewController from './SingleSessionOverviewController'
import SingleSessionController from './SingleSessionController'
import { BarChart, Grid } from 'react-native-svg-charts'

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
        var contents = []
        for(var i = 0; i < sessions.length; i++) {
            contents.push(<SingleSessionOverviewController session={sessions[i]} key={sessions[i].sessionID}
            action={this.action(sessions[i].sessionID)}></SingleSessionOverviewController>)
        }
        return <View style={{width: "100%", height: "100%"}}>
            {contents}
            {this.get_bar_chart()}
            </View>
    }

    get_bar_chart() {
        var sessions = this.props.sessions
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