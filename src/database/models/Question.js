const Sequelize = require("sequelize");
const connection = require("../");

const Question = connection.define(
  "questions",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {}
);

Question.sync({ force: false })
  .then(() => {
    console.log("Tabela question criada com sucesso");
  })
  .catch((err) => {
    console.log(`Falha ao criar tabela question. \n ${err.message}`);
  });

module.exports = Question;
