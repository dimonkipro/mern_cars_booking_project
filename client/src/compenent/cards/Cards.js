import React from "react";
import "./cards.css";
import { Link } from "react-router-dom";
function Cards({ el }) {
  return (
    <>
      <div className="card">
        <div className="card-img">
          <Link to={`/product/${el._id}`} className="card-link">
            <img src={el.img} alt="..." />
          </Link>
        </div>

        <div className="card-info">
          <p
            className="text-title"
            style={{ textAlign: "end", fontWeight: "400", color: "#5858588a" }}
          >
            {el.category}
          </p>
          <p className="text-title">{el.name}</p>
          <p className="text-body">{el.plate}</p>
        </div>
        <div className="card-footer">
          <h3>Owner : {el.seller && el.seller.name} </h3>
          <span className="text-title">${el.price}</span>
        </div>
      </div>
    </>
  );
}

export default Cards;
