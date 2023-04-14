import { SET_STATE } from './types';
import { setter } from './actions'
import axios from 'axios'

export var initialState = {
    actions: { setter },
    state: {
        server: {
            url: "http://localhost:5000/",
            get: (url) => axios.get(url),
            post: (url, house) => axios.post(url, house),
            put: (url, id, house) => axios.put(url + id, house),
            delete: (url, id) => axios.delete(url + id),
            find: (url, query) => axios.get(url + query),

        },
        workspace: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: "100vh",
            height: 60,
        }

    }
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_STATE:
            //set sate super mamando utiliza recurcion para actualizar el estado de cualquier objeto o array
            //no importa que sea un array o un objeto siempre encuentra el valor que quiras modificar
            const { keys, value, only } = action.payload
            //keys: "state.workspace.right", value: 200, only: true
            //var keys="toolbar.test.1", value={name:"juan"}, only=true
            // "abk.123.abc.234"
            // ({keys:"toolbar.left.type",value:v,only:true}))
            //if arra= value:{id:1,active:true}
            //if object=value:"hola"
            // console.log(keys,"on")
            //key: "menu.itmes.home"

            if (keys) {
                if (keys.includes(".")) {
                    function recursive(obj, keys, value) {
                        if (!obj || !keys) return obj;

                        const [currentKey, ...remainingKeys] = keys.split('.');
                        const type = Object.prototype.toString.call(obj[currentKey])

                        if (type === '[object Array]') {
                            const index = obj[currentKey].findIndex(item => item.id.toString() === remainingKeys[0])
                            if (index !== -1) {
                                if (remainingKeys.length === 1) {
                                    var newKeys = Object.keys(value)[0]
                                    var newValue = Object.values(value)[0]
                                    if (only) {
                                        const newData = obj[currentKey].map((item, i) => {
                                            item[newKeys] = false
                                            if (i === index) {
                                                item[newKeys] = newValue
                                            }
                                            return item
                                        })
                                        return obj[currentKey] = newData

                                    } else {
                                        return (obj[currentKey][index] = { ...obj[currentKey][index], ...value })
                                    }
                                } else {
                                    recursive(obj[currentKey][index], remainingKeys.slice(1).join('.'), value)
                                }
                            }
                        } else if (type === '[object Object]') {
                            if (remainingKeys.length === 1) {
                                obj[currentKey][remainingKeys[0]] = value

                            } else {
                                obj[currentKey] = remainingKeys.length ? recursive(obj[currentKey], remainingKeys.join('.'), value) : value;
                            }
                        }

                        return obj;
                    }
                    var newState = { ...state }
                    recursive(newState, keys, value);

                } else {
                    state[keys] = value
                }

                return state
            }

        default:
            return state;
    }

}

// save local storage
const saveLocal = (key, v) => {
    try {
        const data = JSON.stringify(v)
        localStorage.setItem(key, data)
    } catch (e) {
        console.log(e)
    }
}
const getLocal = (key) => {
    try {
        const data = localStorage.getItem(key)
        return JSON.parse(data)
    } catch (e) {
        console.log(e)
    }
}

//save cookien for 24 hours
const saveCookie = (key, v) => {
    try {
        const data = JSON.stringify(v)
        document.cookie = `${key}=${data};max-age=86400`
    } catch (e) {
        console.log(e)
    }
}
const getCookie = (key) => {
    try {
        const data = document.cookie.split(';').find(c => c.trim().startsWith(`${key}=`))
        return JSON.parse(data.split('=')[1])
    } catch (e) {
        console.log(e)
    }
}
