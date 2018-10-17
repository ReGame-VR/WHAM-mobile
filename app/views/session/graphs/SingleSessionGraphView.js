import React from 'react';
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

export default class SingleSessionGraphView {

    constructor(data, labels) {
        this.data = data
        this.labels = labels
    }

    render() {
        const graph_data = {
            labels: this.labels,
            datasets: [{
                data: this.data
            }]
        }
        const screenWidth = Dimensions.get('window').width

        const chartConfig = {
            backgroundGradientFrom: 'rgb(255,255,255)',
            backgroundGradientTo: 'rgb(255,255,255)',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
        }
        return (
            <LineChart
                width={screenWidth - 20}
                height={ 200 }
                data={ graph_data }
                chartConfig={chartConfig}
                bezier
            >
            </LineChart>
        )
    }

}