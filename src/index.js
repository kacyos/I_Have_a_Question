const express = require("express");
const connection = require("./database");
const Question = require("./database/models/Question");
const Answers = require("./database/models/Answers");

const app = express();

connection
  .authenticate()
  .then(() => {
    console.log("Successfully authenticated");
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  Question.findAll({ raw: true, order: [["createdAt", "DESC"]] }).then(
    (questions) => {
      res.render("index", { questions });
    }
  );
});

app.get("/question", (req, res) => {
  res.render("makeAsk");
});

app.get("/question/:id", (req, res) => {
  const { id } = req.params;

  Question.findOne({
    where: { id },
  }).then((question) => {
    if (!!question) {
      Answers.findAll({
        where: { questionId: id },
        order: [["id", "DESC"]],
      }).then((answers) => {
        res.render("question", {
          question,
          answers,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/save", (req, res) => {
  const { title, description } = req.body;
  Question.create({ title, description }).then(() => {
    res.redirect("/");
  });
});

app.post("/answer", (req, res) => {
  const { body, questionId } = req.body;
  Answers.create({
    body,
    questionId,
  })
    .then(() => {
      res.redirect(`/question/${questionId}`);
    })
    .catch((err) => console.log(err.message));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
