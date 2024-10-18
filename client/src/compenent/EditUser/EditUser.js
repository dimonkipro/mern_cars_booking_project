import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Edituser.css";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../redux/Actions/actionUser";

function EditUser() {
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const [update, setupdate] = useState();
  const [currentpassword, setcurrentpassword] = useState("");
  const [newPassword, setnewpassword] = useState("");

  const [image, setimage] = useState();

  const user = useSelector((state) => state.userReducer.User);
  const err = useSelector((state) => state.userReducer.errors);

  const [error, seterror] = useState("");

  useEffect(() => {
    setupdate(user);
  }, [user]);

  const handleclick = () => {
    if (currentpassword && newPassword.length >= 6) {
      const data = new FormData();
      data.append("email", update.email);
      data.append("name", update.name);

      data.append("password", currentpassword);
      data.append("newpassword", newPassword);
      data.append("file", image);
      console.log(data);
      dispatch(editUser(user._id, data, naviagte));
    }
    if (newPassword && currentpassword === "") {
      seterror("current password require");
    }
    if (newPassword.length <= 6 && currentpassword) {
      console.log("ok");
      seterror("length password should be 6 caractares");
    }
    if (currentpassword && newPassword === "") {
      seterror("new password is empty");
    }
    if (newPassword === "" && currentpassword === "") {
      const data = new FormData();
      data.append("name", update.name);
      data.append("file", image);

      dispatch(editUser(user._id, data, naviagte));
    }
  };

  return (
    <div className="EditUser">
      <h2>Edit User</h2>
      <div className="form-floating ">
        <label htmlFor="name">
          NEW USER NAME
        </label>
        <input
          type="text"
          className="form-control inpt "
          id="name"
          placeholder="New name"
          onChange={(e) => setupdate({ ...update, name: e.target.value })}
          
        />

        <br />
      </div>

      <div className="form-floating">
        <label htmlFor="photo">
          Change photo{" "}
        </label>
        <input
          type="file"
          className="form-control inpt"
          id="photo"
          onChange={(e) => setimage(e.target.files[0])}
        />

        <br />
      </div>

      <div className="edit_password">
        <div className="form-floating ">
          <label htmlFor="password">
            Current passowrd
          </label>
          <input
            type="password"
            className="form-control inpt "
            id="password"
            placeholder="current password"
            onChange={(e) => setcurrentpassword(e.target.value)}
          />

          <br />
        </div>
        <div className="form-floating ">
          <label htmlFor="pswd">
            New passowrd
          </label>
          <input
            type="password"
            className="form-control inpt "
            id="pswd"
            placeholder="new password"
            onChange={(e) => setnewpassword(e.target.value)}
          />
          <br />
        </div>

        <p style={{ color: "#ebe71c" }}>
          {error ? error : err ? err.msg : null}
        </p>
      </div>
      <div id="save">
        <button type="button" className="btnEdituser" onClick={handleclick}>
          save change
        </button>
        <Link to={"/profile"}>
          {" "}
          <button type="button" className="btnReturn">
            return
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EditUser;
