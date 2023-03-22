const express = require('express');
const userDB = require('../controller/memberDBController');

const router = express.Router();

// 회원 가입 페이지 보여주기
router.get('/', (req, res) => {
  res.render('membership.ejs');
});

// 회원 가입 요청 받기
router.post('/', (req, res) => {
  if (req.body) {
    userDB.userCheck(req.body.id, (data) => {
      if (data.length === 0) {
        userDB.addUsers(req.body, (data) => {
          console.log(data);
          if (data.affectedRows === 1) {
            res.status(200).redirect('/');
          }
        });
      } else {
        const err = new Error('동일한 아이디가 존재합니다.');
        err.statusCode = 400;
        throw err;
      }
    });
  } else {
    const err = new Error('입력값을 받지 못하였습니다.');
    err.statusCode = 400;
    throw err;
  }
});

module.exports = router;
