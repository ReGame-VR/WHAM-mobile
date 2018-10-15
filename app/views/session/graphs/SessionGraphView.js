import React from 'react';
import { ContributionGraph } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default class SessionGraphView {

    constructor(data, labels) {
        this.data = data
        this.labels = labels
        this.min = 1000000
        for(var i = 0; i < data; i++) {
            if(data < this.min) {
                this.min = data
            }
        }
    }

    render() {
        const screenWidth = Dimensions.get('window').width
        const chartConfig = {
            backgroundGradientFrom: 'rgb(255,255,255)',
            backgroundGradientTo: 'rgb(255,255,255)',
            color: (opacity = 1) => `rgba(255, 0, 0, ${0.2-opacity})`
        }
        var data = [];
        for(var i = 0; i < this.labels.length; i++) {
            data.push({
                date: this.labels[i],
                count: this.data[i] - this.min + 1
            })
        }
        console.log(data)
        return (
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
        )
    }

}