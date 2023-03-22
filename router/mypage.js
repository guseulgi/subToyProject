const express = require('express');
const memberDB = require('../controller/memberDBController');

const router = express.Router();

const UNEXPECTED_MSG =
  '아이디 또는 비밀번호를 입력하여 주세요.<br/><br/> <a href="/">로그인 페이지로 이동</a>';
const LOGIN_IDFAIL_MSG =
  '해당 id가 존재하지 않습니다. <br/><br/> <a href="/register">회원가입 페이지로 이동</a>';
const LOGIN_PWFAIL_MSG =
  '비밀번호가 다릅니다. <br/><br/> <a href="/">로그인 페이지로 이동</a>';

router.post('/', (req, res) => {
  if (req.body.id !== '' && req.body.password !== '') {
    memberDB.userCheck(req.body.id, (data) => {
      if (data.length === 1) {
        if (data[0].PASSWORD === req.body.password) {
          req.session.login = true;
          req.session.userID = req.body.id;
          res.cookie('userInfo', req.body.id, {
            maxAge: 1000 * 30,
            httpOnly: true,
            signed: true,
          });

          res.status(200);
          res.render('mypage', {
            findUser: data[0],
          });
        } else {
          res.status(400).send(LOGIN_PWFAIL_MSG);
        }
      } else {
        res.status(400).send(LOGIN_IDFAIL_MSG);
      }
    });
  } else {
    res.send(UNEXPECTED_MSG);
  }
});

module.exports = router;
