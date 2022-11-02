import classNames from 'classnames/bind';
import styles from './HeaderChat.module.scss';
import Button from '../Button';
import { useRef } from 'react';
//icon

import { FaSearch, FaCaretDown } from 'react-icons/fa';
//component
import { ConfigRouter } from '~/config';
//
import { auth } from '~/LoginWith/config';
import { AuthContext } from '~/Context/AuthProvider';
import { useContext } from 'react';
const cx = classNames.bind(styles);

function Header() {
    const choose = useRef();
    const handleInfor = () => {
        if (choose.current.style.display === 'inline-block') {
            choose.current.style.display = 'none';
        } else {
            choose.current.style.display = 'inline-block';
        }
    };
    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);
    const handlelogout=()=>{
        auth.signOut(); 
    }
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('logo')}></div>
                <div className={cx('search-box')}>
                    <input className={cx('search-input')} placeholder="Tìm kiếm" name="timkiem" />
                    <button className={cx('btn-search')}>
                        <FaSearch className={cx('search-icon')} />
                    </button>
                </div>
                <div className={cx('account')}>
                    <div className={cx('img')}>
                        <img src={photoURL}></img>
                    </div>
                    <div className={cx('username')} onClick={handleInfor}>
                        <FaCaretDown />
                        <div className={cx('infor-username')} ref={choose}>
                            <ul className={cx('option')}>
                                <li>
                                    <h2 className={cx('name')}>{displayName}</h2>
                                </li>
                                <li>
                                    <Button className={cx('item-option')}>Hồ sơ của bạn</Button>
                                </li>
                                <li>
                                    <Button className={cx('item-option')}>Cài đặt</Button>
                                </li>
                                <li>
                                    <Button
                                        className={cx('item-option')}
                                        to={ConfigRouter.Home}
                                        onClick={handlelogout}
                                    >
                                        Đăng xuất
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
