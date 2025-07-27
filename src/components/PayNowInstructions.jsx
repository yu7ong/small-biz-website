import React, { useContext, useState } from "react";
import { QrCode, CheckCircle, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";

function PayNowInstructions({
  paymentProof,
  onFileUpload,
  onBackToForm,
  onSubmitPayment,
}) {
  const { getCartAmount } = useContext(ShopContext);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Scan PayNow QR Code",
      content: (
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-36 h-36 bg-white border border-gray-300 rounded-lg flex items-center justify-center relative shadow-sm">
              <QrCode size={90} className="text-gray-400" />
              <div className="absolute bottom-2 text-xs text-gray-500 font-medium">
                PayNow QR Code
              </div>
            </div>
          </div>
          <p className="text-base gaegu mb-2">
            Scan this QR code with your banking app
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
            <p className="text-base font-semibold text-blue-800">
              Amount to Pay:{" "}
              <span className="text-lg">${getCartAmount()}.00</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Take Payment Screenshot",
      content: (
        <div className="text-center">
          <p className="text-base gaegu mb-2">
            Take a screenshot of your successful payment confirmation
          </p>
          <div className="mb-2">
            <p className="text-xs gaegu mb-2 text-gray-600">
              Your proof of payment should look similar to this:
            </p>
            <div className="w-full max-w-xs mx-auto h-28 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-xs text-green-600">
                <CheckCircle size={24} className="mx-auto mb-1" />
                <p className="font-semibold">Payment Successful</p>
                <p>Amount: ${getCartAmount()}.00</p>
                <p>To: Merchant Name</p>
                <p className="text-[10px] mt-1 text-green-500">
                  Transaction ID: XXX123
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
            <p className="text-xs text-blue-700">
              💡 Make sure the screenshot clearly shows the payment amount and
              success status
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Upload Proof of Payment",
      content: (
        <div className="text-center">
          <div className="mb-3">
            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <Upload size={28} className="mx-auto mb-2 text-gray-400" />
              <p className="mb-2 gaegu text-base">
                Upload your payment screenshot
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={onFileUpload}
                className="hidden"
                id="payment-proof"
              />
              <label
                htmlFor="payment-proof"
                className="bg-[#38342c] text-white py-2 px-4 rounded cursor-pointer gaegu hover:bg-opacity-90 transition text-base"
              >
                Choose File
              </label>
              {paymentProof && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 gaegu font-medium text-xs">
                    ✓ {paymentProof.name} uploaded successfully
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-[#38342c] rounded-lg p-3 bg-white">
            <h3 className="text-base font-semibold mb-2 gaegu">Order Summary</h3>
            <CartTotal />
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-lg sm:text-xl mb-4 text-center">
        <p className="ribeye-regular text-[#38342c]">Complete Your Payment</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-center space-x-1 mb-2">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  index <= currentStep
                    ? 'bg-[#38342c] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-1 mx-1 ${
                    index < currentStep ? 'bg-[#38342c]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-600 gaegu">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Step Card */}
      <div className="bg-white border border-[#38342c] rounded-lg shadow-sm">
        {/* Card Header */}
        <div className="border-b border-gray-200 p-3">
          <h2 className="text-lg font-semibold gaegu text-[#38342c]">
            {steps[currentStep].title}
          </h2>
        </div>

        {/* Card Content */}
        <div className="p-4 min-h-[220px] flex items-center">
          <div className="w-full">
            {steps[currentStep].content}
          </div>
        </div>

        {/* Card Footer - Navigation */}
        <div className="border-t border-gray-200 p-3">
          <div className="flex justify-between items-center">
            <button
              onClick={currentStep === 0 ? onBackToForm : prevStep}
              className="flex items-center space-x-1 border border-[#38342c] text-[#38342c] py-1 px-2 rounded gaegu hover:bg-gray-50 transition text-sm"
            >
              <ChevronLeft size={14} />
              <span>{currentStep === 0 ? 'Back to Details' : 'Previous'}</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-1 bg-[#38342c] text-white py-1 px-3 rounded gaegu hover:bg-opacity-90 transition text-sm"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={onSubmitPayment}
                disabled={!paymentProof}
                className={`py-1 px-4 rounded gaegu transition ${
                  paymentProof
                    ? 'bg-[#38342c] text-white hover:bg-opacity-90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayNowInstructions;
