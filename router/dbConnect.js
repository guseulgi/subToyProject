const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  post: '3306',
  database: 'boardDB',
});
console.log('sql 읽어오기 완료');
connection.connect();

module.exports = connection;
