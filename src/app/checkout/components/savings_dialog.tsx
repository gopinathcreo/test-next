import { Button, Dialog } from "@material-tailwind/react";
import { Slider } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

const ZenclubSavingsDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [savings, setSavings] = useState<number>(975);
  const [spend, setSpend] = useState<number>(6500);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setSpend(newValue);
      setSavings(Math.round(0.15 * newValue));
    }
  };

  return (
    <>
      <Button
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        variant="text"
        className="text-black bg-[#ffdcc3] outline-none hover:bg-[#ffdcc3]"
        placeholder
        onClick={() => {
          setShowDialog(true);
        }}
      >
        Savings Calculator
      </Button>
      <Dialog
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        size="sm"
        open={showDialog}
        handler={() => setShowDialog(false)}
        placeholder
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <p className=" font-bold text-sm m-0">Savings with Zen Club</p>
          </div>
          <div className="mb-1" onClick={() => setShowDialog(false)}>
            <img
              src="/svg/close_icon.svg"
              alt="Close icon"
              className="cursor-pointer"
            />
          </div>
        </div>

        <hr className="bg-[#73777F] h-px" />
        <div className="p-4 flex flex-col font-medium ">
          <span className="text-[#6a4fa3] text-2xl">₹{spend}</span>
          <span className="text-sm ">Your monthly spends</span>
          <Slider
            getAriaLabel={() => "Price range"}
            defaultValue={spend}
            onChange={handleChange}
            min={0}
            max={10000}
            valueLabelDisplay="auto"
          />
        </div>
        <div className="p-4 flex flex-col font-medium ">
          <p className="text-[#6a4fa3]  text-2xl flex gap-2">
            ₹{savings}{" "}
            <span className="flex gap-2">
              ( ~15%{" "}
              <img
                _ngcontent-tour-of-heroes-c58=""
                src="/svg/member_incentive.svg"
                alt="Member Incentive"
              ></img>{" "}
              )
            </span>
          </p>
          <span className="text-sm ">Estimated savings</span>
        </div>
        <p className="text-[10px] text-[#73777f] p-4">
          {" "}
          Estimated savings are purely indicative. Member incentive varies
          across all products listed on Zoozle. You get member incentive upto
          18%.{" "}
        </p>
      </Dialog>
    </>
  );
};

export default ZenclubSavingsDialog;
