import React from 'react'
import { Text, View, Button, Picker, TextInput } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { FormInput } from 'react-native-elements'

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
        if(stage === 0) {
            contents = <Text>C1</Text>
        } else if(stage === 1) {
            contents = this.get_date_picker(this.date_action, date)
        } else if(stage === 2) {
            contents = this.get_weight_selector(this.weight_action, weight)
        } else if(stage === 3) {
            contents = this.get_height_selector(this.height_action, height)
        } else if(stage === 4) {
            contents = [<FormInput
                key="username"
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={this.username_action}
                value={username_text}
                placeholder="username"
            />,
            <FormInput
                key="password"
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                secureTextEntry={true}
                onChangeText={this.password_action}
                value={password_text}
                placeholder="password"
            />,
            <Text key="warn">{warning}</Text>];
        }
        return (
            <View>
                <Text>CREATE</Text>
                <Text>CREATE</Text>
                <Button title="back" onPress={this.login}></Button>
                <Button title="next" onPress={this.next_stage}></Button>
                {contents}
            </View>
        )
    }

    get_weight_selector(func, cur) {
        var options = []
        for(var i = 1; i < 400; i++) {
            options.push(i.toString())
        }
        return this.get_selector(options, func, cur)
    }
    
    get_height_selector(func, cur) {
        var options = []
        for(var i = 5; i < 108; i++) {
            options.push(i.toString())
        }
        return this.get_selector(options, func, cur)
    }

    get_selector(options, func, cur) {
        var contents = [];
        for(var i = 0; i < options.length; i++) {
            contents.push(<Picker.Item label={options[i]} value={options[i]} key={options[i]}></Picker.Item>)
        }
        return <Picker
        selectedValue={cur}
        style={{ height: 50, width: 100 }}
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