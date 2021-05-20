const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Doracle', {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo DB database established successfully");
})

const port = process.env.PORT || 4000;


const PatientRouter = require('./routes/patient');
const HospitalRouter = require('./routes/hospital');



app.use('/patient', PatientRouter);
app.use('/hospital', HospitalRouter);


app.listen(port, () => {
    console.log(`Server running on port port ${port}`);
});