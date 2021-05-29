const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequirementSchema = new Schema({

date : {
  type: String,
  required: true
} ,
required_pharmacy  : {
    type: String,
    required: true
  } ,
info : {
    type: String,
    required: true
} ,
patient : {
  type :  Schema.Types.ObjectId,
  ref : 'Patient'
}
});

module.exports = Requirement = mongoose.model("Requirement", RequirementSchema);