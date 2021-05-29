const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema({

  date : {
      type: String,
      required: true
  }, 
  note : {
      type: String,
      required: true
  },
  patient : {
    type :  Schema.Types.ObjectId,
    ref : 'Patient'
  }
});

module.exports = Status = mongoose.model("Status", StatusSchema);