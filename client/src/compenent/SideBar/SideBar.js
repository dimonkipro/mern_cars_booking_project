import "./SideBar.css";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Actions/actionUser";
import { searchProduct } from "../../redux/Actions/actionsProduct";
import { toggleSidebar } from "../../redux/Actions/actionsSidebar";

function SideBar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen); // Get sidebar state

  const naviagte = useNavigate();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.userReducer.User);

  return (
    <>
      <div className="burger" onClick={() => dispatch(toggleSidebar())}>
        <img
          src="https://img.icons8.com/ios-filled/25/FFFFFF/menu--v1.png"
          alt="menu--v1"
        />
      </div>
      <div className={`SideBar-container ${isSidebarOpen ? "" : "open"}`}>
        <div className="conntent">
          <br />
          <Link
            to={"/"}
            className="TitSideBar"
            onClick={() => dispatch(toggleSidebar())}
          >
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/ultraviolet/48/home--v1.png"
              alt="home--v1"
            />
          </Link>

          {window.location.pathname === "/products" ? (
            <h2 className="srch">search</h2>
          ) : null}
          {window.location.pathname === "/products" ? (
            <input
              onChange={(e) => dispatch(searchProduct(e.target.value))}
              className="InptSrch"
            />
          ) : null}
          {token && window.location.pathname !== "/profile" ? (
            <Link
              to={"/profile"}
              className="profile"
              onClick={() => dispatch(toggleSidebar())}
            >
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/officel/30/test-account.png"
                alt="test-account"
              />{" "}
              Profile
            </Link>
          ) : null}

          {token && window.location.pathname !== "/products" ? (
            <Link
              to={"/products"}
              className="prd"
              onClick={() => dispatch(toggleSidebar())}
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/products-pile.png"
                alt="products-pile"
              />{" "}
              Products
            </Link>
          ) : null}

          {token && user.role === "company" ? (
            <Link
              to={"/addproduct"}
              className="aprd"
              onClick={() => dispatch(toggleSidebar())}
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/add-property.png"
                alt="add-property"
              />
              Add product
            </Link>
          ) : token &&
            user.role === "admin" &&
            window.location.pathname !== "/admin" ? (
            <Link
              className="aprd"
              to={"/admin"}
              onClick={() => dispatch(toggleSidebar())}
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/overview-pages-3.png"
                alt="overview-pages-3"
              />
              Userslist
            </Link>
          ) : null}

          {!token && window.location.pathname !== "/login" ? (
            <Link
              to={"/login"}
              className="log"
              onClick={() => dispatch(toggleSidebar())}
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/login-rounded-right.png"
                alt="login-rounded-right"
              />
              Login
            </Link>
          ) : null}
          {token &&
          user.role === "company" &&
          window.location.pathname !== "/charts" ? (
            <Link
              to={"/charts"}
              onClick={() => dispatch(toggleSidebar())}
              className="analytics"
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/combo-chart--v1.png"
                alt="combo-chart--v1"
              />
              Analytics
            </Link>
          ) : null}
          {!token && window.location.pathname !== "/register" ? (
            <Link
              to={"/register"}
              className="sig"
              onClick={() => dispatch(toggleSidebar())}
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/ultraviolet/48/add-user-male.png"
                alt="add-user-male"
              />
              Register
            </Link>
          ) : null}
          {token ? (
            <div className="lgout">
              <img
                onClick={() => dispatch(logout(), naviagte("/"))}
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/logout-rounded-left--v1.png"
                alt="logout-rounded-left--v1"
              />
              Logout
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default SideBar;
