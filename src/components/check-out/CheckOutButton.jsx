import React from 'react';
import db from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { updateRoomGuest } from '../../store/actions/roomActions';

const CheckOutButton = ({ roomId, onClose, onUpdateGuest }) => {
    const dispatch = useDispatch();

    const handleCheckOut = () => {
        db.ref('Hotel DB/Rooms/' + roomId).update({
            guest: '',
            checkOutDate: '',
            checkInDate: '',
        });

        dispatch(updateRoomGuest(roomId, ''));
        onUpdateGuest('');
        onClose();
    };

    return (
        <button className='confirm' onClick={handleCheckOut}>
            Confirm
        </button>
    );
};

export default CheckOutButton;

