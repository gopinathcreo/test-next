"use client";

import Badge from "@material-tailwind/react/components/Badge";
import Button from "@material-tailwind/react/components/Button";
import { useCart } from "../providers/cart_context";

export default function CartBadge() {
  const { cartItemCount } = useCart();
  return (
    <div
      className={` ${
        cartItemCount > 0 ? "flex" : "hidden"
      }  items-center justify-center w-5 h-5 rounded-full bg-purple-600 text-gray-500`}
    >
      <span className="font-semibold text-white">{cartItemCount}</span>
    </div>
  );
}
