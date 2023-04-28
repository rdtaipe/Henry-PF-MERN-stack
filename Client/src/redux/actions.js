import axios from "axios";
import store from "./store";
import {SET_STATE,} from "./types";

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