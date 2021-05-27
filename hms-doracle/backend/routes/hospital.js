const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

let Patient = require('../models/patient.model');
let Status = require('../models/status.model');
let Requirement = require('../models/requirement.model');
let  Report = require('../models/lab_report_f.model');
let Doc_Report = require('../models/lab_report_h.model');

router.get("/", (req, res) => {
  Patient.find()
      .then(patient => res.json(patient))
      .catch(err => res.status(400).json("Error is " + err));
});

router.post("/add", (req, res) => {
  
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const contact = req.body.contact;
  const email = req.body.email;
  
  let healthid="IND";
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for ( let i = 0; i < 6; i++ ) {
    healthid+=characters.charAt(Math.floor(Math.random() * charactersLength));
   }
  const patientID = healthid;
 
  let autocode = "";
  for ( let i = 0; i < 10; i++ ) {
    autocode+=characters.charAt(Math.floor(Math.random() * charactersLength));
   }

  const password=autocode;
   console.log(password);
  
  const new_patient = new Patient({firstname, lastname, email, contact, patientID, password});
 
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(new_patient.password, salt, (err, hash) => {
      if (err) throw err;
      new_patient.password = hash;
      new_patient
        .save()
        .then(() => res.json("patient added succesfully"))
        .catch(err => res.status(400).json("Error is " + err));
    });
  });
     
});

router.get("/:id", (req, res) => {
  Patient.findById(req.params.id)
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json("Error is " + err));       
});

router.get("/show/:patientid", (req, res) => {
  Patient.findOne({patientID: req.params.patientid})
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json("Error is " + err));       
});

router.delete("/delete/:id", (req, res) => {
  Patient.findByIdAndDelete(req.params.id)
    .then(() => res.json("Patient deleted successfully"))
    .catch(err => res.status(400).json("Error is " + err));       
});

router.post("/update/:id", (req, res) => {
  Patient.findById(req.params.id)
      .then(patient => {
          patient.firstname = req.body.firstname;
          patient.lastname = req.body.lastname;
          patient.email = req.body.email;
          patient.contact = req.body.contact;

          patient.save()
          .then(() => res.json("Updated successfully"))
          .catch(err => res.status(400).json("Error is " + err));       
      })
      .catch(err => res.status(400).json("Error is " + err));       

});

router.post("/updatePassword/:id", (req, res) => {
  
  Patient.findById(req.params.id)
      .then(patient => {
          patient.password=req.body.password;
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(patient.password, salt, (err, hash) => {
              if (err) throw err;
              patient.password = hash;
            
              patient.save()
              .then(() => res.json("password Updated successfully"))
              .catch(err => res.status(400).json("Error is " + err));  
            });
          });
         
      })
      .catch(err => res.status(400).json("Error is " + err));       

});

router.get("/:id/status/:sid", (req, res) => {
  Status.findById(req.params.sid)
    .then(status => res.json(status))
    .catch(err => res.status(400).json("Error is " + err));       
});

router.post("/:id/status", (req, res) => {

  Patient.findById(req.params.id)
        .then(patient => {
            const date = Date.parse(req.body.date);
            const note = req.body.note;

            const new_status = new Status({date,note});
            new_status.patient = patient._id;
            new_status.save()
                .then(() => res.json("Statusss Added Successfully"))
                .catch(err => res.status(400).json("Error is " + err));
            patient.curr_status.push(new_status._id);
            patient.save();     
        })
        .catch(err => res.status(400).json("Error is " + err));  
       
});

router.get("/:id/pharmacy/:pid", (req, res) => {
  Requirement.findById(req.params.pid)
    .then(pharma => res.json(pharma))
    .catch(err => res.status(400).json("Error is " + err));       
});

router.post("/:id/pharmacy", (req, res) => {

  Patient.findById(req.params.id)
        .then(patient => {
            const date = Date.parse(req.body.date);
            const required_pharmacy = req.body.required_pharmacy;
            const info = req.body.info;
            
            const new_pharma = new Requirement({date, required_pharmacy, info});
            new_pharma.patient = patient._id;
            new_pharma.save()
                .then(() => res.json("Requirement Added Successfully"))
                .catch(err => res.status(400).json("Error is " + err));
            patient.requirement.push(new_pharma._id);
            patient.save();     
        })
        .catch(err => res.status(400).json("Error is " + err));  
       
});

router.get("/:id/home-report/:hid", (req, res) => {
  Report.findById(req.params.hid)
    .then(report => res.json(report))
    .catch(err => res.status(400).json("Error is " + err));       
});

router.get("/:id/doc-report/:did", (req, res) => {
  Doc_Report.findById(req.params.did)
    .then(report => res.json(report))
    .catch(err => res.status(400).json("Error is " + err));       
});

router.post("/:id/doc-report", (req, res) => {

  Patient.findById(req.params.id)
        .then(patient => {
            const date = Date.parse(req.body.date);
            const doc_report_file = req.body.doc_report_file;
            
            const new_report = new Doc_Report({date, doc_report_file});
            new_report.patient = patient._id;
            new_report.save()
                .then(() => res.json("Doc Report Added Successfully"))
                .catch(err => res.status(400).json("Error is " + err));
            patient.doc_reports.push(new_report._id);
            patient.save();     
        })
        .catch(err => res.status(400).json("Error is " + err));  
       
});




//mass data upload through excel sheet
  

module.exports = router