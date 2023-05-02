import CartContainer from "@/components/CartContainer";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import { calculateTotals } from "@/store/features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <h2>
      {isOpen ? <Modal /> : null}
      <Navbar />
      <CartContainer />
    </h2>
  );
}
