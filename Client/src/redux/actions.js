import axios from "axios";
import store from "./store";
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
} from "./types";

export function setter(value) {
  var newState = store.getState()
  var action = { payload: value }

  const newReducer = (state, action) => {
    const { keys, value, only } = action.payload;

    const recursive = (obj, keys, value) => {
      if (!obj || !keys) return obj;

      const [currentKey, ...remainingKeys] = keys.split(".");
      const type = Object.prototype.toString.call(obj[currentKey]);

      if (type === "[object Array]") {
        const index = obj[currentKey].findIndex(item => item.id.toString() === remainingKeys[0]);
        if (index !== -1) {
          if (remainingKeys.length === 1) {
            const [newKeys, newValue] = [Object.keys(value)[0], Object.values(value)[0]];
            obj[currentKey] = only ? obj[currentKey].map((item, i) => {
              item[newKeys] = false;
              if (i === index) item[newKeys] = newValue;
              return item;
            }) : [{ ...obj[currentKey][index], ...value }, ...obj[currentKey].slice(index + 1)];
          } else recursive(obj[currentKey][index], remainingKeys.slice(1).join("."), value);
        }
      } else if (type === "[object Object]") {
        if (remainingKeys.length === 1) obj[currentKey][remainingKeys[0]] = value;
        else obj[currentKey] = remainingKeys.length ? recursive(obj[currentKey], remainingKeys.join("."), value) : value;
      }

      return obj;
    };


    if (keys.includes(".")) {
      var newState = { ...state };
      var mutation = recursive(newState, keys, value);
      return {
        ...state,
        ...mutation,
      }
    } else {
      return { ...state, [keys]: value };
    }

  }
  store.dispatch({ type: SET_STATE, payload: newReducer(newState, action) });

  return async (dispatch) => {
    return dispatch({ type: "REFRESH", payload: Math.random() })
  }
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


export function getColors() {
  return async function (dispatch) {
    const json = await axios.get('/colors')
    return dispatch({ type: GET_COLORS, payload: json.data })
  }

}
