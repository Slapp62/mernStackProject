import { handleError } from "../../utils/errorHandler.js";
import { joiValidator } from "../joiValidator.js";

const resolver = "joi";

export const validator = function(schema) {
  return function(req, res, next) {
    if (resolver === "joi") {
      req.validation = joiValidator(schema, req.body);
      
      if (req.validation.success === true) {
        next();
      } else {
        const joiErrorMessage = req.validation.error;
        handleError(res, 400, joiErrorMessage);
      }
    }
  }
};

