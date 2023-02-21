import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login'
import Home from '../views/Home'
import { menuItems } from '../utils/menuData'

export default function Index() {
    const lazyLoad = path => {
        // lazy 作用: 根据路径返回组件对象
        const Comp = lazy(() => import(`../views/plateform/${path}`))
        return (
            <React.Suspense fallback={<>加载中...</>}>
                <Comp />
            </React.Suspense>
        )
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/home" element={<Home />}>
                    {menuItems.map(item => (
                        <Route key={item.key}>
                            {item.children.map(subItem => (
                                <Route
                                    key={subItem.key}
                                    path={subItem.key}
                                    element={lazyLoad(subItem.key)}
                                ></Route>
                            ))}
                        </Route>
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
