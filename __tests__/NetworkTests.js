import jest from 'jest';
import NetworkAPI from '../app/helpers/NetworkAPI';
import SessionModel from '../app/models/sessions/SessionModel'
import RequestModel from '../app/models/request/RequestModel'
const username1 = Math.random().toString();
var user_token;
var admin_token;

test('creating an account returns the new users token', (done) => {
    NetworkAPI.create_account(username1, "password", "1999-05-05", 150, 80, "").then(token => {
        expect(typeof token).toBe('string')
        done();
    })
});

test('user login works', (done) => {
    NetworkAPI.login(username1, "password").then(token => {
        expect(typeof token).toBe('string')
        user_token = token;
        done();
    })
});

test('admin login works', (done) => {
    NetworkAPI.login("admin", "password").then(token => {
        expect(typeof token).toBe('string')
        admin_token = token;
        done();
    })
});

test('get patient info', done => {
    NetworkAPI.load_patient_overview(username1, user_token).then(overview => {
        expect(overview.info.username).toBe(username1);
        expect(overview.sessions).toEqual([]);
        done();
    })
})

var session_to_send = new SessionModel(undefined, 5, 2, 10, [{
    score: 1,
    time: "1999-05-05"
}])

test('send a session to the server', done => {
    session_to_send.send_session(username1, user_token).then(res => {
        done();
    })
})

test('send a request to a patient', done => {
    const req = new RequestModel(username1);
    req.send_request("therapist1", admin_token).then(res => {
        done();
    })
})

test('get patient info after send session', done => {
    NetworkAPI.load_patient_overview(username1, user_token).then(overview => {
        expect(overview.sessions[0].scores.length).toBe(1);
        expect(overview.requests.length).toBe(1);
        done();
    })
})

test('accept a request to a patient', done => {
    const req = new RequestModel("therapist1");
    req.accept_request(username1, user_token).then(res => {
        done();
    })
})

test('get patient info after accepting request', done => {
    NetworkAPI.load_patient_overview(username1, user_token).then(overview => {
        expect(overview.requests.length).toBe(0);
        done();
    })
})


