import React from 'react';
import { Image, View } from 'react-native'
import { background } from '../helpers/Colors'

export default class LoadingScreen extends React.Component {

    render() {
        return (
        <View style={{justifyContent: 'center', backgroundColor: background, height: "100%"}}>
            <Image 
            style={{alignSelf: "center"}}
            source={require('../assets/loading.gif')} />
        </View>
        )

    }

}