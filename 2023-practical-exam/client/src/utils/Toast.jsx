import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function warningToast(message) {
  toast.warning(message, {
    position: "top-right",
    hideProgressBar: false,
    type: "warning",
    closeOnClick: true,
  });
}

export function errorToast(message) {
  toast.error(message, {
    position: "top-right",
    hideProgressBar: false,
    type: "error",
    closeOnClick: true,
  });
}

export function successToast(message) {
  toast.success(message, {
    position: "top-right",
    hideProgressBar: false,
    type: "success",
    closeOnClick: true,
  });
}

