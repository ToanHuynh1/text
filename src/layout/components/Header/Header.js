import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import Button from '../Button';
//icon

import { VscAccount } from 'react-icons/vsc';
//component
import { ConfigRouter } from '~/config';
import images from '~/asset/images';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}></div>
            <div className={cx('login')}>
                <Button to={ConfigRouter.Login} className={cx('btn-login')}>
                    Đăng nhập
                </Button>
            </div>
            <div className={cx('signup')}>
                <Button to={ConfigRouter.Signup} className={cx('btn-signup')}>
                    Đăng ký
                </Button>
            </div>
        </div>
    );
}

export default Header;
