import React, { useState, useEffect } from 'react';
import { Modal, Button, Spin, Table } from 'antd';
import { getReservations, deleteReservation } from '../utils';

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
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        ),
    },
  ];

  const formatDate = (date) => {
    const year = date.year;
    const month = date.monthValue.toString().padStart(2, '0');
    const day = date.dayOfMonth.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteReservation(id)
      .then(() => {
        // 删除该行记录
        setReservations(reservations.filter((r) => r.id !== id));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Button style={{ margin: '50px' }} onClick={showModal}>
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
