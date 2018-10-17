import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI'
import SingleSessionGraphView from './graphs/SingleSessionGraphView'
import { ratingToString } from '../../helpers/SessionTranslator'

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
                labels.push("")
                data.push(scores[i].score)
            }
            contents.push(this.renderRating(session.engagement, "Engaged"));
            contents.push(this.renderRating(session.motivation, "Motivated"));
            contents.push(this.renderRating(session.effort, "Happy"));
        }
        var graph = new SingleSessionGraphView(data, labels)
        return (
            <View style={{width: "100%", height:"100%"}}> 
                <View style={{width: "100%"}}>
                    {graph.render()}
                </View>
                <View>
                    {contents}
                </View>
                <Button onPress={this.back} title="Back"></Button>
            </View>
        )
    }

    // String String -> JSXElement
    renderRating(rating, noun) {
        var str = ratingToString(rating, noun)
        console.log(str)
        return <Text style={rating_text_style.titleText} key={noun}>{str}</Text>
    }
}

const rating_text_style = StyleSheet.create({
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: "left",
      paddingLeft: 20,
      width: "100%"
    },
  });