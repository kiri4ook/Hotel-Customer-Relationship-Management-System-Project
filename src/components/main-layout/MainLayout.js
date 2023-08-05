import React from 'react';
import { Layout, Space } from 'antd';
import './style.scss';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;


const MainLayout = ({ children, isLoggedIn, }) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate('/');
    };

    return (
        <Space className='Space' direction="vertical" size={[0, 48]}>
            <Layout>
                <Header className='layout-header'>
                    <div className="header-logo">
                        <img className="header-logo-img" src="/Hotel_favicon.png" alt="logo" />
                    </div>
                    {isLoggedIn && (
                        <button className="header-logOut" onClick={handleLogOut} type="primary">
                            <img className="header-user-icon" src='/user_icon.png' alt='user-icon'></img>
                            <p className="header-logout-text">Log Out</p>
                        </button>
                    )}
                </Header>
                <Content className='layout-content'>{children}</Content>
            </Layout>
        </Space>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isAuthorized,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);

