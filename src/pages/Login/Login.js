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
            alert('s??? ??i???n tho???i ho???c m???t kh???u kh??ng ch??nh x??c!!!');
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
                    <h1>????ng nh???p</h1>
                    <form className={cx('form')}>
                        <FaUser />
                        <input placeholder="S??? ??i???n tho???i" name="user" className={cx('phone')} /> <br></br>
                        <FaLock />
                        <input type="password" placeholder="M???t kh???u" name="pass" className={cx('pass')} />
                    </form>
                    <div className={cx('form-item')}>
                        <div>
                            <input type="checkbox" name="rem-login" />
                            <span> Nh??? m???t kh???u</span>
                        </div>
                        <a href="http://localhost:3000/resetpass" className={cx('forgetpass')}>
                            Qu??n m???t kh???u?
                        </a>
                    </div>
                    <Button
                        className={cx('btn-login')}
                        onClick={handlebtnLogin}
                        to={succ ? ConfigRouter.Chat : ConfigRouter.Login}
                    >
                        ????ng nh???p
                    </Button>
                    <div className={cx('social-login-label')}>
                        <div className={cx('label-or')}>
                            <div className={cx('line-left')}></div>
                            <span className={cx('label-text')}>????ng nh???p v???i</span>
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
                        <span>N???u ch??a c?? t??i kho???n?</span>
                        <a href="http://localhost:3000/signup" className={cx('signup')}>
                            ????ng k??
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
