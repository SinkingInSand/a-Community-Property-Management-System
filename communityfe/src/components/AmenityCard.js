import React from 'react';
import { Modal, DatePicker} from 'antd';
import moment from 'moment';
import { useState } from 'react';

function AmenityCard({ amenity }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleCardClick() {
    // get detail
    setIsModalVisible(true);
  }

  function handleModalCancel() {
    setIsModalVisible(false);
  }

  function handleDateChange(date, dateString) {
    setSelectedDate(dateString);
    // here
    
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
          <button key="done" onClick={handleModalCancel} style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>
            Done
          </button>,
        ]}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>{amenity.amenityName}</h2>
        <DatePicker
          style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }}
          format="YYYY/MM/DD"
          disabledDate={(current) => current && current < moment().endOf('day')}
          onChange={handleDateChange}
        />
      </Modal>
    </>
  );
}

export default AmenityCard;
