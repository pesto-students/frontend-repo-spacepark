import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from 'reactstrap';
import { format } from 'date-fns';
import { useAtom } from 'jotai';
import { time } from '../../atom';

const DateTimePicker = ({ onChange }) => {
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [timeDuration, setTimeDuration] = useAtom(time); // Default duration of 1 hour

  const formatDate = (date) => {
    return date ? format(date, 'dd/MM/yyyy') : null;
  };

  const handleStartDateTimeChange = (date) => {
    setStartDateTime(date);
    onChange({ startDateTime: formatDate(date), endDateTime: formatDate(endDateTime) });
  };

  const handleEndDateTimeChange = (date) => {
    if (date >= startDateTime) {
      setEndDateTime(date);
      onChange({ startDateTime: formatDate(startDateTime), endDateTime: formatDate(date) });
    } else {
      alert('End date must be greater than or equal to the start date.');
    }
  };

  const handleTimeDurationChange = (e) => {
    setTimeDuration(e.val);
    // onChange({ startDateTime: formatDate(startDateTime), endDateTime: formatDate(endDateTime) });
  };

  return (
    <div className="d-flex flex-column">
      <div className='d-flex'>
        <div className='mr-10'>
          <DatePicker
            selected={startDateTime}
            onChange={handleStartDateTimeChange}
            showTimeSelect
            dateFormat="Pp"
            isClearable
            className='field-val'
            placeholderText="Select start date"
          />
        </div>
        <div>
          <DatePicker
            selected={endDateTime}
            onChange={handleEndDateTimeChange}
            showTimeSelect
            dateFormat="Pp"
            minDate={startDateTime}
            isClearable
            className='field-val'
            placeholderText="Select end date"
          />
        </div>
      </div>
      {startDateTime && endDateTime && startDateTime.toDateString() === endDateTime.toDateString() && (
        <div>
          <label className='fs-20 my-3'>Time Duration (hours):</label>
          <Input
            type="number"
            min={1}
            className='field-val'
            value={timeDuration}
            onChange={handleTimeDurationChange}
          />
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
