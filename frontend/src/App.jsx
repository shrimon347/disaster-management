import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Donation from "./pages/Donation";
import Crisis from "./pages/Crisis";
import Volunteers from "./pages/Volunteers";
import Adminlayout from "./layout/Adminlayout"; // Create a new layout for admin
import Register from "./pages/login-register/Register";
import Login from "./pages/login-register/Login";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="donation" element={<Donation />} />
        <Route path="crisis" element={<Crisis />} />
        <Route path="volunteers" element={<Volunteers />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        

      </Route>
        <Route path="admin" element={<Adminlayout />}>
          {/* <Route path="volunteers" element={<ManageVolunteers />} />
          <Route path="crisis" element={<ManageCrisis />} />
          <Route path="reports" element={<DailyReports />} /> */}
        </Route>
    </Routes>
  );
}

export default App;
