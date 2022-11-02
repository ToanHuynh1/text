import classNames from 'classnames/bind';
import styles from './messChat.module.scss';
import { UserAddOutlined } from '@ant-design/icons';
import images from '~/asset/images';
import styled from 'styled-components';
import { FaUserPlus, FaSearch, FaVideo, FaBars, FaPaperPlane, FaCcJcb } from 'react-icons/fa';
import React, { forwardRef, useMemo, useState } from 'react';
import { AppContext } from '~/Context/AppProvider';
import { AuthContext } from '~/Context/AuthProvider';
import { addDocument } from '~/Context/service';
import { Button, Tooltip, Avatar, Form, Input, Alert, Select, Spin, Modal } from 'antd';
import { db } from '~/LoginWith/config';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import StatusAvatar from '../Modals/status-avatar';
import { debounce } from 'lodash';

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 20px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin: 0;
            font-weight: bold;
        }

        &__description {
            font-size: 11px;
        }
    }
`;

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptinos] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadoptions = (value) => {
            setOptinos([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                setOptinos(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadoptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);

    return;
    <Select
        filterOption={false}
        labelInValue
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
    >
        {options.map((opt) => {
            <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                <Avatar size="small" src={opt.photoURL}>
                    {opt.photoURL ? ' ' : opt.label.charAt(0)?.toUpper}
                </Avatar>
                ;{`${opt.label}`}
            </Select.Option>;
        })}
    </Select>;
}

async function fetchUserList(search, curMembers) {
    return (
        db
            .collection('users')
            .where('keywords', 'array-contains', search?.toLowerCase())
            // .orderBy('displayName')
            .limit(20)
            .get()
            .then((snapshot) => {
                return snapshot.docs
                    .map((doc) => ({
                        label: doc.data().displayName,
                        value: doc.data().uid,
                        photoURL: doc.data().photoURL,
                    }))
                    .filter((opt) => !curMembers.includes(opt.value));
            })
    );
}
const cx = classNames.bind(styles);

function MessChat(props, ref) {
    const [form] = Form.useForm();

    const handleSetting = () => {
        document.getElementsByClassName(`${cx('wrapper')}`)[0].style.width = '80%';
    };
    const { roomid, rooms, members, selectedRoomId } = React.useContext(AppContext);
    const selectedRoom = React.useMemo(() => {
        return rooms.find((room) => {
            if (room.id === roomid) {
                console.log({ room });
                return room;
            }
        });
    }, [rooms, roomid]);
    //
    const {
        user: { displayName, photoURL, uid },
    } = React.useContext(AuthContext);
    //
    const [chat, setChat] = React.useState('');
    const handlesubmit = () => {
        addDocument('messages', {
            text: chat,
            uid,
            photoURL,
            displayName,
            idroom: roomid,
        });
        document.getElementsByClassName(`${cx('input-chat')}`)[0].value = '';
    };
    //
    const handleinputchange = (e) => {
        setChat(e.target.value);
    };
    //
    const [documents, setDocuments] = React.useState([]);
    let listchat = db.collection('messages');
    listchat = listchat.orderBy('createdAt', 'asc');
    listchat.where('idroom', '==', roomid);
    //
    React.useEffect(() => {
        onSnapshot(listchat, (snapshot) => {
            const chat = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(chat);
        });
    }, [roomid]);

    // console.log({ members });
    //documents.sort((documentA, documentB) => documentA.createdAt - documentB.createdAt);

    const showInvite = () => {
        document.getElementsByClassName('test')[0].style.display = 'block';
    };

    const handleOk = () => {
        document.getElementsByClassName('test')[0].style.display = 'none';

        // reset form value
        form.resetFields();
        setValue([]);

        // update members in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });
    };

    const handleCancel = () => {
        document.getElementsByClassName('test')[0].style.display = 'none';
    };

    const [value, setValue] = useState([]);

    return (
        <div className={cx('wrapper')}>
            {roomid ? (
                <div>
                    {' '}
                    <header className={cx('header-chat')}>
                        <div className={cx('img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-chat')}>
                            <h2>{selectedRoom === undefined ? '' : selectedRoom.name}</h2>
                            <p>Hoạt động</p>
                        </div>
                        <div className={cx('option')}>
                            <FaSearch className={cx('icon-option')} />
                            <FaVideo className={cx('icon-option')} />
                            <button className={cx('btnSetting')} ref={ref} onClick={props.onClick}>
                                <FaBars className={cx('icon-option')} onClick={handleSetting} />
                            </button>
                            <Button
                                type="text"
                                className={cx('icon-option')}
                                icon={<UserAddOutlined />}
                                onClick={showInvite}
                            >
                                Mời
                            </Button>

                            <div style={{ display: 'inline-block', position: 'relative' }}>
                                {
                                    <Avatar.Group size="small" maxCount={2}>
                                        {members.map((member) => (
                                            <StatusAvatar
                                                status="green"
                                                size={30}
                                                name={member.displayName}
                                                githubHandle={member.photoURL}
                                            />
                                        ))}
                                    </Avatar.Group>
                                }
                            </div>
                        </div>
                    </header>
                    <section className={cx('content-chat')}>
                        <div className={cx('show-mess')}>
                            {documents.map((mess) => (
                                <div key={mess.id} className={cx('item-mess', uid === mess.uid ? 'mychat' : '')}>
                                    <div className={cx('img')} style={{ width: '40px', height: '40px' }}>
                                        <img src={mess.photoURL}></img>
                                    </div>
                                    <p
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            padding: '5px 5px',
                                            borderRadius: '20px',
                                            fontSize: '18px',
                                            maxWidth: '600px',
                                        }}
                                    >
                                        {mess.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="test" style={{ display: 'none' }}>
                            <form form={form} layout="vertical">
                                <div>Mời thành viên</div>
                                <input
                                    // mode="multiple"
                                    name="search-user"
                                    label="Tên các thành viên"
                                    placeholder="Nhập tên thành viên"
                                    fetchOptions={fetchUserList}
                                    onChange={(newValue) => setValue(newValue)}
                                    style={{ width: '100%' }}
                                    curMembers={selectedRoom.members}
                                />

                                <Button className={cx('btn-ok')} onClick={handleOk}>
                                    OK
                                </Button>
                                {/* <Button className={cx('btn-ok')} onClick={handleCancel}>
                                Cancel
                            </Button> */}
                            </form>
                        </div>
                        <div className={cx('input-send')}>
                            <input
                                className={cx('input-chat')}
                                placeholder="Nhập nội dung tin nhắn"
                                name="content"
                                onChange={handleinputchange}
                            />

                            <FaPaperPlane className={cx('send')} onClick={handlesubmit} />
                        </div>
                    </section>
                </div>
            ) : (
                <Alert
                    message="Hãy chọn tin nhắn"
                    type="info"
                    showIcon
                    style={{ display: 'flex', margin: '10px', color: 'blue', fontSize: '18px' }}
                />
            )}
        </div>
    );
}

export default forwardRef(MessChat);
