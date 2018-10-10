import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default class SingleSessionOverviewController extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return <View style={styles.container}>
                <Button onPress={this.props.action} title="More Info"
                style={{position: "absolute", flex: 1, right: 0}}></Button>
                <Text style={{position: "absolute", flex: 1, left: 0}}>
                {this.props.session.get_average_score()}</Text>
                </View>
    }

}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: "green"
    },
  });