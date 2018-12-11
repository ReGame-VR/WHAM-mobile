import React from 'react'
import { Platform } from 'react-native'
import SessionRecorderView from '../../../views/session/recording/SessionRecorderView'
import SessionModel from '../../../models/sessions/SessionModel'
import {
    BleManager
} from 'react-native-ble-plx'

export default class SessionRecorderController extends React.Component {

    constructor(props) {
        super(props)
        this.view = new SessionRecorderView(this.start_recording, this.stop_recording, this.stop_questioning, this.props.username, this.props.token, this.props.loader);
        this.state = {
            recording: false,
            questioning: false,
            ble_status: ""
        }
        this.recording = false
        this.manager = new BleManager()

        this.state = {
            info: "",
            values: {}
        }
        this.prefixUUID;
        this.sensors = [];
        this.subscriptions = [];
        this.device;
    }

    scanAndConnect() {
        this.manager.startDeviceScan(null,
            null, (error, device) => {
                this.setState({
                    ble_status: "Searching For Device"
                })
                if (error) {
                    this.setState({
                        ble_status: "Could Not Connect"
                    })
                    return
                }
                if (device.name === "WHAM") {
                    this.deviceUUID = device.id;
                    this.setState({
                        ble_status: "Connecting To Device"
                    })
                    this.manager.stopDeviceScan()
                    device.dis
                    device.connect()
                        .then((device) => {
                            return device.discoverAllServicesAndCharacteristics()
                        })
                        .then((device) => {
                            this.setState({
                                ble_status: "Scanning Sensors"
                            })
                            this.getAllSensors(device)
                        }).catch(err => {
                            this.setState({
                                ble_status: "Could Not Connect To Device"
                            })
                        })
                }
            });
    }

    getAllSensors(device) {
        this.device = device;
        device.services().then(services => {
            this.readServices(device, services, 0)
        })
    }

    readServices(device, services, i) {
        return this.getChar(services, i).then(() => {
            if(i < services.length-1) {
                i++;
                this.readServices(device, services, i)
            } else {
                this.setState({
                    ble_status: "Recording"
                })
                this.monitorSessionData(device)
            }
        })
    }

    getChar(services, serviceID) {
        return services[serviceID].characteristics().then(chars => {
            for(var c = 0; c < chars.length; c++) {
                if(chars[c].isNotifiable) {
                    this.sensors.push(chars[c])
                }
            }
            return;
        })
    }

    monitorSessionData(device) {
        for (var id = 0; id < this.sensors.length; id++) {
            this.scanForSensorData(device, this.sensors[id]);
        }
    }

    scanForSensorData(device, char) {
        console.log(char)
        var sub = char.monitor((error, characteristic) => {
            console.log(error, characteristic)
            if (error) {
                this.setState({
                    ble_status: "Error Recording"
                })
                return
            }
            var state_session = this.state.session
            state_session.add_score(characteristic.value, new Date())
            this.setState({
                session: state_session
            })
        })
        console.log(sub);
        this.subscriptions.push(sub) 
    }

    render() {
        return this.view.render(this.state.recording, this.state.session, this.state.questioning, this.state.ble_status);
    }

    start_recording = () => {
        this.recording = true
        this.setState({
            recording: true,
            session: new SessionModel()
        })
        if (Platform.OS === 'ios') {
            this.manager.state().then(state => {
                if(state === 'PoweredOn') {
                    this.scanAndConnect()
                } else {
                    this.manager.onStateChange((state) => {
                        if (state === 'PoweredOn') this.scanAndConnect()
                    })
                }
            })
        } else {
            this.scanAndConnect()
        }
    }

    stop_recording = () => {
        this.device.cancelConnection();
        this.recording = false
        for(var i = 0; i < this.subscriptions.length; i++) {
            this.subscriptions[i].remove()
        }
        this.deviceUUID = undefined;
        this.state = {
            info: "",
            values: {}
        }
        this.prefixUUID = undefined;
        this.sensors = [];
        this.subscriptions = [];
        this.device = undefined;
        this.setState({
            recording: false,
            questioning: true
        })
    }

    stop_questioning = () => {
        this.setState({
            questioning: false
        })
    }

}