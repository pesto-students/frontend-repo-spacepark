import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, differenceInMinutes } from 'date-fns';
import { useAtom } from 'jotai';
import { time } from '../../atom';

const DateTimePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [error, setError] = useState('');
  const [, setTimeDuration] = useAtom(time);

  useEffect(() => {
    if (startDate && endDate && checkInTime && checkOutTime) {
      setTimeDuration({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        checkInTime: formatTime(checkInTime),
        checkOutTime: formatTime(checkOutTime),
      });
    }
  }, [startDate, endDate, checkInTime, checkOutTime, setTimeDuration]);

  const formatDate = (date) => (date ? format(date, 'dd/MM/yyyy') : null);
  const formatTime = (time) => (time ? format(time, 'HH:mm') : null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date >= endDate) {
      setEndDate(null);
    }
    setCheckInTime(null);
    setCheckOutTime(null);
    setError('');
    onChange({ startDate: formatDate(date), endDate: formatDate(endDate), checkInTime: formatTime(checkInTime), checkOutTime: formatTime(checkOutTime) });
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
      setCheckOutTime(null);
      setError('');
      onChange({ startDate: formatDate(startDate), endDate: formatDate(date), checkInTime: formatTime(checkInTime), checkOutTime: formatTime(checkOutTime) });
    } else {
      setError('End date must be greater than or equal to the start date.');
    }
  };

  const handleCheckInTimeChange = (time) => {
    const now = new Date();
    const isToday = startDate && formatDate(startDate) === formatDate(now);
  
    if (isToday && (time.getHours() < now.getHours() || (time.getHours() === now.getHours() && time.getMinutes() <= now.getMinutes()))) {
      setError('Check-in time must be greater than the current time.');
      return;
    }
  
    setCheckInTime(time);
    setError('');
    onChange({ startDate: formatDate(startDate), endDate: formatDate(endDate), checkInTime: formatTime(time), checkOutTime: formatTime(checkOutTime) });
  };
  
  const handleCheckOutTimeChange = (time) => {
    const now = new Date();
    const isToday = endDate && formatDate(endDate) === formatDate(now);
  
    if (isToday && (time.getHours() < now.getHours() || (time.getHours() === now.getHours() && time.getMinutes() <= now.getMinutes()))) {
      setError('Check-out time must be greater than the current time.');
      return;
    }
  
    if (startDate && endDate && formatDate(startDate) === formatDate(endDate)) {
      const checkInDateTime = new Date(startDate.getTime() + checkInTime.getHours() * 3600000 + checkInTime.getMinutes() * 60000);
      const checkOutDateTime = new Date(endDate.getTime() + time.getHours() * 3600000 + time.getMinutes() * 60000);
      const minutesDifference = differenceInMinutes(checkOutDateTime, checkInDateTime);
      if (minutesDifference < 60) {
        setError('Check-out time must be at least 1 hour after check-in time.');
        return;
      }
    } else if (startDate && endDate) {
      const checkInDateTime = new Date(startDate.getTime() + checkInTime.getHours() * 3600000 + checkInTime.getMinutes() * 60000);
      const checkOutDateTime = new Date(endDate.getTime() + time.getHours() * 3600000 + time.getMinutes() * 60000);
      const minutesDifference = differenceInMinutes(checkOutDateTime, checkInDateTime);
      if (minutesDifference < 60 || checkOutDateTime.getTime() < checkInDateTime.getTime()) {
        setError('Check-out time must be at least 1 hour after check-in time and within the same day.');
        return;
      }
    }
  
    setCheckOutTime(time);
    setError('');
    onChange({ startDate: formatDate(startDate), endDate: formatDate(endDate), checkInTime: formatTime(checkInTime), checkOutTime: formatTime(time) });
  };
  
  

  return (
    <div className="d-flex flex-column">
      <div className='d-flex'>
        <div className='mr-10'>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            isClearable
            className='field-val'
            placeholderText="Select start date"
          />
        </div>
        <div>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            minDate={startDate || new Date()}
            isClearable
            className='field-val'
            placeholderText="Select end date"
          />
        </div>
      </div>
      <div className='d-flex mt-3'>
        <div className='mr-10'>
          <DatePicker
            selected={checkInTime}
            onChange={handleCheckInTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Check-In Time"
            dateFormat="HH:mm"
            className='field-val'
            placeholderText="Select check-in time"
          />
        </div>
        <div>
          <DatePicker
            selected={checkOutTime}
            onChange={handleCheckOutTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Check-Out Time"
            dateFormat="HH:mm"
            className='field-val'
            placeholderText="Select check-out time"
          />
        </div>
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default DateTimePicker;
