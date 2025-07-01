import React from "react";

const PlaceOrder = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 mt-18 sm:pt-14 min-h-[80vh] border-t">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] px-8">
        <div className="text-xl sm:text-2xl my-3">
          <p className="my-2 flex items-center gap-2 ribeye-regular text-[#38342c]">
            Your Information
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu"
            placeholder="First name"
          />
          <input
            type="text"
            className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu"
            placeholder="Last name"
          />
        </div>
               <input
            type="email"
            className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu"
            placeholder="Email address"
          />
      </div>
    </div>
  );
};

export default PlaceOrder;
