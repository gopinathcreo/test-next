import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import { useCart } from '@/src/providers/cart_context';
import Image from "next/image"


export default function TrackingOrderModal({ data }: { data: any }) {
    const { isLoggedIn } = useCart();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const goToLink = () => {
        navigator.clipboard.writeText(data.tracking_id);
        window.open(data.tracking_url, "_blank");
    };
    const copyId = () => {
        navigator.clipboard.writeText(data.tracking_id);
    }

    return (
        <>

            <div onClick={handleOpen} className="align-center">Track Order</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"


            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-gray-200 shadow-lg sm:w-[484px] w-[350px] p-3 px-6 rounded-lg border-none">
                    <div className="sm:text-xl text-lg py-4 font-semibold">
                        Open tracking Page
                    </div>
                    <div className="text-black p-2 my-1 bg-[#CFD1DA] flex justify-between">
                        <p>Tracking Id:{data.tracking_id}</p>
                        <div onClick={copyId} className="cursor-pointer">
                            <Image src="/svg/copy_id.svg" alt="Copy ID" width={20} height={20}></Image>
                        </div>

                    </div>
                    <div className="text-black p-2 my-1 bg-[#CFD1DA]" >
                        <p>Tracking url:{data.tracking_url}</p>
                    </div>
                    <div className="text-[#73777F] pt-2 text-xs">
                        <p> Proceed to copy tracking ID and navigate to tracking page.You may paste this tracking ID on the page to track your order</p>
                    </div>



                    <div className="flex align-middle justify-end mt-4 text-base">
                      <div className="mx-2 text-sm p-1 cursor-pointer" onClick={handleClose}>
                            <p>Cancel</p>
                        </div>

                        <div onClick={goToLink} className="mx-2 px-2 text-sm text-white bg-[#6A4FA3] rounded p-1 cursor-pointer"><p>Proceed to Tracking page</p>
                        </div>

                    </div>

                </div>
            </Modal>

        </>

    );
}

