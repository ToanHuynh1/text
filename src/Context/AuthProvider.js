import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../LoginWith/config';
import { Spin } from 'antd';
import { ConfigRouter } from '~/config';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });
                setIsLoading(false);
                history(ConfigRouter.Chat);
                return;
            }

            // reset user info
            setUser({});
            setIsLoading(false);
            //history(ConfigRouter.Login);
        });

        // clean function
        return () => {
            unsubscibed();
        };
    }, [history]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
        </AuthContext.Provider>
    );
}
