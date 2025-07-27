import React from "react";
import CartTotal from "../components/CartTotal";
import PayNowLogo from "../assets/PayNowLogo.png";
import OrderFormNavbar from "./OrderFormNavbar";

function OrderForm({ formData, onInputChange, onProceedToPayment }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <OrderFormNavbar />
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-5 min-h-[80vh] sm:pr-10">
        {/* Left side */}
        <div className="flex flex-col gap-4 w-full sm:flex-[2] px-8">
          <div className="text-xl sm:text-2xl my-3">
            <p className="my-2 flex items-center gap-2 ribeye-regular text-[#38342c]">
              Your Information
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <label className="block text-sm gaegu mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={onInputChange}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm gaegu mb-1">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm gaegu mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={onInputChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm gaegu mb-1">
              Collection Date <span className="text-red-500">*</span>
            </label>
            <div className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu">
              <label className="block text-m gaegu mb-4">
                This is a preorder form for EVENTNAME. Which day would you like
                to collect your products?
              </label>
              <label className="block text-m gaegu">
                Choose one collection date:
              </label>
              <div className="text-s gaegu">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="collectionDate"
                    value="2025-09-10"
                    checked={formData.collectionDate === "2025-09-10"}
                    onChange={onInputChange}
                    required
                  />
                  <span className="mx-2 block">10 Sept 2025 (Wed)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="collectionDate"
                    value="2025-09-11"
                    checked={formData.collectionDate === "2025-09-11"}
                    onChange={onInputChange}
                  />
                  <span className="mx-2 block">11 Sept 2025 (Thurs)</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-s font-medium text-[#38342c] gaegu mb-0">
              Additional Notes (Optional)
            </label>
            <textarea
              className="border border-[#38342c] rounded py-1.5 px-3.5 w-full gaegu h-20"
              placeholder="Anything to tell us?"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={onInputChange}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="sm:mt-12">
          <div className="min-w-80 sm:flex-[1] px-8">
            <CartTotal />
          </div>

          <div className="sm:mt-12 px-8 pb-4">
            <div className="text-m sm:text-l my-3">
              <p className="my-2 flex items-center gap-2 ribeye-regular text-[#38342c]">
                Payment Method
              </p>
            </div>
            <button
              type="button"
              className="flex items-center border gap-3 p-2 px-3 cursor-pointer rounded transition active:bg-gray-100"
              onClick={onProceedToPayment}
            >
              <img className="h-5" src={PayNowLogo} alt="PayNow logo" />
              <span className="text-sm gaegu">PayNow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
