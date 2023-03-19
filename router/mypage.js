const express = require('express');
const memberDB = require('../controller/memberDBController');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);

  if (req.body) {
    memberDB.userCheck(req.body.id, (data) => {
      console.log(data);

      if (data.length === 1) {
        if (data[0].PASSWORD === req.body.password) {
          req.session.login = true;
          req.session.userID = req.body.id;
          res.status(200);
          res.render('mypage', {
            findUser: data[0],
          });
        } else {
          res
            .status(400)
            .send(
              '비밀번호가 다릅니다. <br/><br/> <a href="/main">로그인 페이지로 이동</a>'
            );
        }
      } else {
        res
          .status(400)
          .send(
            '해당 id가 존재하지 않습니다. <br/><br/> <a href="/register">회원가입 페이지로 이동</a>'
          );
      }
    });
  } else {
    res.send('회원 없음');
  }
});

module.exports = router;
