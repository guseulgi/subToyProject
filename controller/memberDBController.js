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
};

module.exports = memberDB;
