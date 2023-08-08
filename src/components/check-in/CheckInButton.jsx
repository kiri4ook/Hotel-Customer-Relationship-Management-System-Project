import React from 'react';
import db from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { updateRoomGuest } from '../../store/actions/roomActions';
import moment from 'moment';

const CheckInButton = ({ roomId, guestName, onClose, onUpdateGuest, disabled, checkOutDate }) => {
    const dispatch = useDispatch();

    const handleCheckIn = () => {
        const todayDate = moment().format('D-M-YYYY');

        const checkOut = new Date(checkOutDate);
        const checkOutFormatted = `${checkOut.getDate()}-${checkOut.getMonth() + 1}-${checkOut.getFullYear()}`;

        db.ref(`Hotel DB/Rooms/${roomId}`).update({
            guest: guestName,
            checkInDate: todayDate,
            checkOutDate: checkOutFormatted
        });
        console.log(checkOutDate)
        dispatch(updateRoomGuest(roomId, guestName));
        onUpdateGuest(guestName);
        onClose();
    };

    return (
        <button className="checkIn" onClick={handleCheckIn} disabled={disabled}>
            <strong>Check In</strong>
        </button>
    );
};

export default CheckInButton;

