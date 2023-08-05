import React, { useEffect, useState } from 'react';
import './style.scss';
import db from '../../firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';

const RoomPage = () => {
    const [room, setRoom] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const { roomId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await db.ref('Hotel DB/Rooms').once('value');
                const dataFromFirebase = snapshot.val();
                const selectedRoom = dataFromFirebase[roomId];
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

    return (
        <>
            {room && (
                <div className="page-wrapper">
                    <div className='room-header'>
                        <button className='back-button' onClick={handleBackHome}>Back Home</button>
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
                                <button className='check-in-button'>Check In</button>
                                <button className='check-out-button'>Check Out</button>
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
                </div>
            )}
        </>

    );
}
export default RoomPage;

