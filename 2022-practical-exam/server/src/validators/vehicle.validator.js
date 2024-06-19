import Joi from "joi";
import { errorResponse } from "../utils/api.response.js";

export async function validateVehicleRegistration(req, res, next) {
  try {
    const schema = Joi.object({
      chasisNumber: Joi.string().required().label("Chasis Number"),
      manufactureCompany: Joi.string().required().label("Manufacture Company"),
      manufactureYear: Joi.number().min(0).max(parseInt(new Date().getFullYear()+1)).required(),
      price: Joi.number().min(0).required(),
      modelName: Joi.string().required().label("Model Name")
    });

    const { error } = schema.validate(req.body);
    if (error) return errorResponse(error.message, res);

    return next();
  } catch (ex) {
    return errorResponse(ex.message, res);
  }
}
