const dbConnect = require('../router/dbConnect');

const memberDB = {
  getUsers: (cb) => {
    const allSelectQuery = `SELECT * FROM boardDB.membershipDB;`;
    dbConnect.query(allSelectQuery, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  userCheck: (id, cb) => {
    const selectQuery = `SELECT * FROM boardDB.membershipDB WHERE ID_PK = '${id}';`;
    dbConnect.query(selectQuery, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  addUsers: (newUser, cb) => {
    console.log(newUser.phoneMiddleNumber, newUser.phoneLastNumber);
    const addUserQuery = `INSERT INTO boardDB.membershipDB (ID_PK, NICKNAME, NAME, EMAIL, PASSWORD, ADDRESS, BIRTH, PHONE_NUMBER) VALUES ('${
      newUser.id
    }', '${newUser.nickname}', '${newUser.name}', '${newUser.email}', '${
      newUser.password
    }', '${newUser.address}', '${newUser.birth}', '${
      '010-' +
      String(newUser.phoneMiddleNumber) +
      '-' +
      String(newUser.phoneLastNumber)
    }');`;
    dbConnect.query(addUserQuery, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
};

module.exports = memberDB;
