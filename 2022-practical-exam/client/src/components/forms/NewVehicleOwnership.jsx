/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Input } from "../Input";
import { API_URL, sendRequest } from "../../utils/Api";
import { errorToast, successToast } from "../../utils/Toast";
import Select from "react-select";

const NewVehicleOwnership = ({ closeModal }) => {
  const [data, setData] = React.useState({});

  const [localSending, setlocalSending] = React.useState(false);
  const [owners, setOwners] = React.useState();
  const [vehicles, setVehicles] = React.useState();

  const [ownerId, setOwnerId] = React.useState();
  const [vehicleId, setVehicleId] = React.useState();

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const selectHandler = (payload) => {
    var name = payload.name;
    var value = payload.value;
    if (name == "vehicle") {
      setVehicleId(value);
    } else if (name == "owner") {
      setOwnerId(value);
    }
  };

  React.useEffect(() => {
    async function loadData() {
      let vehiclesResponse = await sendRequest(
        API_URL + "/vehicles/all",
        "GET"
      );
      let vehicles = vehiclesResponse?.data?.data;
      vehicles = vehicles.map((vehicle) => {
        return {
          value: vehicle._id,
          label: vehicle.chasisNumber + " - " + vehicle.modelName,
        };
      });
      setVehicles(vehicles);

      let ownersResponse = await sendRequest(API_URL + "/owners/all", "GET");
      let owners = ownersResponse?.data?.data;
      owners = owners.map((owner) => {
        return {
          value: owner._id,
          label:
            owner.nationalId + " - " + owner.firstname + " " + owner.lastname,
        };
      });
      setOwners(owners);
    }
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlocalSending(true);
    try {
      let response = await sendRequest(
        API_URL +
          `/vehicle-owners/assign/vehicle/${vehicleId}/owner/${ownerId}`,
        "POST",
        data
      );
      if (response?.data?.status == 201) {
        successToast("Successfully linked the owner to the vehicle");
        closeModal(false);
      } else {
        errorToast(
          response?.data?.message ||
            "Error occurred while linking the owner to the vehicle"
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
          {"Link Vehicle to Owner"}
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
                    <label>Vehicle</label>
                    <Select
                      options={vehicles}
                      name="vehicle"
                      onChange={(payload) =>
                        selectHandler({ ...payload, name: "vehicle" })
                      }
                      className="mt-3"
                      placeholder={
                        <div className="select-placeholder-text">
                          Select Vehicle
                        </div>
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Owner</label>
                    <Select
                      options={owners}
                      name="owner"
                      onChange={(payload) =>
                        selectHandler({ ...payload, name: "owner" })
                      }
                      className="mt-3"
                      placeholder={
                        <div className="select-placeholder-text">
                          Select Owner
                        </div>
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Plate number"
                      name="plateNumber"
                      onChange={inputHandler}
                      defaultInputValue={data.plateNumber || ""}
                    ></Input>
                  </div>
                </div>

                <button type="submit" className="save-btn">
                  {localSending ? "wait..." : "Link"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewVehicleOwnership;
