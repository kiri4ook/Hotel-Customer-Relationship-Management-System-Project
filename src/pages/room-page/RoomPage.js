import React, { useEffect, useState } from 'react';
import './style.scss';
import db from '../../firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import CheckInModal from '../../components/check-in/CheckInModal';
import CheckOutModal from '../../components/check-out/CheckOutModal';
import { Button } from 'antd';
import { HomeTwoTone } from '@ant-design/icons';
import moment from 'moment';

const RoomPage = () => {
    const [room, setRoom] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [isCheckInModalVisible, setIsCheckInModalVisible] = useState(false);
    const [isCheckOutModalVisible, setIsCheckOutModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await db.ref('Hotel DB/Rooms').once('value');
                const dataFromFirebase = snapshot.val();
                const selectedRoom = dataFromFirebase[roomId];
                if (selectedRoom && selectedRoom.checkOutDate) {
                    const checkOutDate = moment(selectedRoom.checkOutDate, 'DD-MM-YYYY');
                    const currentDate = moment();

                    if (checkOutDate.isSameOrBefore(currentDate, 'day')) {
                        const updatedRoom = { ...selectedRoom, guest: '' };
                        setRoom(updatedRoom);
                    }
                }

                setRoom(selectedRoom);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [roomId]);

    const handleBackHome = () => {
        navigate('/home');
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.gallery.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? room.gallery.length - 1 : prevIndex - 1
        );
    };

    const handleUpdateGuest = (updatedGuestData) => {
        const updatedRoom = { ...room, guest: updatedGuestData };
        setRoom(updatedRoom);
    };

    return (
        <>
            {room && (
                <div className="page-wrapper">
                    <div className='room-header'>
                        <Button className='back-button' onClick={handleBackHome}><HomeTwoTone /> Back Home</Button>
                    </div>

                    <div className="room-info">
                        <div className="room-data">
                            <div className='room-gallery'>
                                <img
                                    className="room-img"
                                    src={room.gallery[currentImageIndex]}
                                    alt={`Room ${currentImageIndex + 1}`}
                                />
                                <div className='gallery-buttons'>
                                    <button className='gallery-btn' onClick={handlePrevImage}>&#8249;</button>
                                    <button className='gallery-btn' onClick={handleNextImage}>&#8250;</button>
                                </div>
                            </div>
                            <div className='room-data-info'>
                                <h2 className='room-number'>Room {room.number}</h2>
                                <p><strong>Type:</strong> {room.type}</p>
                                <p><strong>Occupancy: </strong>{room.occupancy}</p>
                                <p><strong>Price:</strong> {room.price}$</p>
                                <p><strong>Guest:</strong> {room.guest}</p>
                            </div>
                        </div>
                        <div className="right-block-wrapper">
                            <div className='check-buttons'>
                                <button className={`check-in-button ${room.guest ? 'has-guests' : 'no-guests'}`} onClick={() => setIsCheckInModalVisible(true)}>Check In</button>
                                <button className={`check-out-button ${room.guest ? 'no-guests' : 'has-guests'}`} onClick={() => setIsCheckOutModalVisible(true)}>Check Out</button>
                            </div>
                            <div className='room-features'>
                                <p><strong>Features:</strong></p>
                                <ul>
                                    {room.features && room.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='room-description'>
                        <p><strong>Description: </strong></p>
                        <p className='description-text'> {room.description}</p>
                    </div>
                    <CheckInModal
                        visible={isCheckInModalVisible}
                        onClose={() => setIsCheckInModalVisible(false)}
                        roomId={roomId}
                        onUpdateGuest={handleUpdateGuest} />
                    <CheckOutModal
                        visible={isCheckOutModalVisible}
                        onClose={() => setIsCheckOutModalVisible(false)}
                        roomId={roomId}
                        numberRoom={room.number}
                        onUpdateGuest={handleUpdateGuest} />
                </div >

            )}


        </>

    );

}
export default RoomPage;

