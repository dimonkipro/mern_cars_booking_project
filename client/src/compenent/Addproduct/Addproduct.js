import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/Actions/actionsProduct";
import { Html5QrcodeScanner } from "html5-qrcode"; // Import html5-qrcode

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
  // eslint-disable-next-line no-unused-vars
  const [scannedBarcode, setScannedBarcode] = useState("");

  const scannerRef = useRef(null); // Ref for scanner element
  const [isScanning, setIsScanning] = useState(false);

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

  // Function to initialize the scanner
  const startScanner = () => {
    if (scannerRef.current) {
      const html5QrCodeScanner = new Html5QrcodeScanner(
        "scanner",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      html5QrCodeScanner.render(
        (decodedText) => {
          setScannedBarcode(decodedText);
          setTitle(decodedText); // Set title to scanned barcode value
          setIsScanning(false); // Stop scanning after successful scan
          html5QrCodeScanner.clear(); // Clear scanner after scan
        },
        (error) => {
          console.warn(`QR Code scanning failed: ${error}`);
        }
      );
    }
  };

  useEffect(() => {
    if (isScanning) {
      startScanner();
    }
  }, [isScanning]);

  const handleStartScan = () => {
    setIsScanning(true);
  };

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
            value={title} // Use the `title` state for input
            onChange={(e) => setTitle(e.target.value)} // Update `title` instead of `scannedBarcode`
          />
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

          <button type="button" onClick={handleStartScan}>
            {isScanning ? "Scanning..." : "Scan Barcode"}
          </button>

          {/* Scanner container */}
          {isScanning && <div id="scanner" ref={scannerRef}></div>}

          <div className="social">
            <Link to={"/products"}>Return</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
