require("dotenv").config();
const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.json({message : "Welcome to Address Book"});
});

app.listen(process.env.PORT, () => {
	console.log(`App listening at http://localhost:${process.env.PORT}`);
});
