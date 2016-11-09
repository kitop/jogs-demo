import { isEmpty } from "lodash";

export default (params)  => {
  let errors = {}
  if(isEmpty(params.date)) {
    errors["date"] = "Please enter a valid date"
  } else if(!( params.date.match(/\d{4}-\d{2}-\d{2}/) || params.date.match(/\d{2}\/\d{2}\/\d{4}/) )) {
    errors["date"] = "Please enter a valid date (YYYY-MM-DD or DD/MM/YYYY)"
  }

  if(params.duration <= 0) {
    errors["duration"] = "Please enter a valid duration (bigger than 0)"
  }
  if(params.distance <= 0) {
    errors["distance"] = "Please enter a valid distance (bigger than 0)"
  }

  return errors;
}
