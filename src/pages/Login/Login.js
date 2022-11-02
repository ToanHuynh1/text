import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { ConfigRouter } from '~/config';
import Button from '~/layout/components/Button';
import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useMemo, useState, useEffect } from 'react';
//
import { addDocument, generateKeywords } from '~/Context/service';
import firebase, { auth, db } from '~/LoginWith/config';
import { onSnapshot } from 'firebase/firestore';
//component
import images from '~/asset/images';
const cx = classNames.bind(styles);
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
function Login() {
    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName),
            });
        }
    };
    const LoginCondition = useMemo(() => {
        var conditions = [
            {
                fieldName: 'phone',
                operator: '==',
                compareValue: '0123456789',
            },
            {
                fieldName: 'password',
                operator: '==',
                compareValue: 'dinhhieu',
            },
        ];
        return conditions;
    }, []);
    const [documents, setDocuments] = useState([]);
    const [succ, setSucc] = useState(false);
    useEffect(() => {
        let loginuser = db.collection('users');
        loginuser = loginuser.where(
            LoginCondition[0].fieldName,
            LoginCondition[0].operator,
            LoginCondition[0].compareValue,
        );
        loginuser = loginuser.where(
            LoginCondition[1].fieldName,
            LoginCondition[1].operator,
            LoginCondition[1].compareValue,
        );
        const unsubscribe = onSnapshot(loginuser, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(documents);
        });
        return unsubscribe;
    }, []);
    const handlebtnLogin = () => {
        if (documents != []) {
            setSucc(true);
        } else {
            alert('số điện thoại hoặc mật khẩu không chính xác!!!');
            setSucc(false);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-login')}>
                <img src={images.connect}></img>
            </div>
            <div className={cx('wrap-form-login')}>
                <div className={cx('form-login')}>
                    <h1>Đăng nhập</h1>
                    <form className={cx('form')}>
                        <FaUser />
                        <input placeholder="Số điện thoại" name="user" className={cx('phone')} /> <br></br>
                        <FaLock />
                        <input type="password" placeholder="Mật khẩu" name="pass" className={cx('pass')} />
                    </form>
                    <div className={cx('form-item')}>
                        <div>
                            <input type="checkbox" name="rem-login" />
                            <span> Nhớ mật khẩu</span>
                        </div>
                        <a href="http://localhost:3000/resetpass" className={cx('forgetpass')}>
                            Quên mật khẩu?
                        </a>
                    </div>
                    <Button
                        className={cx('btn-login')}
                        onClick={handlebtnLogin}
                        to={succ ? ConfigRouter.Chat : ConfigRouter.Login}
                    >
                        Đăng nhập
                    </Button>
                    <div className={cx('social-login-label')}>
                        <div className={cx('label-or')}>
                            <div className={cx('line-left')}></div>
                            <span className={cx('label-text')}>Đăng nhập với</span>
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
                    <div className={cx('con-signup')}>
                        <span>Nếu chưa có tài khoản?</span>
                        <a href="http://localhost:3000/signup" className={cx('signup')}>
                            Đăng ký
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
