const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mainRouter = require('./router/main');
const membershipRouter = require('./router/membership');
const userRouter = require('./router/user');
const mypageRouter = require('./router/mypage');

const app = express();

const PORT = 4000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('1234'));
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

app.use('/', mainRouter);
app.use('/memberships', membershipRouter);
app.use('/users', userRouter);
app.use('/mypage', mypageRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.render(err.message);
});

// 서버 오픈
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 에서 구동 중 .........`);
});
