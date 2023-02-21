import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { RequestLogin, RequesetVeryCode } from '../../api'
import { useNavigate } from 'react-router-dom'
import sha256 from 'js-sha256'
import { useDispatch } from 'react-redux'
import { saveAccount } from '../../store/slice/account'

export default function Index() {
    const [verfyCode, setVerifyCode] = useState()
    const [count, setCount] = useState(0)
    // 定义form对象
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        bindVerifyCode()
        onInitRember()
    }, [])

    /**
     * 初始化记住密码信息
     */
    const onInitRember = () => {
        let remberMessage = localStorage.getItem('REMBER-ACCOUNT')

        if (remberMessage) {
            // 获取密码信息
            remberMessage = JSON.parse(remberMessage)
            // 设置表单输入框内容
            form.setFieldsValue({
                username: remberMessage.username,
                password: remberMessage.password,
                confirmPassword: remberMessage.password,
            })
        }
    }

    /**
     * 登录表单提交事件
     * @param {*} value
     */
    const onFinish = value => {
        // 判断是否三次出错，三次出错先检验 验证码，否则直接登录
        if (count >= 3) {
            // 校验验证码
            if (value.verifycode === sessionStorage.getItem('VERIFY_CODE')) {
                // 调用登录
                bindLogin(value)
            } else {
                message.warning('验证码出错!')
            }
        } else {
            // 调用登录
            bindLogin(value)
        }
    }

    /**
     * 登录接口
     */
    const bindLogin = async formAccount => {
        // 加密密码
        const password = sha256(formAccount.password)
        const data = await RequestLogin(formAccount.username, password)
        const { resultCode, resultInfo } = data
        //登录成功
        if (resultCode === 1) {
            // 保存用户信息
            bindAccount(resultInfo)
            // 保存密码信息
            saveRemberMessage(formAccount)
            // 跳转到主界面
            navigate('/home', { replace: true })
        } else {
            // 账户出错更新count
            setCount(count + 1)
            message.error('账户出错！')
        }
    }
    /**
     * 保存用户信息用于主界面显示
     */
    const bindAccount = ({ nick, headerimg, m_id, role_id }) => {
        const account = { nick, url: headerimg, mId: m_id, roleId: role_id }
        dispatch(saveAccount(account))
    }

    /**
     * 记住密码
     */
    const saveRemberMessage = formAccount => {
        // 判断是否购物勾选记住密码
        if (formAccount.remember) {
            localStorage.setItem(
                'REMBER-ACCOUNT',
                JSON.stringify({
                    username: formAccount.username,
                    password: formAccount.password,
                })
            )
        } else {
            localStorage.removeItem('REMBER-ACCOUNT')
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
                <Form
                    form={form}
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
                            placeholder="用户名"
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
                            placeholder="密码"
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
                            placeholder="确认密码"
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
