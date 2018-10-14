import React from 'react'
import SingleMessageOverviewView from '../../views/message/SingleMessageOverviewView'

/**
 * Gives an overview for a single message, and a button to show more detail
 */
export default class SingleMessageOverviewController extends React.Component {

    constructor(props) {
        super(props)
        this.view = new SingleMessageOverviewView(this.show_message_contents)
    }

    render() {
        return this.view.render(this.props.message)
    }

    show_message_contents = () => {
        this.props.action()
    }


}