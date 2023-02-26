import React, { useState, useEffect } from 'react';
import { Button, Form, Input, List } from "antd";
import { getAmenities } from '../utils';
import AmenityCard from './AmenityCard';

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [amenityList, setAmenityList] = useState([]);
  const [loadingAmenities, setLoadingAmenties] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the reservation data to your backend
    console.log(`Name: ${name}`);
    console.log(`Date: ${date}`);
    console.log(`Number of guests: ${numberOfGuests}`);
  };

  useEffect(() => {
    setLoadingAmenties(true);
    getAmenities()
      .then((data) => {
        setAmenityList(data);
      })
      .finally(() => {
        setLoadingAmenties(false);
      });
  }, []);

  return (
    <>
      <Button style={{margin: '50px'}}>My Reservation</Button>
      <div style={{marginLeft: '50px'}}>
        {amenityList.map(amenity => (
          <AmenityCard
            key={amenity.id}
            amenity={amenity}
          />
        ))}
    </div>
    </>
  );
};

export default ReservationForm;