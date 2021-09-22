require("dotenv").config();
require("./config/connection");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json")
const logger = require("logger").createLogger("logger/development.log");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.json({message : "Welcome to Address Book"});
});

require("./app/routes/routes")(app);

const server = app.listen(process.env.PORT, () => {
	logger.info(`Server is listening on port ${process.env.PORT}`);
	console.log(`App listening at http://localhost:${process.env.PORT}`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = server