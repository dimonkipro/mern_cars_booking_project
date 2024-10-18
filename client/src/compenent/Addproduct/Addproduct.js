import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/Actions/actionsProduct";

function Addproduct() {
  const user = useSelector((state) => state.userReducer.User);
  const [Title, settitle] = useState("");
  const [Price, setprice] = useState("");
  const [Plate, setPlate] = useState("");
  const [image, setimage] = useState();
  const [Category, setCategory] = useState("luxury");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(user._id);
  const handleClick = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", Title);
    data.append("price", Price);
    data.append("plate", Plate);
    data.append("file", image);
    data.append("seller", user._id);
    data.append("category", Category);
    dispatch(addProduct(data, navigate));
  };

  return (
    <div id="backH">
      <div id="login">
        <form id="fr">
          <h3>Add Product</h3>
          <label htmlFor="username">Title</label>
          <input
            type="text"
            placeholder="title"
            id="username"
            onChange={(e) => settitle(e.target.value)}
          />
          <label htmlFor="password">Image</label>
          <input
            type="file"
            placeholder="file"
            id="password"
            onChange={(e) => setimage(e.target.files[0])}
          />
          <label htmlFor="password">Price</label>
          <input
            type="text"
            placeholder="price"
            id="password"
            onChange={(e) => setprice(e.target.value)}
          />
          <label htmlFor="plate">Plate</label>
          <input
            type="text"
            placeholder="plate"
            id="plate"
            onChange={(e) => setPlate(e.target.value)}
          />
          <label htmlFor="password">category</label>
          <select
            placeholder="Category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "auto" }}
          >
            <option value={"luxury"}>Luxury</option>
            <option value={"sport"}>Sport</option>
            <option value={"regular"}>Regular</option>
          </select>

          <button id="b" onClick={handleClick}>
            save
          </button>
          <div className="social">
            <Link to={"/products"}>return</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
