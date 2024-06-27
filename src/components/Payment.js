import React, { useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { time } from '../atom';
import { activeSpace } from '../atom';
import store from 'store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { parkingSpacesAtom } from './SearchComponent';
import { useAtom } from 'jotai';
import moment from 'moment';

function Payment({ formData, dateTimeRange, isFormValid, setFormData }) {
  const parkingSpaces = useAtom(parkingSpacesAtom);
  const activeSpaces = useAtom(activeSpace);
  const timeS = useAtom(time);
  const [data, setData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true); // Set loading to true on button click

    const serviceId = parkingSpaces[0].filter(elem => elem.id === activeSpaces[0])[0].serviceId;

    const response = serviceId && await axios.get(`${process.env.REACT_APP_API_URL}api/services/${serviceId}`);
    const sumOfPrices = formData && formData.services.reduce((total, service) => {
      const matchingService = response && response.data.services.find(detail => detail.service === service);
      const startDateTime = moment(`${timeS[0].startDate} ${timeS[0].checkInTime}`, 'DD/MM/YYYY HH:mm');
const endDateTime = moment(`${timeS[0].endDate} ${timeS[0].checkOutTime}`, 'DD/MM/YYYY HH:mm');
const differenceInHours = endDateTime.diff(startDateTime, 'hours', true);

      const price = matchingService.service === 'carparking' 
  ? Math.ceil(parseFloat((matchingService.price / 24 )* differenceInHours)) 
  : Math.ceil(parseFloat(matchingService.price));

return matchingService ? total + price : total;

    }, 0);
    
    try {
      const response = sumOfPrices && await fetch(`${process.env.REACT_APP_API_URL}api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: sumOfPrices * 100,
          currency: 'INR',
          receipt: 'receipt#1',
          userId: store.get('user').id,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();
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
          ondismiss: () => {
            alert('Payment process was cancelled');
            setLoading(false); // Reset loading state on dismiss
          }
        },
        handler: async function (response) {
          const resp = await updatePayment(response, orderData.orderID, 'success');
          if (resp) {
            await createTicket(resp, sumOfPrices, formData, dateTimeRange, serviceId, orderData.userId);
          }
          setLoading(false); // Reset loading state on success
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error('Payment failed', response);
        logFailedPayment(response, orderData.orderID, 'failure');
        setLoading(false); // Reset loading state on failure
      });
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment');
      setLoading(false); // Reset loading state on catch
    }
  };

  const updatePayment = async (response, orderId, status) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}api/payment/verify-payment`, {
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

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      data && setData(data);
      return data;
    } catch (error) {
      console.error('Error logging payment:', error);
      alert('Error logging payment');
    }
  };

  const logFailedPayment = async (response, orderId, status) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}api/payment/log-failed-payment`, {
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

  const createTicket = async (response, price, formData, dateTimeRange, serviceId, userId) => {
    try {
      const res = data && await fetch(`${process.env.REACT_APP_API_URL}api/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...timeS[0],
          serviceId,
          price,
          userId,
          paymentId: response.data.id,
          status: 'booked',
          parkingSpaceId: activeSpaces[0],
        })
      });

      if (!res.ok) {
        throw new Error('Failed to create ticket');
      }

      setSuccessMessage('Ticket created successfully!');
      setTimeout(() => {
        navigate('/tickets');
      }, 3000);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };
console.log(!isFormValid, 'Is Form valid');

  return (
    <div>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <Button
        onClick={handlePayment}
        className='back-color text-bold w-100 p-2 f-20'
        disabled={!isFormValid || loading} // Disable the button if the form is not valid or if loading
      >
        {loading ? <Spinner size="sm" /> : 'Proceed to payment'} {/* Display loader when loading */}
      </Button>
    </div>
  );
}

export default Payment;
