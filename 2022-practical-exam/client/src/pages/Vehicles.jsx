import { useEffect, useState } from "react";
import { formatDate, formatMoney, formatTime } from "../utils/Utilities";
import { API_URL, API_DATA_LIMIT, sendRequest } from "../utils/Api";
import TablePagination from "../components/table/TablePagination";
import TableComponent from "../components/table/TableComponent";
import NewVehicle from "../components/forms/NewVehicle";
import ModalContainer from "../components/forms/ModalContainer";

export const Vehicles = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [modalShown, setmodalShown] = useState({shown: false, component: null});

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
      API_URL + `/vehicles?page=${page}&limit=${API_DATA_LIMIT}`,
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
        chasisNumber: item?.chasisNumber,
        manufactureCompany: item?.manufactureCompany,
        manufactureYear: item?.manufactureYear,
        price: formatMoney(item?.price),
        modelName: item?.modelName,
        createdAt:
          formatDate(item?.createdAt) + " " + formatTime(item?.createdAt),
      };
    });
  };

  const tableHeaders = [
    "Chasis number",
    "Manufacture company",
    "Manufacture year",
    "Price",
    "Model name",
    "Created at",
  ];

  return (
    <>
      <h2>List of Vehicles</h2>
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
              openModal(
                <NewVehicle 
                  closeModal={closeModal}
                />
              )
            }
          >
            Register Vehicle
          </button>
        </div>
      </div>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};
