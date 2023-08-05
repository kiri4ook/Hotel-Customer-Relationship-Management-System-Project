import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { loginSuccess } from '../../store/actions/authActions';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import db from '../../firebaseConfig';


const AuthorizationPage = ({ setAuthorized }) => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [form] = Form.useForm();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const storedCredentials = localStorage.getItem('rememberedCredentials');
        if (storedCredentials) {
            const { username, password, remember } = JSON.parse(storedCredentials);
            if (remember) {
                setRememberMe(true);
                form.setFieldsValue({ username, password });
            }
        }


        const fetchUser = async () => {
            try {
                const snapshot = await db.ref('Hotel DB/Accounts').once('value');
                const dataFromFirebase = snapshot.val();
                setUser(dataFromFirebase);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchUser();
    }, [form]);



    const onFinish = (values) => {
        console.log('Success:', values);
        const { username, password } = values;
        const userData = user[username];
        if (userData && userData.password === password) {
            setAuthorized(true);
            if (rememberMe) {
                localStorage.setItem('rememberedCredentials', JSON.stringify({ username, password, remember: true }));
            } else {
                localStorage.removeItem('rememberedCredentials');
            }
            navigate('/home');
        } else {
            setLoginError(true);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='form-wrapper'>
            <Form
                form={form}
                name="basic"
                className='form'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: rememberMe,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    className='form-item'
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input className='form-input' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password className='form-input' />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    {loginError && <div className='login-error-message'>Пользователь не найден</div>}
                    <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthorized: (isAuthorized) => {
            dispatch(loginSuccess(isAuthorized));
        },
    };
};

export default connect(null, mapDispatchToProps)(AuthorizationPage);

