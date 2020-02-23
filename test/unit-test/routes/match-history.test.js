const supertest = require('supertest');
const express = require('express');
const assert = require('assert');
const sinon = require('sinon');
const bodyParser = require('body-parser');
const beforeEach = require('mocha').beforeEach;
const describe = require('mocha').describe;
const it = require('mocha').it;
const proxyquire = require('proxyquire');


describe('match history routes', async () => {
    let app, matchHistory, findByIdStub, request;
    const loggerMock = {
        logger: {
            info: () => {}
        }
    };
    beforeEach(async () => {
        findByIdStub = sinon.stub();
        app = express();
        app.use(bodyParser.json());
        matchHistory = proxyquire('../../../src/routes/match-history', {
            '../persistence/services/match-service': {
                findById: findByIdStub
            },
            '../../util/logger': loggerMock
        });
        matchHistory(app);
        request = supertest(app);
    });

    it('should return 200 and an empty object when body is empty', async () => {
        const response = await request.post('/match-history/urls').set('Accept', 'application/json');
        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, {});
    });

    it('should return 200 and the match history matching the id passed in the url', async () => {
        findByIdStub.resolves({'_id': '5e5209609d906a36208d131e', 'url': 'https://lol.gamepedia.com/LMS/2016_Season/Summer_Promotion/Match_History'});
        const response = await request.get('/match-history/5e5209609d906a36208d131e').set('Accept', 'application/json');
        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { '_id': '5e5209609d906a36208d131e', 'url': 'https://lol.gamepedia.com/LMS/2016_Season/Summer_Promotion/Match_History'});
    });
});
