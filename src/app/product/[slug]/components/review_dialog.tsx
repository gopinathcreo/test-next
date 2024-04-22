import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { Dialog } from "@material-tailwind/react";
import Rating from '@mui/material/Rating';
import { AddReviewModel } from "@/src/providers/models/add_review_model";
import { postReview } from "@/src/providers/api_provider";

const ReviewDialog = ({ id, variant, getReview }: { id: number, variant: number,getReview:()=>void }) => {

    //dialog state
    const [showReviewDialog, setShowReviewDialog] = useState(false);

    //formData
    const [formData, setFormData] = useState({
        name: "",
        rating: 5,
        review: "",
    });

    //formerror
    const [formErrors, setFormErrors] = useState({
        name: false,
        review: false
    });

    //for submition
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        //validation
        event.preventDefault();
        if (!formData.name.trim()) {
            setFormErrors(prevErrors => ({ ...prevErrors, name: true }));
            return;
        }
        if (!formData.review.trim()) {
            setFormErrors(prevErrors => ({ ...prevErrors, review: true }));
            return;
        }
        setShowReviewDialog(false);

        //review data check
        const newReview = {
            name: formData.name,
            rating: formData.rating,
            review: formData.review
        };

        //passing review for post api
        const review = {
            value: formData.rating,
            variant: variant,
            private_metadata: {
                name: formData.name,
                title: "",
                command: formData.review
            },
            order_line: ""
        } as AddReviewModel;


        let response = await postReview(review, id);
        if(response?.data?.id){
            getReview();
        }
        setFormData({
            name: "",
            rating: 5,
            review: "",
        });
    };
    const handleRatingChange = (newValue: number | null ) => {
        const ratingValue = newValue !== null ? newValue : 5; 
        setFormData((prevData) => ({
            ...prevData,
            rating: ratingValue,
          }));
    };
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setFormErrors(prevErrors => ({
            ...prevErrors,
            [name]: false
        }));
    };
    return (
        <>
            <a
                href="#"
                className="text-[#6A4FA3] transition-colors text-sm font-semibold"
                onClick={() => setShowReviewDialog(true)}
            >
                Write a Review
            </a>
            <Dialog open={showReviewDialog} handler={() => setShowReviewDialog(false)} placeholder onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                size="md">
                <div className="flex  flex-col justify-start m-2 p-4">
                    <div className="my-2 flex justify-between">
                        <p className="text-base sm:text-[32px] font-bold sm:font-semibold text-black">Write a Review</p>
                        <Image src="/svg/close_icon.svg" alt="Close Icon" width={20} height={20} onClick={() => setShowReviewDialog(false)} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="my-2 space-y-2">
                            <p className="text-sm font-normal text-black">Enter Name</p>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className={`w-full p-1 sm:p-3 rounded-lg focus:outline-none shadow-[0_0_1rem_#8c98a440] border ${formErrors.name ? "border-red-500" : "border-gray-300"
                                    } bg-white`}
                            />
                            {formErrors.name && <p className="text-red-500 text-xs">Please enter your name</p>}
                        </div>
                        <div className="my-2 space-y-2">
                            <p className="text-sm font-normal text-black">Ratings</p>
                            <Rating
                                name="simple-controlled"
                                value={formData.rating}
                                onChange={(event: React.ChangeEvent<{}>, value: number|null) =>
                                handleRatingChange(value)
                              }
                            />
                        </div>
                        <div className="my-2 space-y-2">
                            <p className="text-sm font-normal text-black">Add a written review</p>
                            <textarea
                                name="review"
                                value={formData.review}
                                onChange={handleChange}
                                placeholder="Give us your review"
                                className={`w-full p-1 sm:p-3 rounded-lg focus:outline-none shadow-[0_0_1rem_#8c98a440] border ${formErrors.review ? "border-red-500" : "border-gray-300"
                                    } bg-white`}
                            />
                            {formErrors.review && <p className="text-red-500 text-xs">Please enter your review</p>}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#6A4FA3] text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    );
};

export default ReviewDialog;
