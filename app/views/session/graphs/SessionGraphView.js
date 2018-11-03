import React from 'react';
import { ContributionGraph } from 'react-native-chart-kit'
import { Dimensions, View, Text } from 'react-native'
import { brown, black, background } from '../../../helpers/Colors'

export default class SessionGraphView {

    constructor(data, labels) {
        this.data = data
        this.labels = labels
        this.min = 1000000
        for(var i = 0; i < data.length; i++) {
            if(data[i] < this.min) {
                this.min = data[i]
            }
        }
    }

    render() {
        const screenWidth = Dimensions.get('window').width
        const chartConfig = {
            backgroundGradientFrom: background,
            backgroundGradientTo: background,
            color: (opacity = 1) => {
                if(opacity != 0.15) {
                    return black
                } else {
                    return `rgba(${255-Math.round(255*opacity)}, ${255-Math.round(255*opacity)}, ${255-Math.round(255*opacity)}, ${2*opacity})`;
                }
            },
            style: {
                backgroundColor: background,
                borderRadius: 16
              }
        }
        var data = [];
        for(var i = 0; i < this.labels.length; i++) {
            data.push({
                date: this.labels[i],
                count: this.data[i] - this.min + 1
            })
        }
        return (
            <View style={{alignContent:'center', height:"100%", backgroundColor: background}}>
                <Text style={{alignSelf:"center"}}>Contribution Graph</Text>
                <ContributionGraph 
                    values={ data }
                    endDate={new Date()}
                    numDays={105}
                    style={{left: 0}}
                    width={ screenWidth - 10 }
                    height={220}
                    chartConfig={ chartConfig }
                >
                </ContributionGraph>
            </View>
        )
    }

}