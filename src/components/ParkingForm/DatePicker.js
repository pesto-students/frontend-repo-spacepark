import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useAtom } from 'jotai';
import { time } from '../../atom';

const DateTimePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [, setTimeDuration] = useAtom(time); // Default duration of 1 hour

  useEffect(() => {
    // Update the time atom whenever any value changes
    if (startDate && endDate && checkInTime && checkOutTime) {
      setTimeDuration({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        checkInTime: formatTime(checkInTime),
        checkOutTime: formatTime(checkOutTime),
      });
    }
  }, [startDate, endDate, checkInTime, checkOutTime, setTimeDuration]);

  const formatDate = (date) => date ? format(date, 'dd/MM/yyyy') : null;
  const formatTime = (time) => time ? format(time, 'HH:mm') : null;

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date >= endDate) {
      setEndDate(null);
    }
    onChange({ startDate: formatDate(date), endDate: formatDate(endDate), checkInTime: formatTime(checkInTime), checkOutTime: formatTime(checkOutTime) });
  };

  const handleEndDateChange = (date) => {
    if (date > startDate) {
      setEndDate(date);
      onChange({ startDate: formatDate(startDate), endDate: formatDate(date), checkInTime: formatTime(checkInTime), checkOutTime: formatTime(checkOutTime) });
    } else {
      alert('End date must be greater than the start date.');
    }
  };

  const handleCheckInTimeChange = (time) => {
    setCheckInTime(time);
    onChange({ startDate: formatDate(startDate), endDate: formatDate(endDate), checkInTime: formatTime(time), checkOutTime: formatTime(checkOutTime) });
  };

  const handleCheckOutTimeChange = (time) => {
    setCheckOutTime(time);
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
            timeIntervals={15}
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
            timeIntervals={15}
            timeCaption="Check-Out Time"
            dateFormat="HH:mm"
            className='field-val'
            placeholderText="Select check-out time"
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
