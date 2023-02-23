const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "126433", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
