import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./cartContext";
import "./productDetails.css";

function ProductDetails({ category }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [number, setNumber] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { addToCart, updateItemQuantity } = useContext(CartContext);

  useEffect(() => {
    fetch("/images.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data[category]?.find(
          (item) => item.id === parseInt(id)
        );
        setProduct(foundProduct);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id, category]);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(number + change, 1);
    setNumber(newQuantity);
    if (selectedSize) {
      updateItemQuantity(product.id, selectedSize, newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const itemToAdd = {
      id: product.id,
      name: product.name,
      url: product.url,
      price: product.price,
      quantity: number,
      size: selectedSize,
    };

    addToCart(itemToAdd);
    setSuccessMessage(`"${product.name}" has been added to your cart!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <h1 className="name">{product.name}</h1>
      <img src={product.url} alt={product.name} />
      <p className="price">${product.price}</p>
      <p className="desc">{product.description}</p>
      <label htmlFor="size" className="size">
        Size:
      </label>
      <select
        className="options"
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        <option disabled hidden value="">
          Select Size
        </option>
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
      </select>
      <div className="buttons">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="minus"
          disabled={number <= 1}
        >
          -
        </button>
        <span>{number}</span>
        <button onClick={() => handleQuantityChange(1)} className="plus">
          +
        </button>
      </div>
      <button onClick={handleAddToCart} className="add">
        Add To Cart
      </button>
    </div>
  );
}

export default ProductDetails;
