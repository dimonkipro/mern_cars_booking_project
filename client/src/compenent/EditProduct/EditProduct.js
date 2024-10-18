import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editProduct, getOneProduct } from "../../redux/Actions/actionsProduct";
import { useDispatch, useSelector } from "react-redux";
import "./EditProduct.css";

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [updateproduct, setupdateproduct] = useState();
  const [photo, setphoto] = useState();
  const naviagte = useNavigate();

  const Product = useSelector((state) => state.productReducer.oneProduct);

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setupdateproduct(Product);
  }, [Product]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", updateproduct.name);
    data.append("price", updateproduct.price);
    data.append("plate", updateproduct.plate);
    data.append("file", photo);
    dispatch(editProduct(updateproduct._id, data, naviagte));
  };

  return (
    <div id="backH">
      <div id="login">
        <form id="fr" onSubmit={onSubmit}>
          <h2 style={{ textAlign: "center" }}>Edit Product</h2>
          <label htmlFor="username">Edit name of product</label>
          <input
            type="text"
            placeholder={updateproduct && updateproduct.name}
            onChange={(e) =>
              setupdateproduct({ ...updateproduct, name: e.target.value })
            }
          />
          <label htmlFor="plate">Edit plate of product</label>
          <input
            type="text"
            placeholder={updateproduct && updateproduct.plate}
            onChange={(e) =>
              setupdateproduct({ ...updateproduct, plate: e.target.value })
            }
          />
          <label htmlFor="username">Edit photo</label>
          <input type="file" onChange={(e) => setphoto(e.target.files[0])} />
          <label htmlFor="password"> Edit price</label>
          <input
            type="text"
            placeholder={updateproduct && updateproduct.price}
            onChange={(e) =>
              setupdateproduct({ ...updateproduct, price: e.target.value })
            }
          />
          <button id="b" className="save_edit" onClick={onsubmit}>
            save
          </button>
          <div className="social">
            <Link to={"/profile"}>return</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
