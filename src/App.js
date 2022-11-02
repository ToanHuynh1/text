import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layout/DefaultLayout';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';

function App() {
    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <AppProvider>
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = DefaultLayout;

                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </AppProvider>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
