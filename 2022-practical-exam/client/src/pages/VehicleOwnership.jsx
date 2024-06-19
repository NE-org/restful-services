import { useEffect, useState } from "react";
import { API_DATA_LIMIT, API_URL, sendRequest } from "../utils/Api";
import { formatDate, formatMoney, formatTime } from "../utils/Utilities";
import TableComponent from "../components/table/TableComponent";
import TablePagination from "../components/table/TablePagination";
import NewVehicleOwnership from "../components/forms/NewVehicleOwnership";
import ModalContainer from "../components/forms/ModalContainer";

export const VehicleOwnership = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [modalShown, setmodalShown] = useState({
    shown: false,
    component: null,
  });

  const closeModal = async (shouldNotFetch = true) => {
    setmodalShown({ shown: false, component: null });
    if (!shouldNotFetch) {
      setLoading(true);
      await fetchTableData(0);
      setLoading(false);
    }
  };

  const openModal = (component) => {
    if (!component) {
      return;
    }
    setmodalShown({ shown: true, component });
  };

  const changePage = async (newPage) => {
    if (newPage !== data.currentPage) {
      setLoading(true);
      await fetchTableData(newPage);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchTableData(0);
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchTableData = async (page) => {
    let response = await sendRequest(
      API_URL + `/vehicle-owners?page=${page}&limit=${API_DATA_LIMIT}`,
      "GET"
    );
    setData(response?.data?.data?.data);
    setCurrentPage(response?.data?.data?.currentPage);
    setPages(response?.data?.data?.totalPages);
    return response;
  };

  const transformData = (data) => {
    return data.map((item) => {
      return {
        names: item?.owner?.firstname + " " + item?.owner?.lastname,
        phone: item?.owner?.phone,
        nationalId: item?.owner?.nationalId,
        chasisNo: item?.vehicle?.chasisNumber,
        modelName: item?.vehicle?.modelName,
        year: item?.vehicle?.manufactureYear,
        price: formatMoney(item?.vehicle?.price),
        plateNo: item?.plateNumber,
        createdAt:
          formatDate(item?.createdAt) + " " + formatTime(item?.createdAt),
      };
    });
  };

  const tableHeaders = [
    "Names",
    "Phone",
    "National id",
    "Chasis No",
    "Model name",
    "Year",
    "Price",
    "Plate No",
    "Linked at",
  ];

  return (
    <>
      <h2>History of vehicle ownership</h2>
      <TableComponent
        headers={tableHeaders}
        data={transformData(data)}
        loading={loading}
      />
      <TablePagination
        pages={pages}
        active={currentPage}
        changePage={changePage}
        loading={loading}
      ></TablePagination>
      <div className="flex w-full justify-center">
        <div className="bg-white flex items-center justify-center w-full">
          <button
            className="button-link"
            onClick={() =>
              openModal(<NewVehicleOwnership closeModal={closeModal} />)
            }
          >
            Link Vehicle to Owner
          </button>
        </div>
      </div>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};
