const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

//const MONGO_URL="mongodb://localhost:27017/Doracle"
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo DB database established successfully");
})

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 4000;

const PatientRouter = require('./routes/patient');
const HospitalRouter = require('./routes/hospital');

app.use('/patient', PatientRouter);
app.use('/hospital', HospitalRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});