import React, { useState, useEffect } from 'react';
import { Modal, Button, Spin, Table } from 'antd';
import { getReservations } from '../utils';

const ReservationDialog = ({ content }) => {
  const [reservations, setReservations] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    setLoading(true);
    getReservations()
      .then((data) => {
        setReservations(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'Reservation Date',
      dataIndex: 'reservationDate',
      key: 'reservationDate',
      render: (date) => formatDate(date),
    },
    {
      title: 'Time Slot',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
    },
  ];

  const formatDate = (date) => {
    const year = date.year;
    const month = date.monthValue.toString().padStart(2, '0');
    const day = date.dayOfMonth.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Button style={{margin: '50px'}} onClick={showModal}>
        My Reservation
      </Button>
      <Modal
        title="My Reservations"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        {loading ? (
          <Spin />
        ) : (
          <Table columns={columns} dataSource={reservations} />
        )}
      </Modal>
    </>
  );
};

export default ReservationDialog;
