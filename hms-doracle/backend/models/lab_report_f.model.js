const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
 
  report_file : {
    type: String,
    required: true
  },
  patient : {
    type :  Schema.Types.ObjectId,
    ref : 'Patient'
  }
}, {
    timestamps: true
});

module.exports = Report = mongoose.model("Report", ReportSchema);