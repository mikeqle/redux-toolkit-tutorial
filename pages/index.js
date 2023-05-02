import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "@/components/CartContainer";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import { calculateTotals, getCartItems } from "@/store/features/cart/cartSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <h2>
      {isOpen ? <Modal /> : null}
      <Navbar />
      <CartContainer />
    </h2>
  );
}
