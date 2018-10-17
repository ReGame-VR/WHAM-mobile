import React from 'react';
import { ContributionGraph } from 'react-native-chart-kit'
import { Dimensions, View, Text } from 'react-native'

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
            backgroundGradientFrom: 'rgb(255,255,255)',
            backgroundGradientTo: 'rgb(255,255,255)',
            color: (opacity = 1) => {
                return `rgba(${255-Math.round(255*opacity)}, ${255-Math.round(255*opacity)}, ${255-Math.round(255*opacity)}, ${2*opacity})`;
            },
            style: {
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
            <View style={{alignContent:'center', height:"100%"}}>
                <Text style={{alignSelf:"center"}}>Contribution Graph</Text>
                <ContributionGraph
                    values={ data }
                    endDate={new Date("2016-02-28")}
                    numDays={105}
                    style={{left: 0}}
                    width={ screenWidth - 10 }
                    height={220}
                    chartConfig={ chartConfig }
                    bezier
                >
                </ContributionGraph>
            </View>
        )
    }

}