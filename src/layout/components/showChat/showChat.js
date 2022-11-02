import classNames from 'classnames/bind';
import styles from './showChat.module.scss';
import images from '~/asset/images';
import FirestoreUse from '~/hooks/useFirestore';
import { AuthContext } from '~/Context/AuthProvider';
import react, { useState } from 'react';
import { AppContext } from '~/Context/AppProvider';
const cx = classNames.bind(styles);
const time = '5 giờ';
function showChat() {
    //
    const {
        user: { photoURL, uid },
    } = react.useContext(AuthContext);
    const roomsCondition = react.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);
    const rooms = FirestoreUse('rooms', roomsCondition);
    const { setSelectedRoomId, selectedRoomId, setRoomid } = react.useContext(AppContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('option')}></div>
            {rooms.map((room) => (
                <div
                    key={room.id}
                    className={cx('infor-chat')}
                    onClick={() => {
                        setSelectedRoomId(room.id);
                        setRoomid(room.id);
                    }}
                >
                    <div className={cx('img')}>
                        <img src={photoURL}></img>
                    </div>
                    <div className={cx('gui-chat')}>
                        <h2>{room.name}</h2>
                        <p>{room.description}</p>
                    </div>
                    <div className={cx('time')}>
                        <p>{time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default showChat;
