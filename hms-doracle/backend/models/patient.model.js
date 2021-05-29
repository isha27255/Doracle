const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({

  firstname : {
    type: String,
    trim: true,
    required: true
  }, 
  lastname : {
    type: String,
    trim: true,
    required: true
  }, 
  role: {
    type: Number,
    default: 0
  },
  email : {
      type: String,
      trim: true,
      required: true
  },
  contact: {
      type: Number,
      trim: true,
      required: true
  },
  patientID : {
    type: String,
    trim: true,
    // required: true
  }, 
  password : {
    type: String,
    trim: true,
    
    validate: [
        function (input) {
          return input.length >= 6;
        },
        'Password should be longer.',
      ],
  },
   reports: [
       {
        type: Schema.Types.ObjectId,
        ref: 'Report',

       },
   ],
   doc_reports: [
       {
        type: Schema.Types.ObjectId,
        ref: 'Doc_Report',
       }
   ], 
   requirement : [
       {
        type: Schema.Types.ObjectId,
        ref: 'Requirement',
       }
   ], 
   curr_status: [
       {
        type: Schema.Types.ObjectId,
        ref: 'Status',
        
       }
   ],
   stds:
   {
     type: Array,
     default: [],
   },
   rqtm:
   {
    type: Array,
    default: [],
   }
},
 {
    timestamps: true
  }
);

module.exports =  Patient = mongoose.model("Patient", PatientSchema);