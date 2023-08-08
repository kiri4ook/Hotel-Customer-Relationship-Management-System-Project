import React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CheckOutButton from '../../components/check-out/CheckOutButton';
import './style.scss';

const CheckOutModal = ({ visible, onClose, roomId, numberRoom, onUpdateGuest }) => {
    return (
        <div className={`check-out-modal ${visible ? 'visible' : ''}`}>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2>Check Out</h2>
                    <Button className='close-btn' onClick={() => onClose()}>
                        <CloseOutlined className='close-icon' />
                    </Button>
                </div>
                <hr className="horizontal-line" />
                <p className='check-out-text'>Do you confirm the check-out Room {numberRoom}?</p>
                <hr className="horizontal-line" />
                <div className="modal-buttons">
                    <Button className="button cancel" onClick={onClose}>
                        <strong>Cancel</strong>
                    </Button>
                    <CheckOutButton roomId={roomId} onClose={onClose} onUpdateGuest={onUpdateGuest} />
                </div>
            </div>
        </div>
    );
};

export default CheckOutModal;

