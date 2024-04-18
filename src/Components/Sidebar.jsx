import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const pathParts = pathname.split("/");
  const lastPathPart = pathParts[pathParts.length - 1];

  return (
    <div className="sidebar">
      <div className="brand-logo">
        <Link to="/">
          <img src="/images/logoi.svg" alt="" width="30" />
        </Link>
      </div>
      <div className="menu" id="d_menu">
        <ul>
          <li>
            <Link
              to="/"
              className={`dashboardIcon ${lastPathPart === "" && "active"}`}
            >
              <span>
                <i className="bi bi-house"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className={`dashboardIcon ${
                lastPathPart === "reports" && "active"
              }`}
            >
              <span>
                <i className="bi bi-file-earmark-text"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/manager"
              className={`dashboardIcon ${
                lastPathPart === "manager" && "active"
              }`}
            >
              <span>
                <i className="bi bi-people-fill"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/setting"
              className={`dashboardIcon ${
                lastPathPart === "setting" && "active"
              }`}
            >
              <span>
                <i className="bi bi-sliders"></i>
              </span>
            </Link>
          </li>
          {/* <li>
            <Link to="/settings-profile" id="settings__mainMenu">
              <span>
                <i className="bi bi-gear"></i>
              </span>
            </Link>
          </li> */}
          <li className="logout">
            <Link to="/login">
              <span>
                <i className="bi bi-power"></i>
              </span>
            </Link>
          </li>
        </ul>
        <p className="copyright">
          © <Link to="#">Dreams International</Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
