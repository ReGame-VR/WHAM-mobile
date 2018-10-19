import React from 'react'
import SessionQuestionairView from '../../../views/session/recording/SessionQuestionairView'

export default class SessionQuestionairController extends React.Component {

    constructor(props) {
        super(props)
        this.view  = new SessionQuestionairView(this.stop_questioning, this.advance_stage, this.set_item)
        this.state = {
            stage: 0
        }
    }

    advance_stage = () => {
        this.setState({
            stage: this.state.stage += 1
        })
    }

    set_item = (id, val) => {
        this.setState({
            [id]: val
        })
    }

    stop_questioning = () => {
        // Also should send the session details
        this.props.stop_questioning()
    }

    render() {
        return this.view.render(this.state.stage)
    }

}