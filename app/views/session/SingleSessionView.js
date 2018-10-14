import React from 'react'
import { View, Text, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class SingleSessionView {

    constructor(back) {
        this.back = back
    }

    render(loaded, session) {
        var contents = [] 
        if(loaded === true) {
            var scores = session.scores
            for(var i = 0; i < scores.length; i++) {
                contents.push(<Text key={scores[i].time}>{scores[i].score}</Text>)
            }
        }
        return (
            <View>
                {contents}
                <Button onPress={this.back} title="Back"></Button>
            </View>
        )
    }

}