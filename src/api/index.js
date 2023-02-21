import axiosInstance from '../utils/request.js'

/**
 * 登录接口
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
export const RequestLogin = (username,password) => {
    return axiosInstance({
        method: 'post',
        url: '/api/login',
        //post请求参数使用data选项, get参数 params选项
        data: {
            username,
            password,
        },
    })
}

/**
 * 验证码
 */
export const RequesetVeryCode = ()=>{
    return axiosInstance({
        method:'get',
        url:'api/verifyCode'
    })
}


/**
 * 产品列表
 * @returns 
 */
export const RequestShopList = ()=>{
    return axiosInstance({
        method:'get',
        url:'/api/shop',
    })
}

/**
 * 产品分类
 */
export const RequestCatgoryList = ()=>{
    return axiosInstance({
        method:'get',
        url:'/api/category'
    })
}

/**
 * 添加产品
 */
export const RequestAddGoods = (formData)=>{
    const token = localStorage.getItem('TOKEN')
    return axiosInstance({
        method:'post',
        url:'/api/shop/insert',
        headers: { 'Content-Type': 'multipart/form-data','Authorization':token },
        data:formData
    })
}