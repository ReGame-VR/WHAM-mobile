import React from 'react'
import SessionQuestionairView from '../../../views/session/recording/SessionQuestionairView'
import NetworkAPI from '../../../helpers/NetworkAPI';

export default class SessionQuestionairController extends React.Component {

    constructor(props) {
        super(props)
        this.view  = new SessionQuestionairView(this.stop_questioning, this.set_item)
        this.state = {
            stage: 0
        }
    }


    set_item = (id, val) => {
        this.setState({
            [id]: val,
            stage: this.state.stage += 1
        })
    }

    stop_questioning = () => {
        this.props.session.set_engagement(this.state.engagement)
        this.props.session.set_motivation(this.state.motivation)
        this.props.session.set_effort(this.state.effort)
        NetworkAPI.send_session_details(this.props.session.to_json(), this.props.username, this.props.token).then(() => {
            this.props.stop_questioning()
            this.props.loader()
        })
    }

    render() {
        return this.view.render(this.state.stage)
    }

}