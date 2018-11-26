import React from 'react'
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

        this.manager = new BleManager()
        this.state = {
            info: "",
            values: {}
        }
        this.prefixUUID = "f000aa"
        this.suffixUUID = "-0451-4000-b000-000000000000"
        this.deviceUUID = "025A7775-49AA-42BD-BBDB-E2AE77782966"
        this.sensors = {
            1: "Gyroscope"
        }
    }

    serviceUUID(num) {
        return this.prefixUUID + num + "0" + this.suffixUUID
    }

    notifyUUID(num) {
        return this.prefixUUID + num + "1" + this.suffixUUID
    }

    writeUUID(num) {
        return this.prefixUUID + num + "2" + this.suffixUUID
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

                if (device.deviceUUID === this.deviceUUID) {
                    this.setState({
                        ble_status: "Connecting To Device"
                    })
                    this.manager.stopDeviceScan()
                    device.connect()
                        .then((device) => {
                            return device.discoverAllServicesAndCharacteristics()
                        })
                        .then((device) => {
                            this.monitorSessionData(device)
                            this.setState({
                                ble_status: "Recording"
                            })
                        }).catch(err => {
                            this.setState({
                                ble_status: "Could Not Connect To Device"
                            })
                        })
                }
            });
    }

    monitorSessionData(device) {
        for (const id in this.sensors) {
            this.scanForSensorData(device, id);
        }
    }

    scanForSensorData(device, id) {
        const service = this.serviceUUID(id)
        const characteristicW = this.writeUUID(id)
        const characteristicN = this.notifyUUID(id)

        const characteristic = await device.writeCharacteristicWithResponseForService(
            service, characteristicW, "AQ==" /* 0x01 in hex */
        )

        device.monitorCharacteristicForService(service, characteristicN, (error, characteristic) => {
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
            if(this.recording) {
                this.scanForSensorData(device, id)
            }
        })
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
            this.manager.onStateChange((state) => {
                if (state === 'PoweredOn') this.scanAndConnect()
            })
        } else {
            this.scanAndConnect()
        }
    }

    stop_recording = () => {
        this.recording = false
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