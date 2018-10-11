import React from 'react'
import SettingsView from '../../views/account/SettingsView'

export default class SettingsController extends React.Component {

    constructor(props) {
        super(props)
        this.view = new SettingsView(this.props.back)
    }

    render() {
        return this.view.render()
    }
 
}