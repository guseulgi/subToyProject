const express = require('express');
const userDB = require('../controller/memberDBController');

const router = express.Router();

// 회원 목록 확인
router.post('/', (req, res) => {
  userDB.getUsers((data) => {
    if (data.length > 0) {
      res.render('users', {
        USER_DATA: data,
      });
    } else {
      res.send('회원 없음');
    }
  });
});

// 회원 추가
router.post('/add', (req, res) => {
  if (!req.query) return res.send('쿼리문 오류');

  const newUser = {
    name: req.query.name,
    gender: req.query.gender,
  };

  USER_DATA[Object.keys(USER_DATA).length + 1] = newUser;

  res.send('회원 추가 완료');
});

// 회원 수정
router.put('/modify/:id/:name/:gender', (req, res) => {
  if (!req.params.id || !req.params.name || !req.params.gender)
    return res.send('쿼리문 오류');

  if (req.params.id in USER_DATA) {
    USER_DATA[req.params.id] = {
      name: req.params.name,
      gender: req.params.gender,
    };

    res.send('회원 수정 완료');
  }
});

// 회원 삭제
router.delete('/delete/:id', (req, res) => {
  if (!req.params.id) return res.send('쿼리문 오류');

  if (req.params.id in USER_DATA) {
    delete USER_DATA[req.params.id];
    res.send('회원 삭제 완료');
  }
});

module.exports = router;
