/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Input } from "../Input";
import { API_URL, sendRequest } from "../../utils/Api";
import { errorToast, successToast } from "../../utils/Toast";

const NewOwner = ({ closeModal }) => {
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
        API_URL + "/owners/register",
        "POST",
        data
      );
      if (response?.data?.status == 201) {
        successToast("Successfully registered the owner");
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
          {"Register Owner"}
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
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Lastname"
                      name="lastname"
                      onChange={inputHandler}
                      defaultInputValue={data.lastname || ""}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Phone"
                      name="phone"
                      onChange={inputHandler}
                      defaultInputValue={data.phone || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Address"
                      name="address"
                      onChange={inputHandler}
                      defaultInputValue={data.address || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="number"
                      labelName="National Id"
                      name="nationalId"
                      onChange={inputHandler}
                      defaultInputValue={data.nationalId || ""}
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

export default NewOwner;
