'use strict';
import request from 'supertest';
import app from '../app/server';
import finish from './finish';
import {User} from '../app/mongodb/schema';
import db from '../app/mongodb/db';
import async from 'async';

describe('sessions-spec', () => {

  beforeEach((done)=> {
    async.series([
      (cb) => db.connect('test',cb),
      (cb) => User.find().remove(cb)
    ],finish(done));
  });

  afterEach((done)=>{
    db.close(finish(done));
  });
  it('用户输入的ID与密码全都正确，并且不是第一次登录：', (done) => {
    new User({userId: 's03134054', password: '123456'}).save(function (err, data) {
      if (err) return done.fail(err);
      request(app)
        .post('/api/sessions')
        .send({userId: 's03134054', password: '123456'})
        .expect(201, {message: "SUCCESS", newUser: false}, finish(done))
    });
    // async.waterfall([
    //   (cb) => new User({userId: 's03134054', password: '123456'}).save((err, data) => cb(err,data)),
    //   (cb) => request(app).post('/api/sessions').send({userId: 's03134054', password: '123456'})
    //     .expect(201, {message: "SUCCESS", newUser: false}, cb)
    // ],finish(done));
  });

  it('用户输入的ID与密码全都正确，并且是第一次登录：', (done) => {
    async.waterfall([
      (cb) => request(app).post('/api/sessions').send({userId: 's03134059', password: '123456'})
        .expect(201, {message: "SUCCESS", newUser: true}, cb)
    ],finish(done));
  });
  describe('Bad Request', ()=> {
    it('用户未输入用户名：', (done) => {
      async.waterfall([
        (cb) => request(app).post('/api/sessions').send({userId: '', password: '123456'})
          .expect(400, "数据不能为空", cb)
      ],finish(done));
    });
    it('用户未输入密码：', (done) => {
      async.waterfall([
        (cb) => request(app).post('/api/sessions').send({userId: 's03134054', password: ''})
          .expect(400, "数据不能为空", cb)
      ],finish(done));
    });
    it('用户未输入用户名和密码：', (done) => {
      async.waterfall([
        (cb) => request(app).post('/api/sessions').send({})
          .expect(400, "数据不能为空", cb)
      ],finish(done));
    });
  });
  it('用户输入的用户名密码不匹配：', (done) => {
    async.waterfall([
      (cb) => request(app).post('/api/sessions').send({userId: 's03134054', password: '122456'})
        .expect(401, "用户名或密码有误，登录失败", cb)
    ],finish(done));
  });
});
