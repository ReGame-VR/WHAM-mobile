import jest from 'jest';
import NetworkAPI from '../app/helpers/NetworkAPI';
import SessionModel from '../app/models/sessions/SessionModel'
import RequestModel from '../app/models/request/RequestModel'
import MessageModel from '../app/models/messages/MessageModel'
import ReplyModel from '../app/models/messages/ReplyModel'
const username1 = Math.random().toString();
var user_token;
var admin_token;
var therapist_token;

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

test('therapist login works', (done) => {
    NetworkAPI.login("therapist1", "password").then(token => {
        expect(typeof token).toBe('string')
        therapist_token = token;
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

var messageOne;

test('therapist send patient message', done => {
    const message = new MessageModel(undefined, "therapist1", "This is a cool message", undefined, undefined, undefined);
    message.send_message(username1, therapist_token).then(res => {
        messageOne = res.messageID;
        done();
    })
})

test('patient reply to message', done => {
    const reply = new ReplyModel(messageOne, undefined, "REPLYING!!", new Date())
    reply.send_reply(username1, username1, user_token).then(res => {
        done();
    })
}) 


test('get patient info after accepting request and send message', done => {
    NetworkAPI.load_patient_overview(username1, user_token).then(overview => {
        expect(overview.requests.length).toBe(0);
        expect(overview.messages.length).toBe(1);
        done();
    })
})

test('get all messages for a patient', done => {
    NetworkAPI.get_all_patient_messages(username1, user_token).then(messages => {
        expect(messages.messages.length).toBe(1);
        expect(messages.messages[0].contents).toBe("This is a cool message")
        done();
    })
})

test('get a specific patient message', done => {
    NetworkAPI.get_specific_patient_message(username1, messageOne, user_token).then(message => {
        expect(message.contents).toBe("This is a cool message")
        expect(message.replies.length).toBe(1);
        expect(message.replies[0].reply_content).toBe('REPLYING!!')
        done();
    })
})
