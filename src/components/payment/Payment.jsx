import React from 'react';
import toast from 'react-hot-toast';
import { CreditCard } from 'lucide-react';

function Payment() {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.Razorpay) {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_1LfzQfVW1C8CbP',
        amount: 100,
        currency: 'INR',
        name: 'Project Payment',
        description: 'Freelance.io Payment',
        handler: (response) => {
          toast.success(`Payment successful! ID: ${response.razorpay_payment_id}`);
        },
      };
      const pay = new window.Razorpay(options);
      pay.open();
    } else {
      toast.error('Payment gateway not available');
    }
  };

  return (
    <button className="btn-primary-custom btn-sm" onClick={handleSubmit}>
      <CreditCard size={14} /> Pay & Complete
    </button>
  );
}

export default Payment;