import React, { useState } from 'react'
import { Layout, Dropdown, Space, Avatar, Menu } from 'antd'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    PoweroffOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useNavigate, Outlet } from 'react-router-dom'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import {menuItems} from '../../utils/menuData'

const { Header, Sider, Content } = Layout

export default function Index() {
    const [collapse, setCollapse] = useState(true)
    const navigate = useNavigate()
    const account = useSelector(state => state.account.account)

    // 个人中心下拉菜单数据
    const items = [
        {
            key: 'set',
            label: '个人设置',
            icon: <UserOutlined />,
        },
        {
            key: 'center',
            label: '个人中心',
            icon: <SettingOutlined />,
        },
        {
            key: 'exit',
            label: '退出登录',
            icon: <PoweroffOutlined />,
        },
    ]
    /**
     * 个人中心下拉菜单事件
     */
    const onClick = ({ key }) => {
        switch (key) {
            case 'set':
                break
            case 'center':
                break
            case 'exit':
                bindExit()
                break
            default:
        }
    }
    /**
     * 退出
     */
    const bindExit = () => {
        navigate('/login', { replace: true })
    }

   
    /**
     * 侧边栏菜单事件
     */
    const onMenuClick =({ item, key, keyPath, domEvent })=>{
        navigate(key)
    }

    return (
        <Layout className={styles['g-container']}>
            <Sider collapsed={!collapse}>
                <div className={styles['g-logo']}>
                    <img
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                        alt="logo"
                    />
                    {!collapse ? null : <span>嗨购电商后台</span>}
                </div>
                {/* 菜单列表 */}
                <Menu items={menuItems} theme="dark" mode="inline" onClick={onMenuClick} />
            </Sider>
            <Layout>
                {/* 头部区域 */}
                <Header className={styles['g-header']}>
                    {/* 收缩菜单 */}
                    <div
                        style={{ fontSize: '18px' }}
                        onClick={() => {
                            setCollapse(!collapse)
                        }}
                    >
                        {collapse ? (
                            <MenuFoldOutlined />
                        ) : (
                            <MenuUnfoldOutlined />
                        )}
                    </div>
                    {/* 个人中心 */}
                    <div>
                        <Dropdown menu={{ items, onClick }}>
                            <Space>
                                <Avatar
                                    src={<img src={account.url} alt="avatar" />}
                                />
                                <span>{account.nick}</span>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </div>
                </Header>
                <Content>
                    {/* 嵌套子路由 */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
