import React from 'react'
import { Text, View, Button, Picker, TextInput } from 'react-native'
import DatePicker from 'react-native-datepicker'
import NetworkAPI from '../../helpers/NetworkAPI'

export default class CreateController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            stage: 0,
            date:"2016-05-15",
            height: 5,
            weight: 1,
            username_text: "username",
            password_text: "password",
            warning: ""
        }
    }

    render() {
        var contents;
        if(this.state.stage === 0) {
            contents = <Text>C1</Text>
        } else if(this.state.stage === 1) {
            contents = this.get_date_picker()
        } else if(this.state.stage === 2) {
            contents = this.get_weight_selector()
        } else if(this.state.stage === 3) {
            contents = this.get_height_selector()
        } else if(this.state.stage === 4) {
            contents = [<TextInput
                key="username"
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({username_text: text})}
                value={this.state.username_text}
            />,
            <TextInput
                key="password"
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password_text: text})}
                value={this.state.password_text}
            />,
            <Text key="warn">{this.state.warning}</Text>];
        }
        return (
            <View>
                <Text>CREATE</Text>
                <Text>CREATE</Text>
                <Button title="back" onPress={this.props.login}></Button>
                <Button title="next" onPress={this.next_stage}></Button>
                {contents}
            </View>
        )
    }

    next_stage = () => {
        var cur = this;
        this.setState({
            stage: this.state.stage+1
        })
        if(this.state.stage+1 >= 5) {
            NetworkAPI.create_account(this.state.username_text, this.state.password_text, this.state.date,
                this.state.weight, this.state.height, "").then(token => {
                    this.props.done(this.state.username_text, token)
                }).catch(error => {
                    cur.setState({
                        stage: 4,
                        warning: "Username taken"
                    })
                })
        }
    }

    get_weight_selector() {
        var options = []
        for(var i = 1; i < 400; i++) {
            options.push(i.toString())
        }
        return this.get_selector(options, "weight")
    }

    get_height_selector() {
        var options = []
        for(var i = 5; i < 108; i++) {
            options.push(i.toString())
        }
        return this.get_selector(options, "height")
    }

    get_selector(options, id) {
        var contents = [];
        for(var i = 0; i < options.length; i++) {
            contents.push(<Picker.Item label={options[i]} value={options[i]} key={options[i]}></Picker.Item>)
        }
        return <Picker
        selectedValue={this.state[id]}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => this.setState({[id]: itemValue})}>
        {contents}
      </Picker>
    }

    get_date_picker() {
        return <DatePicker
        style={{width: 200}}
        date={this.state.date}
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
        onDateChange={(date) => {this.setState({date: date})}}/>
    }
 
}