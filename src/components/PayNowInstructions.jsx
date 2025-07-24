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
          <div className="flex justify-center mb-6">
            <div className="w-64 h-64 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center relative shadow-sm">
              <QrCode size={160} className="text-gray-400" />
              <div className="absolute bottom-3 text-sm text-gray-500 font-medium">
                PayNow QR Code
              </div>
            </div>
          </div>
          <p className="text-lg gaegu mb-4">
            Scan this QR code with your banking app
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xl font-semibold text-blue-800">
              Amount to Pay:{" "}
              <span className="text-2xl">${getCartAmount()}.00</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Take Payment Screenshot",
      content: (
        <div className="text-center">
          <p className="text-lg gaegu mb-6">
            Take a screenshot of your successful payment confirmation
          </p>
          <div className="mb-6">
            <p className="text-sm gaegu mb-4 text-gray-600">
              Your proof of payment should look similar to this:
            </p>
            <div className="w-full max-w-sm mx-auto h-48 bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-sm text-green-600">
                <CheckCircle size={40} className="mx-auto mb-3" />
                <p className="font-semibold text-base">Payment Successful</p>
                <p>Amount: ${getCartAmount()}.00</p>
                <p>To: Merchant Name</p>
                <p className="text-xs mt-2 text-green-500">
                  Transaction ID: XXX123
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
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
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
              <Upload size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="mb-4 gaegu text-lg">
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
                className="bg-[#38342c] text-white py-3 px-6 rounded cursor-pointer gaegu hover:bg-opacity-90 transition text-lg"
              >
                Choose File
              </label>
              {paymentProof && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 gaegu font-medium">
                    ✓ {paymentProof.name} uploaded successfully
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-[#38342c] rounded-lg p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4 gaegu">Order Summary</h3>
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
    <div className="max-w-3xl mx-auto px-8 py-18">
      {/* Header */}
      <div className="text-xl sm:text-2xl mb-8 text-center">
        <p className="ribeye-regular text-[#38342c]">Complete Your Payment</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-[#38342c] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    index < currentStep ? 'bg-[#38342c]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600 gaegu">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Step Card */}
      <div className="bg-white border border-[#38342c] rounded-lg shadow-sm">
        {/* Card Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold gaegu text-[#38342c]">
            {steps[currentStep].title}
          </h2>
        </div>

        {/* Card Content */}
        <div className="p-8 min-h-[400px] flex items-center">
          <div className="w-full">
            {steps[currentStep].content}
          </div>
        </div>

        {/* Card Footer - Navigation */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={currentStep === 0 ? onBackToForm : prevStep}
              className="flex items-center space-x-2 border border-[#38342c] text-[#38342c] py-2 px-4 rounded gaegu hover:bg-gray-50 transition"
            >
              <ChevronLeft size={16} />
              <span>{currentStep === 0 ? 'Back to Details' : 'Previous'}</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 bg-[#38342c] text-white py-2 px-4 rounded gaegu hover:bg-opacity-90 transition"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={onSubmitPayment}
                disabled={!paymentProof}
                className={`py-2 px-6 rounded gaegu transition ${
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
