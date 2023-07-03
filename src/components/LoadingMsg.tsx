import React from "react";

const LoadingMsg = () => {
  return (
    <div className="mt-[10rem] flex w-full justify-center">
      <div className="relative flex h-[2.5rem] w-[8rem]">
        <span className="absolute left-[15%] top-[18%] inline-flex h-[70%] w-[70%]  animate-ping rounded-full bg-rich opacity-75"></span>
        <span className="relative flex h-[2.5rem] w-[8rem] items-center justify-center rounded-full  bg-light text-[1.6rem] leading-[2.5rem] text-white shadow-md">
          <span className="relative top-[2px]">Loading</span>
        </span>
      </div>
    </div>
  );
};

export default LoadingMsg;
