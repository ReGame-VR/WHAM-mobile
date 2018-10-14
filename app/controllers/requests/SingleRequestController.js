import React from 'react'
import { Text, View, Button } from 'react-native'
import NetworkAPI from '../../helpers/NetworkAPI'
import SingleRequestView from '../../views/request/SingleRequestView'

export default class SingleRequestController extends React.Component {

    constructor(props) {
        super(props)
        this.view = new SingleRequestView(this.props.therapistID, this.accept_request)
    }

    render() {
        return this.view.render()
    }

    accept_request = () => {
        return NetworkAPI.accept_request(this.props.therapistID, this.props.username, this.props.token).then(() => {
            this.props.remove_request(this.props.therapistID)
            return
        })
    }
 
}