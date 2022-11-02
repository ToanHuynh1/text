import classNames from 'classnames/bind';
import styles from './Group.module.scss';
import images from '~/asset/images';
import styled from 'styled-components';
import { Collapse, Typography, Button } from 'antd';
import { AppContext } from '~/Context/AppProvider';
import { AuthContext } from '~/Context/AuthProvider';
import { PlusSquareOutlined } from '@ant-design/icons';
import { addDocument } from '~/Context/service';
import { Form, Modal, Input } from 'antd';
import React, { useContext } from 'react';
const cx = classNames.bind(styles);
const time = '5 giờ';
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header,
        p {
            color: black;
        }

        .ant-collapse-content-box {
            padding: 0 40px;
        }

        .add-room {
            color: black;
            padding: 0;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: black;
`;

export default function Group() {
    const { rooms, setIsModalOpen, setSelectedRoomId } = React.useContext(AppContext);

    const [form] = Form.useForm();

    const {
        user: { uid },
    } = useContext(AuthContext);

    const handleAddRoom = () => {
        console.log('Click');
        setIsModalOpen(true);
    };

    const showModal = () => {
        document.getElementsByClassName('test')[0].style.display = 'block';
    };

    const handleOk = () => {
        document.getElementsByClassName('test')[0].style.display = 'none';
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
        form.resetFields();
    };

    const handleCancel = () => {
        document.getElementsByClassName('test')[0].style.display = 'none';
    };

    return (
        <div className={cx('all-group')}>
            <Collapse>
                <Button type="text" icon={<PlusSquareOutlined />} className={cx('add-room')} onClick={showModal}>
                    Thêm phòng
                </Button>
            </Collapse>
            <Collapse ghost defaultActiveKey={['1']}>
                <PanelStyled header="Danh sách các phòng" key="1">
                    <div className={cx('row')}>
                        {rooms.map((room) => (
                            <div className={cx('col-1-5')} key={room.id}>
                                <LinkStyled
                                    className={cx('item-group-around')}
                                    key={room.id}
                                    onClick={() => setSelectedRoomId(room.id)}
                                >
                                    <img className={cx('img')} src={images.connect}></img>
                                    <div className={cx('group-name')}> {room.name}</div>
                                </LinkStyled>
                            </div>
                        ))}
                    </div>
                    {/* <Button type="text" icon={<PlusSquareOutlined />} className={cx('add-room')} onClick={showModal}>
                        Thêm phòng
                    </Button> */}
                    <div className={cx('add-group')}>
                        <Form form={form} layout="vertical" className="test" style={{ display: 'none' }}>
                            <Form.Item className={cx('add-name')} label="Tên phòng" name="name">
                                <Input className={cx('add-input-name')} placeholder="Nhập tên phòng" />
                            </Form.Item>
                            <Form.Item className={cx('add-des')} label="Mô tả" name="description">
                                <Input.TextArea className={cx('add-input-des')} placeholder="Nhập mô tả" />
                            </Form.Item>
                            <button onClick={handleOk}>OK</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </Form>
                    </div>
                </PanelStyled>
            </Collapse>
        </div>
    );
}
