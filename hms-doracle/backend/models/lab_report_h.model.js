const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocReportSchema = new Schema({
  doc_report_file : {
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

module.exports = Doc_Report = mongoose.model("Doc_Report", DocReportSchema);