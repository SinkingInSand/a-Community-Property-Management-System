/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, Input, List } from "antd";
import { getAmenities } from '../utils';
import AmenityCard from './AmenityCard';
import ReservationDialog from './ReservationDialog';

const { Title } = Typography;

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [amenityList, setAmenityList] = useState([]);
  const [loadingAmenities, setLoadingAmenties] = useState(false);
  const [reservationVisible, setReservationVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the reservation data to your backend
    console.log(`Name: ${name}`);
    console.log(`Date: ${date}`);
    console.log(`Number of guests: ${numberOfGuests}`);
  };
  
  // eslint-disable-next-line no-unused-vars
  const handleReservationClick = () => {
    setReservationVisible(true);
  };

  const handleReservationClose = () => {
    setReservationVisible(false);
  };
  useEffect(() => {
    setLoadingAmenties(true);
    getAmenities()
      .then((data) => {
        data[0].imageUrl = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80";
        data[1].imageUrl = "https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";
        data[2].imageUrl = "https://images.unsplash.com/photo-1500130695625-8aa9b575c62a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80";
        data[3].imageUrl = "https://images.unsplash.com/photo-1523139348426-081681667818?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";
        setAmenityList(data);
      })
      .finally(() => {
        setLoadingAmenties(false);
      });
  }, []);

  return (
    <>
      <Title level={3}>Reservation:</Title>
      <ReservationDialog
        visible={reservationVisible}
        onClose={handleReservationClose}
      />
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