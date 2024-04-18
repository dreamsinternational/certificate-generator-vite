import Header from "./Components/Header";
import "../public/css/style.css";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
const Layout = () => {
  return (
    <div className="show" id="main-wrapper">
      <Header />
      <Sidebar />
      <div className="content-body">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
