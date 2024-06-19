import _ from "lodash";
import { Owner } from "../models/owner.model.js";
import { createSuccessResponse, errorResponse, serverErrorResponse, successResponse } from "../utils/api.response.js";

export const registerOwner = async (req, res) => {
  try {
    let checkPhone = await Owner.findOne({ phone: req.body.phone });
    if (checkPhone)
      return errorResponse("Phone number is already registered!", res);

    let checkNationalId = await Owner.findOne({
      nationalId: req.body.nationalId,
    });
    if (checkNationalId)
      return errorResponse("National ID is already registered!", res);

    let owner = new Owner(
      _.pick(req.body, [
        "firstname",
        "lastname",
        "nationalId",
        "address",
        "phone",
      ])
    );
    try {
      await owner.save();
      return createSuccessResponse("Owner registered successfully", owner, res);
    } catch (ex) {
      return errorResponse(ex.message, res);
    }
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const getOwners = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 5,
    };

    const { docs, totalPages, totalDocs } = await Owner.paginate({}, options);

    const returnObject = {
      data: docs,
      currentPage: options.page,
      totalPages: totalPages,
      totalData: totalDocs,
    };

    return successResponse("Owners", returnObject, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const getAllOwners = async (req, res) => {
  try {
    let owners = await Owner.find()

    return successResponse("Owners", owners, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};
