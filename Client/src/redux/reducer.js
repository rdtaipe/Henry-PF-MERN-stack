import { SET_STATE } from './types';
import { setState } from './actions'

export var initialState = {
    mesi: [],
    mesi2: {},
    actions: { setState },
    state: {
        workspace: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
        }

    }
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        //set sate super mamando utiliza recurcion para actualizar el estado de cualquier objeto
        case SET_STATE:
            const { keys, value, only } = action.payload
            //keys: "state.workspace.right", value: 200, only: true
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
                            //keys:"workspace.right",value:200

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
