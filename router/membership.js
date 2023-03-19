const express = require('express');

const router = express.Router();

// 회원 가입 페이지 보여주기
router.get('/', (req, res) => {
  res.render('membership.ejs');
});

// 회원 가입 요청 받기
router.post('/add', (req, res) => {
  res.send('회원 가입 완료');
});

module.exports = router;
