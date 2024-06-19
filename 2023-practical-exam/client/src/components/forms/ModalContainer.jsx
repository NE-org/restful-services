/* eslint-disable react/prop-types */

const ModalContainer = ({ children }) => {
  return <div className="modal-container" style={{ zIndex: 999999999999 }}>{children}</div>;
};

export default ModalContainer;
