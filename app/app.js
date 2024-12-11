const express = require("express");
const app = express();
const port = 3000;
const waitOn = require('wait-on');

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "main",
});

const opts = {
  resources: [
    'db:3306',
  ],
};

app.use(express.json());

waitOn(opts, function (err) {
  if (err) {
    return handleError(err);
  }

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
});

app.get("/", (req, res) => {
  let data = "Full Cycle Rocks!</h1>\n<br>";

  connection.query("SELECT * FROM pessoa", (err, rows, fields) => {
    if (err) throw err;

    data += "<ol>\n";

    rows.forEach((row) => (data += `<li>${row.nome}</li>\n<br>`));

    data += "</ol>";
    res.send(data);
  });
});

app.post("/", (req, res) => {
  const { nome } = req.body

  if (!nome) res.status(400).send("Must insert a name")
  query = `INSERT INTO pessoa (nome) values (?)`;

  connection.query(query, [nome], (err) => {
    if (err) throw err;
  });
  res.status(201).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



