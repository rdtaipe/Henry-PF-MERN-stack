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
import { setter } from "./actions";
import { utils } from "./utils";

export var initialState = {
  products: [],
  details: [],
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
    utils:utils,
    find:{
      m:"product",
      q:null,//dont use this
      filter:null,//[]
      sort:null,//{}
      limit:10,
      skip:0,
    },
    pagination:{
      page:1,
      pageLimit:10,
      limit:10,
      skip:0,
    },
    server:{
      setter:setter,
      url: "http://localhost:5000",
      get:(url)=>axios.get(url),
      post:(url,house)=> axios.post(url,house),
      put:(url,id,house)=> axios.put(url+id,house),
      delete:(url,id)=> axios.delete(url+id),
      find:(url,query)=> axios.get(url+query),
    },
    sidebar:{
      open:false,
      top:80,     
      left: 0,
      width: 280,
    }

  },
};

/* dont worry this is normal day for every programers, look down */

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    //set sate super mamando utiliza recurcion para actualizar el estado de cualquier objeto o array del estado sub statado
    case SET_STATE:
      const { keys, value, only } = action.payload;
      //keys: "state.sidebar.right", value: 200, only: true
      if (keys) {
        if (keys.includes(".")) {
          function recursive(obj, keys, value) {
            if (!obj || !keys) return obj;

            const [currentKey, ...remainingKeys] = keys.split(".");
            const type = Object.prototype.toString.call(obj[currentKey]);

            if (type === "[object Array]") {
              const index = obj[currentKey].findIndex(
                (item) => item.id.toString() === remainingKeys[0]
              );
              if (index !== -1) {
                if (remainingKeys.length === 1) {
                  var newKeys = Object.keys(value)[0];
                  var newValue = Object.values(value)[0];
                  if (only) {
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
    case GET_PRODUCTS:
      const result = action.payload.filter((f) => f.active === true);
      return {
        ...state,
        products: [...result],
        productsFiltered: [...result],
        brandFilteredMemory: [...result],
        brandElect: "",
        filtersElect: [],
      };
    case PRODUCT_DETAIL:
      return {
        ...state,
        details: { ...action.payload[0] },
      };

    case POST_PRODUCT:
      return {
        ...state,
      };
///actualmete ya no utilizan ORDER AND FILTERS de abajo con la implematacion de /find? pero las dejo por si las moscas
    /////////////////////////////////ORDER AND FILTERS//////////////////////////////////////////////////////
    case OPEN_FILTERS:
      return {
        ...state,
        openFilter: action.payload,
      };

    case ORDER_BY:
      if (action.payload === "A-Z" || action.payload === "Z-A") {
        let n = 0;
        const ordenV =
          action.payload === "A-Z"
            ? state.productsFiltered.sort((a, b) => {
              return a.name.trim() > b.name.trim()
                ? 1
                : a.name.trim() < b.name.trim()
                  ? -1
                  : 0;
            })
            : state.productsFiltered.sort((a, b) => {
              return a.name.trim() < b.name.trim()
                ? 1
                : a.name.trim() > b.name.trim()
                  ? -1
                  : 0;
            });
        //es necesario realizar un cambio, para que me muestre la lista ordenada al renderizar la página, agrego una nueva propiedad idd
        const ordenVCid = ordenV.map((e) => {
          return { ...e, idd: n++ };
        });
        return {
          ...state,
          currentOrder: action.payload,
          productsFiltered: ordenVCid,
          brandFilteredMemory: ordenVCid,
        };
      }

      if (action.payload === "priceAsc") {
        let n = 0;
        const ordenV = state.productsFiltered.sort((prev, next) => {
          return prev.price - next.price;
        });
        const ordenVCid = ordenV.map((e) => {
          return { ...e, idd: n++ };
        });
        return {
          ...state,
          currentOrder: action.payload,
          productsFiltered: ordenVCid,
          brandFilteredMemory: ordenVCid,
        };
      }
      if (action.payload === "priceDesc") {
        let n = 0;
        const ordenV = state.productsFiltered.sort((prev, next) => {
          return next.price - prev.price;
        });
        const ordenVCid = ordenV.map((e) => {
          return { ...e, idd: n++ };
        });
        return {
          ...state,
          currentOrder: action.payload,
          productsFiltered: ordenVCid,
          brandFilteredMemory: ordenVCid,
        };
      }
      return state;

    case FILTER:
      let n = 0;
      //Filtro de Brand
      let brandFilter = action.payload.filter((f) => f.filters === "brand");
      /////////////////////Esta LInea es para elegir All para cuando se seleccione la casilla de brand, en caso que no esté crear la casilla ////////////////////////////////
      if (brandFilter.length > 0) {
        if (brandFilter[0].name === "All") {
          state.brandFilterName = state.products;
        } else {
          state.brandFilterName = state.products.filter(
            (product) => product.brand.name === brandFilter[0].name
          );
        }

        const brandFilterId = state.brandFilterName.map((e) => {
          return { ...e, idd: n++ };
        });

        state.productsFiltered = brandFilterId;
        state.brandFilteredMemory = brandFilterId; //memory filter de brand
      }

      //arrays con los filtros, de color, category y genre
      let colorFilter = action.payload.filter((f) => f.filters === "color");
      let categoryFilter = action.payload.filter(
        (f) => f.filters === "category"
      );
      let genreFilter = action.payload.filter((f) => f.filters === "genre");

      //arrays con el nombre seleccionado en cada sección
      colorFilter = colorFilter.map((c) => c.name);
      categoryFilter = categoryFilter.map((c) => c.name);
      genreFilter = genreFilter.map((g) => g.name);

      //si hay filtros en color le aplico el filtro, de lo contrario no lo aplico

      state.resultFilterCombinado1 = state.brandFilteredMemory;

      if (colorFilter.length > 0) {
        state.resultFilterCombinado1 = [
          ...colorFilter?.map((c) =>
            state.brandFilteredMemory?.filter((e) => e.color === c)
          ),
        ];
      }
      state.resultFilterCombinado1 = state.resultFilterCombinado1.flat();

      // aplico filtro category si no está vacío
      if (categoryFilter.length > 0) {
        state.resultFilterCombinado1 = categoryFilter?.map((c) =>
          state.resultFilterCombinado1?.filter((e) => e.category[0].name === c)
        );
        state.resultFilterCombinado1 = state.resultFilterCombinado1.flat();
      } else {
        state.resultFilterCombinado1 = state.resultFilterCombinado1.flat();
      }

      //si genre no está vacío aplico los filtros
      if (genreFilter.length > 0) {
        state.resultFilterCombinado1 = genreFilter?.map((c) =>
          state.resultFilterCombinado1?.filter((e) => e.genre === c)
        );
        state.resultFilterCombinado1 = state.resultFilterCombinado1.flat();
      } else {
        state.resultFilterCombinado1 = state.resultFilterCombinado1.flat();
      }

      //ya aplicados los filtros los guardo en el estado

      return {
        ...state,
        productsFiltered: state.resultFilterCombinado1,
        filtersElect: action.payload,
      };
    case SEARCH:
      let filterNames = state.products.filter((e) => {
        return e.name.toUpperCase().includes(action.payload.toUpperCase());
      });

      return {
        ...state,
        productsFiltered: filterNames,
        searchName: action.payload,
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

    default:
      return state;
  }
};

