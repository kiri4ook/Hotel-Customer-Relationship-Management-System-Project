import React from 'react';
import { Layout, Space } from 'antd';
import './style.scss';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => (
    <Space className='Space' direction="vertical" size={[0, 48]}>
        <Layout>
            <Header className='layout-header'>Header</Header>
            <Content className='layout-content'>{children}</Content>
        </Layout>
    </Space>
);
export default MainLayout;