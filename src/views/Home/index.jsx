import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { plus } from '../../store/slice/counter'
import styles from './index.module.scss'
import { Button } from 'antd'

export default function Index() {
    const num = useSelector(state => state.counter.count)
    const dispatch = useDispatch()
    return (
        <div>
            <h2 className={styles['title']}>首页</h2>
            <p>num: {num}</p>
            <button
                onClick={() => {
                    dispatch(plus())
                }}
            >
                加一
            </button>

            <Button type="primary">Primary Button</Button>
        </div>
    )
}
