import { Button, Dialog } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import ZenclubSavingsDialog from "./savings_dialog";
import { Drawer } from "@mui/material";

const ZenclubInfoDialog = () => {
  const [isChecked, setIsChecked] = useState(true); // Checkbox state
  const [showDialog, setShowDialog] = useState(false); // Dialog visibility state
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  const handleCheckboxChange = () => {
    if (isChecked) {
      setShowDialog(true);
    } else {
      setIsChecked(!isChecked);
    }
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <IoMdInformationCircleOutline
        size={20}
        onClick={() => setShowDialog(true)}
      />
      {!isMobile && (
        <Dialog
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          size="xs"
          open={showDialog}
          handler={() => setShowDialog(false)}
          placeholder
        >
          {zenClubInfoContent()}
        </Dialog>
      )}
      {isMobile && (
        <Drawer
          anchor="bottom"
          open={showDialog}
          PaperProps={{
            style: {
              alignItems: "inherit",
            },
          }}
          onClose={() => setShowDialog(!showDialog)}
        >
          {zenClubInfoContent()}
        </Drawer>
      )}
    </>
  );

  function zenClubInfoContent() {
    return (
      <>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <p className=" font-bold text-sm m-0">Zen Club Membership</p>
          </div>
          <div className="mb-1" onClick={() => setShowDialog(false)}>
            <Image
              src="/svg/close_icon.svg"
              alt="Close icon"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        </div>

        <hr className="bg-[#73777F] h-px" />
        <div className="flex justify-center my-4">
          <div className="relative w-[344px] h-[144px]">
            <Image src="/svg/enjoy-benefits.svg" fill alt="plan benefits" />
          </div>
        </div>
        <div className="m-4 p-2 border rounded flex justify-between items-center text-xs font-medium">
          <span>How much can I save?</span>
          <ZenclubSavingsDialog />
        </div>
      </>
    );
  }
};

export default ZenclubInfoDialog;
