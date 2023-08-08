export const UPDATE_ROOM_GUEST = 'UPDATE_ROOM_GUEST';

export const updateRoomGuest = (roomId, guest) => {
    return {
        type: 'UPDATE_ROOM_GUEST',
        payload: { roomId, guest },
    };
};