const db = require("../models/index.js");
const sequelize = db.sequelize;

module.exports = (async () => {
  await sequelize
    .sync({ focus: false })
    .then(() => {
      console.log("DB Connection Success");
    })
    .catch((err) => {
      console.error(err);
    });
})();
