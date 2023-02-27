import React from 'react';
import { Modal, DatePicker, notification} from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { checkAvailability, makeReservation } from '../utils';

function AmenityCard({ amenity }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlot, setAvailableSlot] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(-1);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleCardClick() {
    // get detail
    setAvailableSlot([]);
    setSelectedSlot(-1);
    setIsModalVisible(true);
  }

  function handleModalCancel() {
    setIsModalVisible(false);
    setAvailableSlot([]);
    setSelectedSlot(-1);
  }

  function handleModalDone() {
    // alert(`You select ${selectedDate} and ${selectedSlot}`);
    makeReservation(amenity.id, selectedDate, selectedSlot + 1)
    .then((data) => {
      notification.success({
        message: 'Reservation Confirmed',
        description: 'Your reservation has been confirmed. Thank you!',
        duration: 2,
        placement: 'topCenter',
      });
      setIsModalVisible(false);
      setAvailableSlot([]);
    setSelectedSlot(-1);
    })
  }

  function handleDateChange(date, dateString) {
    setSelectedDate(dateString);
    checkAvailability(amenity.id, dateString)
      .then((data) => {
        setAvailableSlot(data);
        setSelectedSlot(-1);
      });
  }

  function handleSlotClick(index) {
    if (selectedSlot === index) {
      setSelectedSlot(-1);
    } else {
      setSelectedSlot(index);
    }
  }

  const cardStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '300px',
    height: '240px',
    margin: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',
    ...(isHovered && {
      transform: 'translateY(-5px)',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    }),
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        style={cardStyle}
      >
        <h2 style={{ fontSize: '16px', margin: '10px', fontWeight: 'bold', textAlign: 'center' }}>
          {amenity.amenityName}
        </h2>
        <img src={amenity.imageUrl} alt={amenity.amenityName} style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '100%' }} />
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <button key="done" onClick={handleModalDone} style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>
            Done
          </button>
        ]}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>{amenity.amenityName}</h2>
        <DatePicker
          style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }}
          format="YYYY-MM-DD"
          disabledDate={(current) => current && current < moment().endOf('day')}
          onChange={handleDateChange}
        />
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {availableSlot.map((slot, index) => {
          if (slot === 0) {
            const buttonStyle = {
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '5px 10px',
              margin: '5px',
              cursor: 'pointer',
            };
          if (selectedSlot === index) {
            buttonStyle.backgroundColor = 'green';
            buttonStyle.color = 'white';
            buttonStyle.borderColor = 'green';
          }
          return (
            <button key={index} style={buttonStyle} onClick={() => handleSlotClick(index)}>
              {moment().set('hour', 8).set('minute', 0).add(index, 'hours').format('h:mm A')}
            </button>
          );
          }
          return null;
          })}
        </div>
      </Modal>
    </>
  );
}

export default AmenityCard;
