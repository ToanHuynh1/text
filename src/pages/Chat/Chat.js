import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import Button from '~/layout/components/Button';

//icon
import { FaSearch, FaCaretDown, FaCommentDots, FaUser, FaUsers } from 'react-icons/fa';
//component
import images from '~/asset/images';
import { ConfigRouter } from '~/config';
import HeaderChat from '~/layout/components/HeaderChat';
import { useState, useRef, useEffect,useMemo,useContext } from 'react';
//
import ShowChat from '~/layout/components/showChat';
import MessChat from '~/layout/components/messChat';
import SettingCHat from '~/layout/components/settingChat';
import Friends from '~/layout/components/Friends';
import Group from '~/layout/components/Group';
const cx = classNames.bind(styles);
function Home() {
    const [tab, setTab] = useState(0);
    const chat = useRef();
    const friend = useRef();
    const group = useRef();
    const setting = useRef();
    const componentSetting = useRef();
    const tonggle = () => {
        if (tab === 0) {
            chat.current.style.display = 'block';
            friend.current.style.display = 'none';
            group.current.style.display = 'none';
        }
        if (tab === 1) {
            friend.current.style.display = 'block';
            group.current.style.display = 'none';
            chat.current.style.display = 'none';
        }
        if (tab === 2) {
            group.current.style.display = 'block';
            chat.current.style.display = 'none';
            friend.current.style.display = 'none';
        }
    };
    useEffect(() => {
        tonggle();
    }, [tab]);
    const handleSetting = () => {
        componentSetting.current.style.display === 'none'
            ? (componentSetting.current.style.display = 'block')
            : (componentSetting.current.style.display = 'none');
    };
    return (
        <div className={cx('wrapper')}>
            <HeaderChat />
            <div className={cx('content')}>
                <div className={cx('content-left')}>
                    <ul className={cx('option')}>
                        <li>
                            <FaCommentDots className={cx('icon-option')} onClick={() => setTab(0)} />
                        </li>
                        <li>
                            <FaUser className={cx('icon-option')} onClick={() => setTab(1)} />
                        </li>
                        <li>
                            <FaUsers className={cx('icon-option')} onClick={() => setTab(2)} />
                        </li>
                    </ul>
                </div>
                <div className={cx('content-right')}>
                    <div className={tab === 0 ? cx('active') : cx('tab-content')} ref={chat}>
                        <ShowChat className={cx('showchat')}></ShowChat>
                        <MessChat className={cx('messchat')} ref={setting} onClick={handleSetting}></MessChat>
                        <SettingCHat className={cx('settingchat')} ref={componentSetting}></SettingCHat>
                    </div>
                    <div className={tab === 1 ? cx('active') : cx('tab-content')} ref={friend}>
                        <Friends />
                    </div>
                    <div className={tab === 2 ? cx('active') : cx('tab-content')} ref={group}>
                        <Group />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
