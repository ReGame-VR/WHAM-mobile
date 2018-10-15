import React from 'react'
import { View, Text, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI'
import SingleSessionGraphView from './graphs/SingleSessionGraphView'

export default class SingleSessionView {

    constructor(back) {
        this.back = back
    }

    render(loaded, session) {
        var contents = [] 
        var labels = [];
        var data = [];
        if(loaded === true) {
            var scores = session.scores
            for(var i = 0; i < scores.length; i++) {
                labels.push(scores[i].time)
                data.push(scores[i].score)
                contents.push(<Text key={scores[i].time}>{scores[i].score}</Text>)
            }
        }
        var graph = new SingleSessionGraphView(data, labels)
        return (
            <View>
                {graph.render()}
                <View style={{alignSelf:"center"}}>
                    {contents}
                </View>
                <Button onPress={this.back} title="Back"></Button>
            </View>
        )
    }

}