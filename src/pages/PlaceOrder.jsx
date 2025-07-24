import React from "react";
import CartTotal from "../components/CartTotal";
import PayNowLogo from "../assets/PayNowLogo.png";
import OrderForm from "../components/OrderForm";
import { useState } from "react";
import PayNowInstructions from "../components/PayNowInstructions";
import Confirmation from "../components/Confirmation";
import { X, CheckCircle } from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === "error" ? "bg-[#f37676]" : "bg-[#e2f5ee]";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg z-50 flex items-center gap-3`}
    >
      <span className="gaegu">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <X size={16} />
      </button>
    </div>
  );
};

const PlaceOrder = () => {
  const [currentStep, setCurrentStep] = useState("form");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    collectionDate: "",
    additionalNotes: "",
  });
  const [toast, setToast] = useState({ message: "", type: "" });
  const [paymentProof, setPaymentProof] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const missingFields = [];
    if (!formData.firstName) missingFields.push("First name");
    if (!formData.lastName) missingFields.push("Last name");
    if (!formData.email) missingFields.push("Email address");
    if (!formData.collectionDate) missingFields.push("Collection date");

    if (missingFields.length > 0) {
      showToast(`Please fill in: ${missingFields.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setCurrentStep("payment");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file);
      showToast("Payment proof uploaded successfully!", "success");
    }
  };

  const handleSubmitPayment = () => {
    if (paymentProof) {
      setCurrentStep("confirmation");
    } else {
      showToast("Please upload proof of payment");
    }
  };

  const handleBackToForm = () => {
    setCurrentStep("form");
  };

  return (
    <div className="min-h-screen">
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })} 
      />
      
      {currentStep === 'form' && (
        <OrderForm
          formData={formData}
          onInputChange={handleInputChange}
          onProceedToPayment={handleProceedToPayment}
        />
      )}
      
      {currentStep === 'payment' && (
        <PayNowInstructions
          paymentProof={paymentProof}
          onFileUpload={handleFileUpload}
          onBackToForm={handleBackToForm}
          onSubmitPayment={handleSubmitPayment}
        />
      )}
      
      {currentStep === 'confirmation' && (
        <Confirmation
          formData={formData}
        />
      )}
    </div>
  )
};

export default PlaceOrder;
