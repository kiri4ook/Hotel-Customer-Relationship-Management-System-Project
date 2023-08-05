import React, { useEffect, useState } from 'react';
import './style.scss';
import db from '../../firebaseConfig';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [showOnlyFreeRooms, setShowOnlyFreeRooms] = useState(false);
    const roomsPerPage = 10;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await db.ref('Hotel DB/Rooms').once('value');
                const dataFromFirebase = snapshot.val();
                setData(dataFromFirebase);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleСhooseRoom = (roomId) => {
        navigate(`/room/${roomId}`);
    };

    const columns = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Occupancy',
            dataIndex: 'occupancy',
            key: 'occupancy',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `${text}$`,
        },
        {
            title: 'Guest',
            dataIndex: 'guest',
            key: 'guest',
        },
        {
            title: '',
            key: 'action',
            render: (record) => (
                <button className='td-button' onClick={() => handleСhooseRoom(record.key)}>More information</button>
            ),
        },
    ];

    const handleCheckboxChange = (e) => {
        setShowOnlyFreeRooms(e.target.checked);
        setCurrentPage(1);
    };

    const updateDataSource = () => {
        let filteredRooms = data;
        if (showOnlyFreeRooms) {
            filteredRooms = data.filter(room => !room.guest);
        }

        const indexOfLastRoom = currentPage * roomsPerPage;
        const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
        const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

        return currentRooms.map((room, index) => ({
            key: index,
            number: room.number,
            type: room.type,
            occupancy: room.occupancy,
            price: room.price,
            guest: room.guest,
        }));
    };

    const dataSource = updateDataSource();
    const totalPages = Math.ceil(data.length / roomsPerPage);

    return (
        <div className='table-wrapper'>
            <div className='checkbox-wrapper'>
                <input type='checkbox' id='freeRoomsCheckbox' checked={showOnlyFreeRooms} onChange={handleCheckboxChange} />
                <label htmlFor='freeRoomsCheckbox'>Free rooms only</label>
            </div>
            <Table
                className='table'
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
            <div className="pagination">
                <button className='page-number page-button' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <div
                        key={index}
                        className={`page-number ${currentPage === index + 1 ? 'active-button' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
                <button className='page-number page-button' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    &gt;
                </button >
            </div>
        </div>
    );
}
export default MainPage;
