import React from 'react';

function Payment() {
  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 5000,
          currency: 'INR',
          receipt: 'receipt#1',
          userId: 1,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();

      const options = {
        key: 'rzp_test_Iq1MeTmgm2QwEg',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: orderData.id,
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '7887615719',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function () {
            alert('Payment process was cancelled');
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error('Payment failed', response);
        alert('Payment failed. Reason: ' + response.error.description);
        logFailedPayment(response, orderData.id);
      });
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment');
    }
  };

  const verifyPayment = async (response) => {
    try {
      const res = await fetch('http://localhost:8000/api/payment/pay/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Payment verification successful');
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Error verifying payment');
    }
  };

  const logFailedPayment = async (response, orderId) => {
    try {
      await fetch('http://localhost:8000/api/payment/log-failed-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          error: response.error,
        })
      });
    } catch (error) {
      console.error('Error logging failed payment:', error);
      alert('Error logging failed payment');
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
}

export default Payment;
