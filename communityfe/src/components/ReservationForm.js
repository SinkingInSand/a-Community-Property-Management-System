import React, { useState } from 'react';
import { Button, Form, Input } from "antd";

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the reservation data to your backend
    console.log(`Name: ${name}`);
    console.log(`Date: ${date}`);
    console.log(`Number of guests: ${numberOfGuests}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Name:
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date:
        <Input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Number of guests:
        <Input
          type="text"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
      </label>
      <br />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ReservationForm;