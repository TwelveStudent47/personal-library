const express = require('express');
const db = require("./db/connect");
const bookRoutes = require("./routes/bookRoutes");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", bookRoutes)

const start = async () => {
    try {
        db(process.env.MONGO_URI);
        console.log("Successfully connected to DB");
        app.listen(process.env.PORT, (req, res) => {
            console.log(`Server is listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();