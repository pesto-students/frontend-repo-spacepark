// src/ServicePriceSelector.js
import React, {useState} from 'react';
import Select from 'react-select';
import { useAtom } from 'jotai';
import { selectedServicesAtom, servicePricesAtom } from '../../atom';
import './ServicePriceSelector.css'; // Optional: For custom styles

const serviceOptions = [
  { value: 'carparking', label: 'Car Park' },
  { value: 'carwashing', label: 'Car Wash' },
  { value: 'carcharging', label: 'Car Charging' },
];

const ServicePriceSelector = () => {
  const [selectedServices, setSelectedServices] = useAtom(selectedServicesAtom);
  const [servicePrices, setServicePrices] = useAtom(servicePricesAtom);
  const [errors, setErrors] = useState({});

  const handleServiceChange = (selectedOptions) => {
    const selected = selectedOptions || [];
    setSelectedServices(selected);

    // Remove prices for unselected services
    const newServicePrices = {};
    selected.forEach(service => {
      if (service.value in servicePrices) {
        newServicePrices[service.value] = servicePrices[service.value];
      }
    });
    setServicePrices(newServicePrices);

    validatePrices(newServicePrices);
  };

  const handlePriceChange = (service, price) => {
    const newPrices = {
      ...servicePrices,
      [service]: price
    };
    setServicePrices(newPrices);

    if (price.trim() === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [service]: 'Price is required'
      }));
    } else {
      setErrors(prevErrors => {
        const { [service]: removedError, ...rest } = prevErrors;
        return rest;
      });
    }

    validatePrices(newPrices);
  };

  const validatePrices = (prices) => {
    const newErrors = {};
    selectedServices.forEach(service => {
      if (!prices[service.value] || prices[service.value].trim() === '') {
        newErrors[service.value] = 'Price is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="service-price-selector">
      <div>
        <Select
          isMulti
          options={serviceOptions}
          value={selectedServices}
          onChange={handleServiceChange}
        />
      </div>
      {selectedServices.map(service => (
        <div key={service.value} className="service-price-input">
          <label  className='bold fs-20'>{service.label} Price:</label>
          <input
            className='padding-input'
            type="number"
            value={servicePrices[service.value]}
            onChange={(e) => handlePriceChange(service.value, e.target.value)}
            placeholder="Enter price"
          />
          {errors[service.value] && (
            <div className="error">{errors[service.value]}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServicePriceSelector;
