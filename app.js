const express = require("express");
const mongoose = require('mongoose');
const app = express();

const mongodb =
	'mongodb+srv://byte210:hypomnemata1@cluster0.yfoz7.mongodb.net/?retryWrites=true&w=majority';

mongoose
	.connect(mongodb)
	.then(() => console.log('connected'))
	.catch((err) => console.log('an error occured ', err));

app.set("view engine", "ejs");

app.listen(3000);

app.get("/", (req, res) => {
  const items = [
    { name: "mobile phone", price: 1000 },
    { name: "book", price: 50 },
    { name: "computer", price: 2000 },
  ];

  res.render("index", { items });
});

app.get("/add-item", (req, res) => {
  res.render("add-item");
});

app.use((req, res) => {
  res.render("404");
});
