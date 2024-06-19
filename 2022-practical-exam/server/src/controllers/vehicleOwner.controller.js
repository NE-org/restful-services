import _ from "lodash";
import { Owner } from "../models/owner.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import { VehicleOwner } from "../models/vehicleOwner.model.js";
import {
  createSuccessResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
} from "../utils/api.response.js";

export const assignVehicleToOwner = async (req, res) => {
  try {
    let { ownerId, vehicleId } = req.params;

    let owner = await Owner.findById(ownerId);
    if (!owner) return notFoundResponse("id", ownerId, "Owner", res);

    let vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return notFoundResponse("id", vehicleId, "Vehicle", res);

    let checkPlateNumber = await VehicleOwner.findOne({
      plateNumber: req.body.plateNumber,
    });
    if (checkPlateNumber)
      return errorResponse(
        `Vehicle with plate Number ${req.body.plateNumber} is already registered!`,
        res
      );

    let vehicleOwner = new VehicleOwner(_.pick(req.body, ["plateNumber"]));
    vehicleOwner.owner = ownerId;
    vehicleOwner.vehicle = vehicleId;

    try {
      await vehicleOwner.save();
      return createSuccessResponse(
        "Vehicle Owner assigned successfully",
        vehicle,
        res
      );
    } catch (ex) {
      return errorResponse(ex.message, res);
    }
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const getVehicleOwners = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 5,
    };

    const { docs, totalPages, totalDocs } = await VehicleOwner.paginate(
      {},
      options
    );
    await VehicleOwner.populate(docs, { path: "owner" });

    await VehicleOwner.populate(docs, { path: "vehicle" });

    const returnObject = {
      data: docs,
      currentPage: options.page,
      totalPages: totalPages,
      totalData: totalDocs,
    };

    return successResponse("Vehicle-Owners", returnObject, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};
