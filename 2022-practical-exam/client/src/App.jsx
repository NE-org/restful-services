import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Vehicles } from "./pages/Vehicles";
import { PrivateRoute, PublicRoute } from "./utils/Route";
import { Owners } from "./pages/Owners";
import { VehicleOwnership } from "./pages/VehicleOwnership";
import { Logout } from "./pages/Logout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<PublicRoute element={Login} />} />
          <Route
            path="/login"
            exact
            element={<PublicRoute element={Login} />}
          />
          <Route
            path="/signup"
            exact
            element={<PublicRoute element={SignUp} />}
          />
          <Route
            path="/dashboard"
            exact
            element={<PrivateRoute element={Vehicles} />}
          />
          <Route
            path="/owners"
            exact
            element={<PrivateRoute element={Owners} />}
          />
          <Route
            path="/vehicles-ownerships"
            exact
            element={<PrivateRoute element={VehicleOwnership} />}
          />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
