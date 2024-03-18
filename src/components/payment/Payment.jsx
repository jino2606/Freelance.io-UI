import React,{useState} from 'react';
import { toast } from 'react-toastify';

function Payment() {
  const [amount, setAmount] = useState('1');

  const handleSubmit = (e)=>{

    e.preventDefault();
    var options = {
        key: "rzp_test_1LfzQfVW1C8CbP", // Enter the Key ID generated from the Dashboard
        amount: 100,
        currency: "INR",
        name:"Project Payment",
        description:"for testing purpose",
        description: "Acme Corp",
        image: "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
        prefill:
        {
          email: "gaurav.kumar@example.com",
          contact: +919900000000,
        },
        
        handler: function (response) {
          toast.success(`Payment Success. PaymentID:${response.razorpay_payment_id}`);
        },
      };
    // var rzp1 = new Razorpay(options);
      var pay = new window.Razorpay(options);
      pay.open();
  }
  return (
    <div className="App">
        <p onClick={handleSubmit} className='m-0 align-middle'><i className="fa-solid fa-check-double me-2"></i>Make Payment!</p>
    </div>
  );
}

export default Payment;