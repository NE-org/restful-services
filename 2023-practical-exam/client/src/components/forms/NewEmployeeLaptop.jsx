/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Input } from "../Input";
import { API_URL, sendRequest } from "../../utils/Api";
import { errorToast, successToast } from "../../utils/Toast";
import * as Yup from "yup";

const NewEmployeeLaptop = ({ closeModal }) => {
  const [data, setData] = React.useState({});

  const [localSending, setlocalSending] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState({});

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    phoneNumber: Yup.string()
      .required("Phone is required")
      .min(10, "Phone must be 10 numbers"),
    nationalId: Yup.number()
      .required("National ID is required")
      .min(16, "National ID must be 16 numbers"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    department: Yup.string().required("Department is required"),
    position: Yup.string().required("Position is required"),
    laptopManufacturer: Yup.string().required(
      "Laptop manufacturer is required"
    ),
    model: Yup.string().required("Model is required"),
    serialNumber: Yup.string().required("Serial number is required"),
  });

  const inputHandler = async (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlocalSending(true);
    try {
      await validationSchema.validate(data, { abortEarly: false });

      let response = await sendRequest(
        API_URL + "/employee-laptops/register",
        "POST",
        data
      );
      if (response?.data?.status == 201) {
        successToast("Successfully registered the employee laptop");
        closeModal(false);
      } else {
        errorToast(
          response?.data?.message ||
            "Error occurred while registering the employee laptop"
        );
        closeModal();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};

        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });

        setValidationErrors(errors);
      } else {
        errorToast(error?.response?.data?.message || "An error occurred");
        closeModal();
      }
    }
    setlocalSending(false);
  };

  return (
    <>
      <div className="form-holder">
        <div className="form-header text-white flex justify-center items-center relative">
          {"Register Employee Laptop"}
          <FaTimes
            className="text-white absolute right-4 cursor-pointer"
            onClick={closeModal}
          ></FaTimes>
        </div>
        <div className="form-content bg-white p-4">
          <form className="form" onSubmit={handleSubmit}>
            <div className="w-full ">
              <div className="flex flex-col items-center  justify-center">
                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Firstname"
                      name="firstname"
                      onChange={inputHandler}
                      defaultInputValue={data.firstname || ""}
                    ></Input>
                    {validationErrors.firstname && (
                      <span className="error-message">
                        {validationErrors.firstname}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Lastname"
                      name="lastname"
                      onChange={inputHandler}
                      defaultInputValue={data.lastname || ""}
                    ></Input>
                    {validationErrors.lastname && (
                      <span className="error-message">
                        {validationErrors.lastname}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Phone"
                      name="phoneNumber"
                      onChange={inputHandler}
                      defaultInputValue={data.phoneNumber || ""}
                    ></Input>
                    {validationErrors.phoneNumber && (
                      <span className="error-message">
                        {validationErrors.phoneNumber}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <Input
                      type="number"
                      labelName="National Id"
                      name="nationalId"
                      onChange={inputHandler}
                      defaultInputValue={data.nationalId || ""}
                    ></Input>
                    {validationErrors.nationalId && (
                      <span className="error-message">
                        {validationErrors.nationalId}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Email"
                      name="email"
                      onChange={inputHandler}
                      defaultInputValue={data.email || ""}
                    ></Input>
                    {validationErrors.email && (
                      <span className="error-message">
                        {validationErrors.email}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Department"
                      name="department"
                      onChange={inputHandler}
                      defaultInputValue={data.department || ""}
                    ></Input>
                    {validationErrors.department && (
                      <span className="error-message">
                        {validationErrors.department}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Position"
                      name="position"
                      onChange={inputHandler}
                      defaultInputValue={data.position || ""}
                    ></Input>
                    {validationErrors.position && (
                      <span className="error-message">
                        {validationErrors.position}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Laptop manufacturer"
                      name="laptopManufacturer"
                      onChange={inputHandler}
                      defaultInputValue={data.laptopManufacturer || ""}
                    ></Input>
                    {validationErrors.laptopManufacturer && (
                      <span className="error-message">
                        {validationErrors.laptopManufacturer}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Model"
                      name="model"
                      onChange={inputHandler}
                      defaultInputValue={data.model || ""}
                    ></Input>
                    {validationErrors.model && (
                      <span className="error-message">
                        {validationErrors.model}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Serial number"
                      name="serialNumber"
                      onChange={inputHandler}
                      defaultInputValue={data.serialNumber || ""}
                    ></Input>
                    {validationErrors.serialNumber && (
                      <span className="error-message">
                        {validationErrors.serialNumber}
                      </span>
                    )}
                  </div>
                </div>

                <button type="submit" className="save-btn">
                  {localSending ? "wait..." : "Register"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewEmployeeLaptop;
