import React, { useContext } from "react";
import { CartContext } from "./cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./sideBar.css";

function CartSidebar() {
  const { cartItems, removeFromCart, updateItemQuantity } = useContext(CartContext);

  return (
    <div className="side">
      <h2 className="your-cart">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is currently empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <div className="div">
                <img className="item" src={item.url} alt={item.name} />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="trash"
                  onClick={() => removeFromCart(item.id, item.size)}
                />
                <p className="iname">{item.name}</p>
                <p className="iprice">Price: ${Number(item.price).toFixed(2)}</p>
                <p className="isize">Size: {item.size}</p>
                <div className="iquantity">
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.size, Math.max(item.quantity - 1, 1))
                    }
                    className="minus2"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <pre> </pre>
                  <span> {item.quantity} </span>
                  <pre> </pre>

                  <button
                    onClick={() => updateItemQuantity(item.id, item.size, item.quantity + 1)}
                    className="plus2"
                  >
                    +
                  </button>
                </div>
                <p className="itotal">
                  Total: ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
              <hr />
            </div>
          ))}
          <div className="cart-summary">
            <h3>
              Total Price: $
              {cartItems.reduce(
                (sum, item) => sum + Number(item.price) * item.quantity,
                0
              ).toFixed(2)}
            </h3>
            <button
              className="checkout-button"
              onClick={() => alert("Proceeding to checkout!")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartSidebar;