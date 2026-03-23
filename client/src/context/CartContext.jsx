import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    const existItem = cart.find((x) => x._id === product._id);
    if (existItem) {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...existItem, qty: x.qty + qty } : x,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((x) => x._id !== id));
  };

  const updateCartQty = (id, qty) => {
    setCart(
      cart.map((x) => (x._id === id ? { ...x, qty: Math.max(1, qty) } : x)),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.qty, 0);
  };

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        getCartTotal,
        getCartCount,
        tax,
        subtotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
