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
  UPDATE_SCORE,
} from "./types";
import { setter } from "./actions";
import { utils } from "./utils";

export var initialState = {
  products: [],
  details: [
    { score: 0 },
  ],
  productsFiltered: [],
  brandFilteredMemory: [],
  filtersElect: [],
  openDetail: "",
  searchName: "",
  categories: [],
  brands: [],
  color: [],
  selectedBrands: [],
  viewChat: {
    value: false,
  },

  openFilter: false,
  //use useSelector to get this functions
  actions: { setter },
  state: {
    setter: setter,
    utils: utils,
    find: {
      m: "product",
      q: null,//dont use this
      filter: null,//[]
      sort: null,//{}
      limit: 10,
      skip: 0,
    },
    pagination: {
      page: 1,
      pageLimit: 10,
      limit: 10,
      skip: 0,
    },
    server: {
      setter: setter,
      url: "http://localhost:5000",
      dashboardUrl: "http://localhost:3001",
      clientUrl: "http://localhost:3000",
      //routes action 
      get: (url) => axios.get(url),
      post: (url, house) => axios.post(url, house),
      put: (url, id, house) => axios.put(url + id, house),
      delete: (url, id) => axios.delete(url + id),
      find: (url, query) => axios.get(url + query),
      auth: {
        get: (url) => {
          var token = utils.getCookie("token")
          var headers = { Authorization: `Bearer ${token}` }// for every request
          return axios.get(url, { headers: headers, })
        },
        post: (url, send) => {
          var token = utils.getCookie("token")
          var headers = { Authorization: `Bearer ${token}` }// for every request
          return axios.post(url, { data: send ? send : {}, headers: headers })
        },
        put: (url, send) => {
          var token = utils.getCookie("token")
          var headers = { Authorization: `Bearer ${token}` }// for every request
          return axios.put(url, { data: send ? send : {}, headers: headers })
        },
        delete: (url, send) => {
          var token = utils.getCookie("token")
          var headers = { Authorization: `Bearer ${token}` }// for every request
          return axios.delete(url, { data: send ? send : {}, headers: headers })
        },

      }
    },
    user: {
      cart:[],
      setStatus: (status) => { utils.saveLocal("userStatus", status) },
      status: () => !utils.getLocal("userStatus") ? { error: true, message: "waiting_authorization" } : utils.getLocal("userStatus"),
      token: () => !utils.getCookie("token") ? null : utils.getCookie("token"),
      isAutorized: () => !utils.getLocal("autorized") ? false : utils.getLocal("autorized"),
      data: () => !utils.getLocal("userData") ? {} : utils.getLocal("userData"),
      authorize: async (token, user, url) => {
        const domain = url + "/users/authorize"
        const headers = { authorization: `Bearer ${token}`, user: user }// for every request
        const getUserMetadataResponse = await axios.get(domain, {
          headers: headers,
        });
        const data = getUserMetadataResponse.data.user
        utils.saveLocal("userStatus", { error: false, message: "Authorized" })
        utils.saveLocal("autorized", true)
        utils.saveLocal("userData", data)
        utils.saveCookie("token", token)
        return data
      },
      unauthorize: () => {
        utils.saveLocal("userStatus", { error: true, message: "Unauthorized" })
        utils.saveLocal("autorized", false)
        utils.saveLocal("userData", {})
        utils.saveCookie("token", "")
      },
    },
    sidebar: {
      open: false,
      top: 80,
      left: 0,
      width: 280,
    },
    test: {
      obj: {
        a: 1,
        value: true,
        b: [
          { id: "asd", a: 1 },
          { id: "abd", a: 1 },
        ]
      }
    }

  },
};


/* dont worry this is normal day for every programers, look down */

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    //set sate super mamando utiliza recurcion para actualizar el estado de cualquier objeto o array del estado sub statado
    //ejemplo: SET_STATE, payload:{keys:"state.sidebar.open",value:true}
    // dispatch({type:"SET_STATE",payload:{keys:"state.sidebar.open",value:true}})
    //dispatch({type:SET_STATE,payload:{keys:"state.sidebar.open",value:true}}) o 
    //te importas el action setter y haces dispatch(setter({keys:"state.sidebar.open",value:true}))
    ///tambien a setter le puedes traer con un useSelector asi
    //const {setter} = useSelector(state=>state.state) o 
    //const {setter} = useSelector(({state})=>state)
    //y despues haces dispatch(setter({keys:"state.sidebar.open",value:true}))
    case SET_STATE:
      const { keys, value, only } = action.payload;
      //keys: "state.sidebar.open", value: true, only: true
      //keys es la ruta del objeto que se quiere actualizar
      //value es el valor que se quiere actualizar
      if (keys) {
        if (keys.includes(".")) {
          function recursive(obj, keys, value) {
            if (!obj || !keys) return obj;
          

            const [currentKey, ...remainingKeys] = keys.split(".");
            const type = Object.prototype.toString.call(obj[currentKey]);
       
            if (type === "[object Array]") {
              
              const index = obj[currentKey].findIndex((item) => item.id.toString() === remainingKeys[0]);
              
              if (index !== -1) {
                if (remainingKeys.length === 1) {
                  var newKeys = Object.keys(value)[0];
                  var newValue = Object.values(value)[0];
                  if (only) {//si solo se quiere actualizar el valor unico y eredar los demas valores
                    const newData = obj[currentKey].map((item, i) => {
                      item[newKeys] = false;
                      if (i === index) {
                        item[newKeys] = newValue;
                      }
                      return item;
                    });
                    return (obj[currentKey] = newData);
                  } else {
                    return (obj[currentKey][index] = {
                      ...obj[currentKey][index],
                      ...value,
                    });
                  }
                } else {
                  recursive(
                    obj[currentKey][index],
                    remainingKeys.slice(1).join("."),
                    value
                  );
                }
              }
            } else if (type === "[object Object]") {
              //keys:"sidebar.right",value:200

              if (remainingKeys.length === 1) {
                obj[currentKey][remainingKeys[0]] = value;
              } else {
                obj[currentKey] = remainingKeys.length
                  ? recursive(
                    obj[currentKey],
                    remainingKeys.join("."),
                    value
                  )
                  : value;
              }
            }

            return obj;
          }
          var newState = { ...state };
          recursive(newState, keys, value);

        } else {
          state[keys] = value;
        }
        return state
      }
    ////////////////////////////////////Products////////////////////////////////////////

    case PRODUCT_DETAIL:
      return {
        ...state,
        details: { ...action.payload[0] },
      };

    case POST_PRODUCT:
      return {
        ...state,
      };


case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };

    case GET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    case BRAND_ELECT:
      return {
        ...state,
        selectedBrands: action.payload,
      };
    case UPDATE_SCORE:
      return {

      }


    default:
      return state;
  }
};

