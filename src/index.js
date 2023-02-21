import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
//如果引入antd样式出错误使用antd.min.css
import 'antd/dist/antd.min.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
