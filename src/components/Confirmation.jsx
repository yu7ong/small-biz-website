import React from "react";

function Confirmation({ formData }) {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <CheckCircle size={80} className="text-green-500" />
        <div className="text-xl sm:text-2xl my-3">
          <p className="my-2 ribeye-regular text-[#38342c]">
            Order Submitted Successfully!
          </p>
        </div>
        <div className="max-w-md">
          <p className="mb-4 gaegu text-lg">
            Payment has been received by seller. We will email you back for
            final confirmation.
          </p>
          <p className="gaegu text-gray-600 mb-6">
            Please check your email at <strong>{formData.email}</strong> for
            order details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
