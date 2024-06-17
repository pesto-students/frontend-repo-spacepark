import React, {useState} from 'react';
import { Button } from 'reactstrap';
import { time } from '../atom';
import { activeSpace } from '../atom';
import { parkingSpacesAtom } from './SearchComponent';
import { useAtom } from 'jotai';


function Payment({ formData, dateTimeRange, isSuccess, isFormValid }) {

  const parkingSpaces = useAtom(parkingSpacesAtom);
  const activeSpaces = useAtom(activeSpace);
  const timeS = useAtom(time);

  const [data, setData] = useState({});
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
      console.log(orderData, 'Data');
      const options = {
        key: 'rzp_test_Iq1MeTmgm2QwEg',
        amount: orderData.price,
        currency: "INR",
        name: 'Spacepark',
        description: 'Booking Transaction',
        order_id: orderData.orderID,
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: () => alert('Payment process was cancelled')
        },
        handler: function (response) {
          // Handle successful payment here
          // isSuccess(true);
          updatePayment(response, orderData.orderID, 'success');
          createTicket(formData, dateTimeRange); // Call the createTicket function
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error('Payment failed', response);
        // setError(true);
        logFailedPayment(response, orderData.orderID, 'failure');
      });
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment');
    }
  };

  const updatePayment = async (response, orderId, status) => {
    try {
      const data = await fetch('http://localhost:8000/api/payment/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: orderId,
          status: status,
          response: response,
        })
      });
      setData(data);
    } catch (error) {
      console.error('Error logging payment:', error);
      alert('Error logging payment');
    }
  };

  const logFailedPayment = async (response, orderId, status) => {
    try {
      await fetch('http://localhost:8000/api/payment/log-failed-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          status: status,
          response: response,
        })
      });
    } catch (error) {
      console.error('Error logging payment:', error);
      alert('Error logging payment');
    }
  };

  const createTicket = async (formData, dateTimeRange) => {
    console.log(data, 'Data', formData, dateTimeRange, activeSpaces, parkingSpaces, timeS);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}api/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: data.userId,
          paymentId:data.data.id,
        
          status:'booked',
          parkingSpaceId: activeSpace,
          dateRange: dateTimeRange,
        })
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Error creating ticket');
    }
  };

  return (
    <div>
      <Button 
        onClick={handlePayment} 
        className='back-color text-bold w-100 p-2 f-20'
        disabled={!isFormValid} // Disable the button if the form is not valid
      >
        Proceed to payment
      </Button>
    </div>
  );
}

export default Payment;
