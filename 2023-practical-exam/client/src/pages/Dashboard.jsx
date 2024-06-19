import { useEffect, useState } from "react";
import { API_DATA_LIMIT, API_URL, sendRequest } from "../utils/Api";
import { formatDate, formatTime } from "../utils/Utilities";
import TableComponent from "../components/table/TableComponent";
import TablePagination from "../components/table/TablePagination";
import ModalContainer from "../components/forms/ModalContainer";
import NewEmployeeLaptop from "../components/forms/NewEmployeeLaptop";

export const Dashboard = () => {
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
      API_URL + `/employee-laptops?page=${page}&limit=${API_DATA_LIMIT}`,
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
        firstname: item?.firstname,
        lastname: item?.lastname,
        phone: item?.phoneNumber,
        nationalId: item?.nationalId,
        email: item?.email,
        department: item?.department,
        position: item?.position,
        laptopManufacturer: item?.laptopManufacturer,
        model: item?.model,
        serialNumber: item?.serialNumber,
        createdAt:
          formatDate(item?.createdAt) + " " + formatTime(item?.createdAt),
      };
    });
  };

  const tableHeaders = [
    "Firstname",
    "Lastname",
    "Phone",
    "National id",
    "Email",
    "Department",
    "Position",
    "Laptop manufacturer",
    "Model",
    "Serial number",
    "Created at",
  ];

  return (
    <>
      <h2>Employee Laptops</h2>
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
            onClick={() => openModal(<NewEmployeeLaptop closeModal={closeModal} />)}
          >
            New Employee Laptop
          </button>
        </div>
      </div>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};
