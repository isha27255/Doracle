const express = require("express");
const router = express.Router();

let Patient = require('../models/patient.model');
let Status = require('../models/status.model');
let Requirement = require('../models/requirement.model');
let  Report = require('../models/lab_report_f.model');
let Doc_Report = require('../models/lab_report_h.model');


//read data by id
router.get("/:id", (req, res) => {
  Patient.findById(req.params.id)
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json("Error is " + err));       
});

//update data by id
router.post("/update/:id", (req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            patient.firstname = req.body.firstname;
            patient.lastname = req.body.lastname;
            patient.email = req.body.email;
            patient.contact = req.body.contact;
            patient.patientID = req.body.patientID;
            patient.password = req.body.password;

            patient.save()
            .then(() => res.json("Updated successfully"))
            .catch(err => res.status(400).json("Error is " + err));       
        })
        .catch(err => res.status(400).json("Error is " + err));       
  
});

// status
router.get("/:id/status/:sid", (req, res) => {
    Status.findById(req.params.sid)
      .then(status => res.json(status))
      .catch(err => res.status(400).json("Error is " + err));       
  });


// pharmacy requirement
router.get("/:id/pharmacy/:pid", (req, res) => {
    Requirement.findById(req.params.pid)
      .then(pharma => res.json(pharma))
      .catch(err => res.status(400).json("Error is " + err));       
  });



// lab report by family
router.get("/:id/home-report/:hid", (req, res) => {
    Report.findById(req.params.hid)
      .then(report => res.json(report))
      .catch(err => res.status(400).json("Error is " + err));       
  });

router.post("/:id/home-report", (req, res) => {

  Patient.findById(req.params.id)
        .then(patient => {
            const date = Date.parse(req.body.date);
            const report_file = req.body.report_file;
            
            const new_report = new Report({date, report_file});
            // console.log(new_status);
            // console.log(patient);
            new_report.patient = patient._id;
            new_report.save()
                .then(() => res.json("Home Lab Report Added Successfully"))
                .catch(err => res.status(400).json("Error is " + err));
                // console.log(new_status._id);
            patient.reports.push(new_report._id);
            patient.save();     
        })
        .catch(err => res.status(400).json("Error is " + err));  
       
});

// lab reports by doc
router.get("/:id/doc-report/:did", (req, res) => {
    Doc_Report.findById(req.params.did)
      .then(report => res.json(report))
      .catch(err => res.status(400).json("Error is " + err));       
  });

module.exports = router;