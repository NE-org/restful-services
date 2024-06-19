import {
  createSuccessResponse,
  serverErrorResponse,
  successResponse,
} from './../utils/api.response.js';
import EmployeeLaptopModel from '../models/employeeLaptop.model.js';

export const registerEmployeeLaptop = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      nationalId,
      phoneNumber,
      email,
      department,
      position,
      laptopManufacturer,
      model,
      serialNumber
    } = req.body;

    let added_by = req.user.id

    const employeeLaptop = await EmployeeLaptopModel.create({
      firstname,
      lastname,
      nationalId,
      phoneNumber,
      email,
      department,
      position,
      laptopManufacturer,
      model,
      serialNumber,
      added_by
    })

    return createSuccessResponse("Employee Laptop registered successfully ", employeeLaptop, res);

  } catch (error) {
    return serverErrorResponse(error, res);
  }
}

export const getEmployeeLaptops = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const options = {
      offset: (page - 1) * limit,
      limit: limit,
      order: [['createdAt', 'DESC']],
    };

    const { count, rows: employees } = await EmployeeLaptopModel.findAndCountAll(options);

    const totalPages = Math.ceil(count / limit);
    const returnObject = {
      data: employees,
      currentPage: page,
      totalPages: totalPages,
      totalData: count,
    };

    return successResponse("Employee Laptops", returnObject, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};
