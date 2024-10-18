import React from "react";
import "./ProductUser.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../redux/Actions/actionsProduct";

function ProductUser() {
  const user = useSelector((state) => state.userReducer.User);
  const Products = useSelector((state) => state.productReducer.products);
  const productsbyuser = Products.filter((el) => el.seller._id === user._id);
  const disptach = useDispatch();
  return (
    <div className="ProductUser">
      <h2 style={{ textAlign: "center", padding: "1rem" }}>My products</h2>
      {productsbyuser.length === 0 ? (
        <p style={{ padding: "1rem" }}>No Products Found !!!</p>
      ) : (
        productsbyuser.map((el) => (
          <ul key={el._id} className="ul">
            <li className="flx_li">
              <p className="productUser">{el.name}</p>
              <div className="carimgp">
                <img src={el.img} alt="..." />
              </div>
              <Link to={`/editproduct/${el._id}`} className="editp">
                📝 Edit
              </Link>
              <button
                onClick={() => disptach(deleteProduct(el._id))}
                className="btn-delete"
              >
                ❌
              </button>
            </li>
          </ul>
        ))
      )}
    </div>
  );
}

export default ProductUser;
