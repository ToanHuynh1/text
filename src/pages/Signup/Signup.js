import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { ConfigRouter } from '~/config';
import Button from '~/layout/components/Button';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
//
import Avatar from 'react-avatar-edit';
import { addDocument } from '~/Context/service';
import firebase, { auth, db } from '../../LoginWith/config';
//
const cx = classNames.bind(styles);
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
function Signup() {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);
    const onClose = () => {
        setPreview(null);
    };
    const onCrop = (view) => {
        setPreview(view);
    };
    const createRandom = () => {
        var randomstring = '';
        var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
        for (var i, i = 0; i < 28; i++) {
            randomstring += characters.charAt(Math.floor(Math.random() * 28));
        }
        return randomstring;
    };
    //
    const [succ, setSucc] = useState(false);
    const handlesubmit = () => {
        if (
            document.getElementsByClassName(`${cx('pass')}`)[0].value ===
            document.getElementsByClassName(`${cx('repass')}`)[0].value
        ) {
            addDocument('users', {
                displayName: document.getElementsByClassName(`${cx('name')}`)[0].value,
                phone: document.getElementsByClassName(`${cx('phone')}`)[0].value,
                photoURL: preview,
                uid: createRandom(),
                providerId: 'phone',
                password: document.getElementsByClassName(`${cx('pass')}`)[0].value,
            });
            setSucc(true);
            alert('Đăng ký thành công');
        } else {
            setSucc(false);
            alert('Mật khẩu không trùng khớp');
        }
    };
    //
    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h1>Đăng ký</h1>
            <form className={cx('form-signup')}>
                <input placeholder="Tên người dùng" name="username" className={cx('name')} /> <br></br>
                <input placeholder="Số điện thoại" name="phone" className={cx('phone')} /> <br></br>
                <input type="password" placeholder="Mật khẩu" name="pass" className={cx('pass')} /> <br></br>
                <input type="password" placeholder="Xác nhận mật khẩu" name="re-pass" className={cx('repass')} />
                <div className={cx('avt')}>
                    <Avatar
                        height={150}
                        width={150}
                        onClose={onClose}
                        onCrop={onCrop}
                        src={src}
                        className={cx('previewavt')}
                        labelStyle={10}
                        label={'Ảnh đại diện'}
                    />
                    {preview && <img src={preview} style={{ border: '1px solid black', borderRadius: '50%' }} />}
                </div>
                <p>
                    Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của
                    chúng tôi.
                </p>
            </form>
            <Button className={cx('btn-signup')} onClick={handlesubmit} to={succ ? ConfigRouter.Login : ''}>
                Đăng ký
            </Button>
            <div className={cx('social-login-label')}>
                <div className={cx('label-or')}>
                    <div className={cx('line-left')}></div>
                    <span className={cx('label-text')}>Hoặc bạn có thể đăng ký với</span>
                    <div className={cx('line-right')}></div>
                </div>
                <div className={cx('icon-login')}>
                    <Button className={cx('face')} onClick={() => handleLogin(fbProvider)}>
                        <FaFacebook />
                    </Button>
                    <Button className={cx('goog')} onClick={() => handleLogin(googleProvider)}>
                        <FaGoogle />
                    </Button>
                </div>
            </div>
            <div className={cx('con-signin')}>
                <span>Nếu bạn đã có tài khoản?</span>
                <a href="http://localhost:3000/login" className={cx('signin')}>
                    Đăng nhập
                </a>
            </div>
        </div>
    );
}

export default Signup;
