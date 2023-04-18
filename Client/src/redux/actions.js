import axios from "axios";
import {
    SET_STATE,
    GET_PRODUCTS,
    PRODUCT_DETAIL,
    POST_PRODUCT,
    OPEN_FILTERS,
    ORDER_BY,
    FILTER,
    SEARCH,
    GET_BRANDS,
    BRAND_ELECT,
    GET_COLORS,
    GET_CATEGORIES,
  } from "./types";
  
  export function setter(value) {
    return { type: SET_STATE, payload: value };
  }
  
  //
  ////////////////////////////Products/////////////////////////////////////////
  export function getProducts() {
    return async function (dispatch) {
      const allData = await axios.get("/products");
      return dispatch({ type: GET_PRODUCTS, payload: allData.data });
    };
  }
  
  export function getProductDetail(id) {
    return async function (dispatch) {
      const productDetail = await axios.get(`/products/${id}`);
      return dispatch({
        type: PRODUCT_DETAIL,
        payload: productDetail.data,
      });
    };
  }
  
  export function createProduct(formData) {
      /*   console.log(formData.get('name'));
            console.log(formData.get('description'));
            console.log(formData.get('category'));
            console.log(formData.get('image'));
            console.log(formData.get('active'));
            console.log(formData.get('feactured'));
            console.log(formData.get('color'));
            console.log(formData.get('size')); */
    return async function (dispatch) {
          let response = await axios.post("http://localhost:5000/products/", formData);

           return dispatch({
           type: POST_PRODUCT,
           payload: response,     //esto llega al formulario y me deja manejar la respuesta 
      }); 
  

   } 
}
  ///////////////////Filters & Order/////////////////////////////////
  export function getOpenFilters(value) {
    return { type: OPEN_FILTERS, payload: value };
  }
  export function orderBy(order) {
    return { type: ORDER_BY, payload: order };
  }
  
  export function filter(fil) {
    return function (dispatch) {
      dispatch({ type: FILTER, payload: fil });
    };
  }
  export function search(query) {
    return {
      type: SEARCH,
      payload: query,
    };
  }
  export function getBrands() {
      return async function (dispatch) {
          const allData = await axios.get('/brand')
          return dispatch({ type: GET_BRANDS, payload: allData.data })
      }
  }
  export function getCategories() {
      return async function (dispatch) {
          const allData = await axios.get('/category')
          return dispatch({ type: GET_CATEGORIES, payload: allData.data })
      }
  }
  export function brandElect(brand) {
      return function (dispatch) {
          dispatch({ type: BRAND_ELECT, payload: brand })
      }
  }
  export function getColors() {
      return async function (dispatch) {
          const json = await axios.get('/colors')
          return dispatch({ type: GET_COLORS, payload: json.data })
      }
  }
  