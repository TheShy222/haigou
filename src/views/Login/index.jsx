import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { RequestLogin, RequesetVeryCode } from '../../api'
import { useNavigate } from 'react-router-dom'

export default function Index() {
    const [verfyCode, setVerifyCode] = useState()
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        bindVerifyCode()
    }, [])

    /**
     * 登录表单提交事件
     * @param {*} value
     */
    const onFinish = value => {
        if (count >= 3) {
            // 校验验证码
            if (value.verifycode === sessionStorage.getItem('VERIFY_CODE')) {
                // 调用登录
                bindLogin(value.username, value.password)
            } else {
                message.warning('验证码出错!')
            }
        } else {
            // 调用登录
            bindLogin(value.username, value.password)
        }
    }

    /**
     * 登录接口
     */
    const bindLogin = async (username, password) => {
        const data = await RequestLogin(username, password)
        const { resultCode, resultInfo } = data
        if (resultCode === 1) {
            // 跳转到主界面
            navigate('/home', { replace: true })
        } else {
            setCount(count + 1)
            message.error('账户出错！')
        }
    }
    /**
     * 获取验证码
     */
    const bindVerifyCode = async () => {
        const data = await RequesetVeryCode()
        const { resultCode, resultInfo } = data
        if (resultCode === 1) {
            //1.code保存到sessionStorage
            sessionStorage.setItem('VERIFY_CODE', resultInfo.code)
            //2.更新verfiyCode
            setVerifyCode(resultInfo.data)
        }
    }

    return (
        <div className={styles['g-container']}>
            <div className={styles['g-wrapper']}>
                <h2>嗨购电商后台</h2>
                <h2> {user.name}-{user.pass}</h2>
                <Form
                    className={styles['login-form']}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        offset: 2,
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    {/* 用户名 */}
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined
                                    className={styles['site-form-item-icon']}
                                />
                            }
                        />
                    </Form.Item>
                    {/* 密码 */}
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined
                                    className={styles['site-form-item-icon']}
                                />
                            }
                        />
                    </Form.Item>

                    {/* 确认密码 */}
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(
                                            new Error('两次输入的密码不相同!')
                                        )
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined
                                    className={styles['site-form-item-icon']}
                                />
                            }
                        />
                    </Form.Item>

                    {/* 记住密码 */}
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    {/* 验证码 */}
                    {count >= 3 ? (
                        <Form.Item
                            name="verifycode"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码!',
                                },
                            ]}
                        >
                            <Input
                                suffix={
                                    <span
                                        onClick={bindVerifyCode}
                                        dangerouslySetInnerHTML={{
                                            __html: verfyCode,
                                        }}
                                    ></span>
                                }
                            />
                        </Form.Item>
                    ) : null}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
