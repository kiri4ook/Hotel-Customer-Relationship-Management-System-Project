import React, { useState } from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import CheckInButton from '../../components/check-in/CheckInButton';
import './style.scss';

const CheckInModal = ({ visible, onClose, roomId, onUpdateGuest }) => {
    const [guestName, setGuestName] = useState('');
    const [dateCheckout, setDateCheckout] = useState('');
    const [checkInError, setCheckInError] = useState(false);

    const handleFormSubmit = () => {
        if (!guestName) {
            setCheckInError(true);
        } else {
            setCheckInError(false);
            onUpdateGuest(guestName);
            onClose();
            console.log(dateCheckout)
        }
    };

    return (
        <div className={`check-in-modal ${visible ? 'visible' : ''}`}>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2>Check In</h2>
                    <Button className='close-btn' onClick={() => onClose()}>
                        <CloseOutlined className='close-icon' />
                    </Button>
                </div>
                <hr className="horizontal-line" />
                <Form
                    layout="vertical"
                    onFinish={handleFormSubmit}
                >
                    <Form.Item
                        label="Please enter the guest's name:"
                        name="guest name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the guest's name!",
                            },
                        ]}>
                        <Input id="guestNameInput"
                            className='input guest-name-input'
                            type="text"
                            placeholder="Guest Name"
                            value={guestName}
                            prefix={<UserOutlined />}
                            onChange={(e) => setGuestName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Please, enter the approximate date of guest checkout:">
                        <DatePicker
                            className='date-picker'
                            id="approximateDateInput"
                            onChange={(date) => setDateCheckout(date)}
                            format="DD-MM-YYYY"
                            readOnly
                        />
                    </Form.Item>
                    <hr className="horizontal-line" />
                    <div className="modal-buttons">
                        <Button className="button cancel" onClick={onClose} >
                            <strong>Cancel</strong>
                        </Button>
                        <CheckInButton
                            roomId={roomId}
                            guestName={guestName}
                            onClose={onClose}
                            onUpdateGuest={onUpdateGuest}
                            disabled={checkInError}
                            checkOutDate={dateCheckout} />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CheckInModal;

