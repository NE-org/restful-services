import Joi from "joi";
import { errorResponse } from "../utils/api.response.js";

export async function validateOwnerRegistration(req, res, next) {
  try {
    const schema = Joi.object({
      firstname: Joi.string().required().label("firstname"),
      lastname: Joi.string().required().label("lastname"),
      phone: Joi.string().required().max(10).min(10).label("Phone number"),
      nationalId: Joi.string().required().max(16).min(16).label("National ID"),
      address: Joi.string().required().label("Address")
    });

    const { error } = schema.validate(req.body);
    if (error) return errorResponse(error.message, res);

    return next();
  } catch (ex) {
    return errorResponse(ex.message, res);
  }
}
