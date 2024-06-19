import React from "react";
import PropTypes from "prop-types";

const TableComponent = ({ headers, data, loading }) => {
  return (
    <div
      style={{ overflowX: "auto", minHeight: "20rem" }}
      className="table-container"
    >
      <table className="table mt-8">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!loading &&
            data.map((item, index) => (
              <React.Fragment key={index}>
                <tr className="space"></tr>
                <tr key={index}>
                  {Object.values(item).map((value, index) => (
                    <td key={index} className="text-center">
                      {value}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
      {(loading || data.length === 0) && (
        <p
          className="mt-6 text-base"
          style={{
            color: "#868585",
          }}
        >
          {loading ? "Loading..." : "No results Found"}
        </p>
      )}
    </div>
  );
};

TableComponent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TableComponent;
