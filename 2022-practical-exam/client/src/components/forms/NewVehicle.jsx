/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Input } from "../../components/Input";
import { API_URL, sendRequest } from "../../utils/Api";
import { errorToast, successToast } from "../../utils/Toast";

const NewVehicle = ({ closeModal }) => {
  const [data, setData] = React.useState({});

  const [localSending, setlocalSending] = React.useState(false);

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlocalSending(true);
    try {
      let response = await sendRequest(
        API_URL + "/vehicles/register",
        "POST",
        data
      );
      if (response?.data?.status == 201) {
        successToast("Successfully registered the vehicle");
        closeModal(false);
      } else {
        errorToast(
          response?.data?.message || "Error occurred while registering"
        );
        closeModal();
      }
    } catch (error) {
      errorToast(error?.response?.data?.message || "An error occurred");
      closeModal();
    }
    setlocalSending(false);
  };

  return (
    <>
      <div className="form-holder">
        <div className="form-header text-white flex justify-center items-center relative">
          {"Register Vehicle"}
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
                      labelName="Chasis number"
                      name="chasisNumber"
                      onChange={inputHandler}
                      defaultInputValue={data.chasisNumber || ""}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Manufacture company"
                      name="manufactureCompany"
                      onChange={inputHandler}
                      defaultInputValue={data.manufactureCompany || ""}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="number"
                      labelName="Manufacture Year"
                      name="manufactureYear"
                      onChange={inputHandler}
                      defaultInputValue={data.manufactureYear || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="number"
                      labelName="Price"
                      name="price"
                      onChange={inputHandler}
                      defaultInputValue={data.price || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Model name"
                      name="modelName"
                      onChange={inputHandler}
                      defaultInputValue={data.modelName || ""}
                      required={true}
                    ></Input>
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

export default NewVehicle;
