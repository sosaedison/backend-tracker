const bcrypt = require("bcrypt");

var hashed = bcrypt.genSalt(10, (err, salt) => {
  bcrypt
    .hash("sosa", salt)
    .then((hash) => {
      console.log(hash);
    })
    .catch((err) => console.error(err));
});
