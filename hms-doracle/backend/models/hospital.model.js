const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
  patientId : {
    type: String,
    required: true
  }, 
  reports: [
    {
     type: Schema.Types.ObjectId,
     ref: Report,

    },
  ],
  doc_reports: [
    {
     type: Schema.Types.ObjectId,
     ref: Doc_Report,
    },
  ], 
  requirement : [
    {
     type: Schema.Types.ObjectId,
     ref: Requirement,
    },
  ], 
  curr_status: [
    {
     type: Schema.Types.ObjectId,
     ref: Status,
    },
  ]

} , 
{
    timestamps: true
});

module.exports = Hospital = mongoose.model("Hospital", HospitalSchema);