import NotificationButtonController from './NotificationButtonController'
import { Icons } from 'react-native-fontawesome'

export default class RequestButtonController extends NotificationButtonController {

    constructor(props) {
        props.icon = Icons.handshakeO
        super(props);
    }

}