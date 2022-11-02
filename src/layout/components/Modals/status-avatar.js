import React from 'react';
import Avatar from 'react-avatar';

const DEFAULT_STATUS_RATIO = 5;

export default function StatusAvatar(props) {
    const { status, statusRatio = DEFAULT_STATUS_RATIO, ...other } = props;
    const { size } = props;

    if (!status) return <Avatar {...other} />;

    const statusStyle = {
        border: '3px solid white',
        background: status,
        width: size / statusRatio,
        height: size / statusRatio,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: '100%',
    };

    return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
            <Avatar round={true} {...other} />
            <span style={statusStyle} />
        </div>
    );
}
