import Joi from "joi";
import { errorResponse } from "../utils/api.response.js";

export async function validateEmployeeLaptopRegistration(req, res, next) {
  try {
    const schema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      nationalId: Joi.number().min(16).required(),
      phoneNumber: Joi.string().min(10).required(),
      email: Joi.string().email().required(),
      department: Joi.string().required(),
      position: Joi.string().required(),
      laptopManufacturer: Joi.string().required(),
      model: Joi.string().required(),
      serialNumber: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return errorResponse(error.message, res);

    return next();
  } catch (ex) {
    return errorResponse(ex.message, res);
  }
}
