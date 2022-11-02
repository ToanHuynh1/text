import classNames from 'classnames/bind';
import styles from './friends.module.scss';
import images from '~/asset/images';
import { FaUserPlus } from 'react-icons/fa';
import Button from '../Button';
const cx = classNames.bind(styles);
const time = '5 giờ';
function showChat() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('listfriend')}>
                <FaUserPlus className={cx('icon-friends')} />
                <h1>Danh sách bạn bè</h1>
            </header>
            <div className={cx('listaddfriend')}>
                <div className={cx('listadd-header')}>
                    <p>Lời mời kết bạn(2)</p>
                </div>
                <div className={cx('listadd-infor')}>
                    <div className={cx('infor')}>
                        <div className={cx('img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('inf')}>
                            <h2>Tấn Khoa</h2>
                            <p>Từ số điện thoại</p>
                        </div>
                    </div>
                    <div className={cx('option')}>
                        <Button className={cx('option-1')}>Xóa</Button>
                        <Button className={cx('option-2')}>Đồng ý</Button>
                    </div>
                </div>
                <div className={cx('listadd-infor')}>
                    <div className={cx('infor')}>
                        <div className={cx('img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('inf')}>
                            <h2>Tấn Khoa</h2>
                            <p>Từ số điện thoại</p>
                        </div>
                    </div>
                    <div className={cx('option')}>
                        <Button className={cx('option-1')}>Xóa</Button>
                        <Button className={cx('option-2')}>Đồng ý</Button>
                    </div>
                </div>
            </div>
            <div className={cx('friends')}>
                <h2 className={cx('title-listfriend')}>Danh sách bạn bè</h2>
                <div className={cx('friendslist')}>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default showChat;
