import React from "react";

const PlaceOrder = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 mt-18 sm:pt-14 min-h-[80vh] border-t">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[600px] px-8">
        <div className="text-xl sm:text-2xl my-3">
          <p className="my-2 flex items-center gap-2 ribeye-regular text-[#38342c]">
            Your Information
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            required
            className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu"
            placeholder="First name"
          />
          <input
            type="text"
            required
            className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu"
            placeholder="Last name"
          />
        </div>
        <input
          type="email"
          required
          className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu"
          placeholder="Email address"
        />
        <div className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu">
          <label className="block text-m gaegu mb-4">
            This is a preorder form for EVENTNAME. Which day would you like to collect
            your products?
          </label>
          <label className="block text-m gaegu">
            Choose one collection date:
          </label>
          <div className="text-s gaegu">
            <label className="flex items-center">
              <input type="radio" name="collectionDate" required />
              <span className="mx-2 block">10 Sept 2025 (Wed)</span>
            </label>

            <label className="flex items-center">
              <input type="radio" name="collectionDate" />
              <span className="mx-2 block">11 Sept 2025 (Thurs)</span>
            </label>
          </div>
        </div>
        <div className="mb-4"> 
        <label className="block text-s font-medium text-[#38342c] gaegu mb-0">
          Additional Notes (Optional)
        </label>
        <textarea
          className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu h-20"
          placeholder="Anything to tell us?"
        />
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
