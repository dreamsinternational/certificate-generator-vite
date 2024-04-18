import { useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
const Header = () => {
  const { dispatch } = useContext(GlobalContext);
  const [dropdown, setDropdown] = useState(false);
  const [profile, setProfile] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="header bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xxl-12">
            <div className="header-content">
              <div className="header-left">
                <div className="search"></div>
              </div>
              <div className="header-right">
                <div className="dark-light-toggle">
                  <span className="dark">
                    <i className="bi bi-moon"></i>
                  </span>
                  <span className="light">
                    <i className="bi bi-brightness-high"></i>
                  </span>
                </div>

                <div
                  className="profile_log dropdown"
                  onClick={() => setDropdown(!dropdown)}
                  ref={dropdownRef}
                >
                  <div className="user">
                    <span className="thumb">
                      <img src="/images/profile/2.png" alt="" />
                    </span>
                    <span className="arrow">
                      <i className="icofont-angle-down"></i>
                    </span>
                  </div>
                  <div
                    className={`dropdown-menu dropdown-menu-right ${
                      dropdown && "show"
                    }`}
                  >
                    <ul>
                      <li>
                        {" "}
                        <Link
                          to={profile && profile.loginUrl}
                          className="dropdown-item login"
                        >
                          <i className="bi bi-toggle2-off"></i>Switch Account
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <span
                          onClick={() => dispatch({ type: "SIGNOUT" })}
                          className="dropdown-item logout"
                        >
                          <i className="bi bi-power"></i>Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
