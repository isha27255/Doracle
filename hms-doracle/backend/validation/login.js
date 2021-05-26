const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.patientID = !isEmpty(data.patientID) ? data.patientID : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.patientID)) {
    errors.patientID = "Patient ID field is required";
  }
 

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
