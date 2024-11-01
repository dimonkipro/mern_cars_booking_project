import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/Actions/actionsProduct";
import { Html5QrcodeScanner } from "html5-qrcode"; // Adjust the import if necessary

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.User);
  const addLoading = useSelector((state) => state.productReducer.addLoading);
  const error = useSelector((state) => state.productReducer.errors);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [plate, setPlate] = useState("");
  const [image, setImage] = useState();
  const [category, setCategory] = useState("luxury");
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scanner, setScanner] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", title);
    data.append("price", price);
    data.append("plate", plate);
    data.append("file", image);
    data.append("seller", user._id);
    data.append("category", category);
    dispatch(addProduct(data, navigate));
  };

  const startScanner = () => {
    const html5QrCode = new Html5QrcodeScanner("scanner", {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
    });

    html5QrCode.render(
      (decodedText) => {
        setTitle(decodedText); // Use the scanned value as the title
        stopScanner(); // Stop scanning after successful scan
      },
      (errorMessage) => {
        console.warn(`QR Code scanning failed: ${errorMessage}`);
      }
    );

    setScanner(html5QrCode); // Store scanner instance
  };

  const stopScanner = () => {
    if (scanner) {
      scanner.clear(); // Clear the scanner
    }
    setScannerVisible(false); // Hide the scanner
  };

  useEffect(() => {
    if (scannerVisible) {
      startScanner();
    } else {
      stopScanner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scannerVisible]);

  return (
    <div id="backH">
      <div id="login">
        <form id="fr">
          <h3>Add Product</h3>
          <label htmlFor="name">Title</label>
          <input
            type="text"
            placeholder="title"
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Button to toggle scanner visibility */}
          <button
            type="button"
            className="btn"
            onClick={() => setScannerVisible(!scannerVisible)}
          >
            {scannerVisible ? "Close Scanner" : "Scan Barcode"}
          </button>

          {/* Scanner container */}
          {scannerVisible && (
            <div
              id="scanner"
              style={{ margin: "20px auto", width: "200px", height: "200px" }}
            ></div>
          )}

          <label htmlFor="image">Image</label>
          <input
            type="file"
            placeholder="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            placeholder="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="plate">Plate</label>
          <input
            type="text"
            placeholder="plate"
            id="plate"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            style={{ width: "auto" }}
          >
            <option value="luxury">Luxury</option>
            <option value="sport">Sport</option>
            <option value="regular">Regular</option>
          </select>

          <button id="b" onClick={handleClick} disabled={addLoading}>
            {addLoading ? "Saving..." : "Save"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="social">
            <Link to={"/products"}>Return</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
