import classNames from 'classnames/bind';
import styles from './settingChat.module.scss';
import images from '~/asset/images';
import react, { forwardRef } from 'react';
import { AppContext } from '~/Context/AppProvider';

const cx = classNames.bind(styles);

function settingChat(props, ref) {
    const { roomid, rooms } = react.useContext(AppContext);
    const selectedRoom = react.useMemo(() => {
        return rooms.find((room) => {
            if (room.id === roomid) {
                return room;
            }
        });
    }, [rooms, roomid]);
    return (
        <div className={cx('wrapper')} ref={ref}>
            <header className={cx('header')}>
                <h2>Thông tin hội thoại</h2>
            </header>
            <div className={cx('user')}>
                <div className={cx('img')}>
                    <img src={images.connect}></img>
                </div>
                <div className={cx('infor-chat')}>
                    <h2>{selectedRoom === undefined ? '' : selectedRoom.name}</h2>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(settingChat);
