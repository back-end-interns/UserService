const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models");


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use("/user", require("./routers/user-router"));

//used to create models or refer to the models
db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Listening to PORT ${PORT}`);
    });
});