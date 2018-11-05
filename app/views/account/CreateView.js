import React from 'react'
import { View, Picker, TextInput, StyleSheet } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { FormInput, Button, Text} from 'react-native-elements'

export default class CreateView {

    constructor(username_action, password_action, date_action, weight_action, height_action, login, next_stage) {
        this.username_action = username_action
        this.password_action = password_action
        this.date_action = date_action
        this.weight_action = weight_action
        this.height_action = height_action
        this.login = login
        this.next_stage = next_stage
    }

    render(stage, date, height, weight, username_text, password_text, warning) {
        var contents;
        var title;
        if(stage === 1) {
            contents = this.get_date_picker(this.date_action, date)
            title = <Text>Select Your Birthday</Text>
        } else if(stage === 2) {
            contents = this.get_weight_selector(this.weight_action, weight)
            title = <Text>Select Your Weight</Text>
        } else if(stage === 3) {
            contents = this.get_height_selector(this.height_action, height)
            title = <Text>Select Your Height</Text>
        } else if(stage === 4) {
            contents = [<FormInput
                key="username"
                containerStyle={{left: "2%", width: "98%"}}
                placeholder='username'
                onChangeText={this.username_action}
                value={username_text}
                autoCapitalize="none"
            />,
            <FormInput
                key="password"
                containerStyle={{left: "2%", width: "98%"}}
                placeholder='password'
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                secureTextEntry={true}
                onChangeText={this.password_action}
                value={password_text}
                autoCapitalize="none"
            />,
            <Text key="warn">{warning}</Text>];
            title = <Text>Select Your Username/Password</Text>
        }
        return (
            <View style={styles.container}>
                {title}
                {contents}
                <Button title="next" 
                onPress={this.next_stage} 
                buttonStyle={styles.button}
                icon={{name: 'arrow-right', type: 'font-awesome'}}></Button>
                <Button title="back" 
                onPress={this.login} 
                buttonStyle={styles.button}
                icon={{name: 'arrow-left', type: 'font-awesome'}}></Button>
                
            </View>
        )
    }

    get_weight_selector(func, cur) {
        var options = []
        for(var i = 1; i < 400; i++) {
            options.push({
                val:i.toString() + " lbs",
                key:i.toString()
            })
        }
        return this.get_selector(options, func, cur)
    }
    
    get_height_selector(func, cur) {
        var options = []
        for(var i = 5; i < 108; i++) {
            options.push({
                val: Math.floor(i/12).toString() + "' " + (i%12).toString() + "\"",
                key:i.toString()
            })
        }
        return this.get_selector(options, func, cur)
    }

    get_selector(options, func, cur) {
        var contents = [];
        for(var i = 0; i < options.length; i++) {
            contents.push(<Picker.Item label={options[i].val} value={options[i].key} key={options[i].key}></Picker.Item>)
        }
        return <Picker
        selectedValue={cur}
        style={{ height: 200, width: 100 }}
        onValueChange={func}>
        {contents}
      </Picker>
    }

    get_date_picker(func, cur) {
        return <DatePicker
        style={{width: 200}}
        date={cur}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={func}/>
    }
 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        borderRadius: 5, 
        marginTop: 5
    }
  });