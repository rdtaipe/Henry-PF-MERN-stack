
import axios from 'axios';

import {
    SET_STATE,
    GET_PRODUCTS,
    PRODUCT_DETAIL,
    CLEAR_DETAIL,
    PRODUCT_UPDATE,
    POST_PRODUCT,
    SEARCH,
    GET_CATEGORIES,
    GET_BRANDS,
    GET_COLORS,
    GET_ADMINS,
    GET_USERS,
    GET_PROFILE,
    GET_CURRENT_USER,
    UPDATE_USER,
    UPDATE_USER_ADM,
    POST_USER,
} from './types';

export function setState(value) {
    return {type:SET_STATE,payload:value}
}

//
////////////////////////////Products/////////////////////////////////////////
export function getProducts() {
    return async function (dispatch) {
        const allData = await axios.get('/products')
        return dispatch({ type: GET_PRODUCTS, payload: allData.data })
    }
}

export function getProductsAdmin() {
    return async function (dispatch) {
        const allData = await axios.get('/products')
        return dispatch({ type: GET_PRODUCTS_ADMIN, payload: allData.data })
    }
}

export function getProductDetail(id) {
    return async function (dispatch) {
        const productDetail = await axios.get(`/products/${id}`)
        return dispatch({
            type: PRODUCT_DETAIL,
            payload: productDetail.data,
        })
    }
}