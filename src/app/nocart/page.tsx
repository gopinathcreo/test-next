"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

const NoCart = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row mt-24 mb-10 items-center gap-2">
      <div className="w-full md:w-3/5">
        <img
          src="/svg/nocart.svg"
          alt="No cart"
          style={{ objectFit: "contain", width: "100%" }}
        />
      </div>
      <div className="flex flex-col text-base items-center md:items-start">
        <h2 className="font-medium md:font-normal md:text-2xl mb-2">
          Hey, it feels so light
        </h2>
        <p className="md:text-lg text-gray-600">
          There is nothing in your cart. Let&apos;s add some items
        </p>
        <Button
          className="rounded-full w-full bg-[#6A4FA1] mt-10"
          placeholder=""
          onClick={() => router.push("/")}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          continue shopping
        </Button>
      </div>
    </div>
  );
};

export default NoCart;
