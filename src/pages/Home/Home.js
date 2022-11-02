import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Button from '~/layout/components/Button';
import { ConfigRouter } from '~/config';
//component
import images from '~/asset/images';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('des')}>
                <div className={cx('dex-text')}>
                    <h1>Cuộc gọi và tin nhắn miễn phí và bảo mật đến mọi người, ở bất kỳ đâu</h1>
                    <h3>Duy trì các trò chuyện của bạn dù bạn ở bất kỳ đâu.</h3>
                    <Button to={ConfigRouter.Login} className={cx('btn-login')}>
                        Đăng nhập ngay
                    </Button>
                </div>
                <div className={cx('des-img')}>
                    <img src={images.connect}></img>
                </div>
            </div>
        </div>
    );
}

export default Home;
