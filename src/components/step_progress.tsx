import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";
import { Stepper, Step, CardHeader, Typography } from "@material-tailwind/react";

interface StepProgressProps {
  currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  const steps = ["Cart", "Address", "Checkout"];

  return (
      <div className="hidden md:block ">
      <div
          className={` ${
              currentStep === 3 ? "top-0" : "top-[121px]"
          } max-w-3xl mx-auto   pt-3 z-[100]  bg-white md:relative md:top-0 md:z-0 flex w-full md:mt-10 justify-between`}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep - 1;
          const isCompleted = index < currentStep - 1;
          const isNext = index > currentStep - 1;

          return (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center w-[70px] gap-2">
                  {/* <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isCompleted ? "bg-purple-600" : "bg-gray-200"
                } ${isActive ? "text-white" : "text-gray-500"}`}
              > */}
                  {isActive && <FaRegDotCircle color="#6A4FA3" size={24}/>}
                  {isCompleted && <MdCheckCircle color="#6A4FA3" size={24}/>}
                  {isNext && <FaRegDotCircle color="#C3C6CF" size={24}/>}
                  {/* </div> */}
                  <span className="text-black">{step}</span>
                </div>
                {index !== steps.length - 1 && (
                    <div className="flex-auto relative">
                      <hr className="absolute top-[15px] left-[5%] w-[90%]"/>
                    </div>
                )}
              </React.Fragment>
          );
        })}
      </div></div>
  );
};

export default StepProgress;
