import CartContainer from "@/components/CartContainer";
import Navbar from "@/components/Navbar";
import { calculateTotals } from "@/store/features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <h2>
      <Navbar />
      <CartContainer />
    </h2>
  );
}
