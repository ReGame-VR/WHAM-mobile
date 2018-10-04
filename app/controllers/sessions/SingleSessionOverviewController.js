import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default class SingleSessionOverviewController extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return <View style={styles.container}>
                <Button onPress={this.props.action} title="More Info"></Button>
                <Text>{this.props.session.get_average_score()}</Text>
                </View>
    }

}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "green"
    },
  });