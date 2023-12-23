import React from "react";

import "./style.css";

interface Props {}

export const StatusExchangeLoader: React.FC<Props> = () => {
  return (
    <div className="w-full h-full flex justify-center items-center mx-auto my-4 overflow-hidden">
      <div className="flex justify-center items-center relative w-60 h-60">
        <div className="absolute border-[0.75em] border-t-transparent rounded-full border-solid border-pink-500 h-full w-full animate-spin"></div>
        <h1 className="flex text-white text-xl lg:text-2xl 2xl:text-3xl font-semibold">
          Loading
          <div className="loading-pulse">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </h1>
      </div>
    </div>
  );
};
