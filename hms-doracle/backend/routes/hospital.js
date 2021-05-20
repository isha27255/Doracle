const express = require("express");
const router = express.Router();

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
  const patientID = req.body.patientID;
  const password= req.body.password;
  
  const new_patient = new Patient({firstname, lastname, patientID, password});
  console.log(new_patient);
  new_patient.save()
      .then(() => res.json("Patient Added Successfully"))
      .catch(err => res.status(400).json("Error is " + err));       
});

router.get("/:id", (req, res) => {
  Patient.findById(req.params.id)
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
          patient.patientID = req.body.patientID;
          patient.password = req.body.password;

          patient.save()
          .then(() => res.json("Updated successfully"))
          .catch(err => res.status(400).json("Error is " + err));       
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
            // console.log(new_status);
            // console.log(patient);
            new_status.patient = patient._id;
            new_status.save()
                .then(() => res.json("Statusss Added Successfully"))
                .catch(err => res.status(400).json("Error is " + err));
                // console.log(new_status._id);
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
            // console.log(new_status);
            // console.log(patient);
            new_pharma.patient = patient._id;
            new_pharma.save()
                .then(() => res.json("Requirement Added Successfully"))
                .catch(err => res.status(400).json("Error is " + err));
                // console.log(new_status._id);
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
            // console.log(new_status);
            // console.log(patient);
            new_report.patient = patient._id;
            new_report.save()
                .then(() => res.json("Doc Report Added Successfully"))
                .catch(err => res.status(400).json("Error is " + err));
                // console.log(new_status._id);
            patient.doc_reports.push(new_report._id);
            patient.save();     
        })
        .catch(err => res.status(400).json("Error is " + err));  
       
});




//mass data upload through excel sheet
  

module.exports = router;