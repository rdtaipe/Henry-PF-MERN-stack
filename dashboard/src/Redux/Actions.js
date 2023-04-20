import axios, { Axios } from 'axios'
import colors from './Utils/colors'
import { base,themeSettings } from './Utils/theme'

export const InitialState = {
    actions: {},
    server: {
        url: "http://localhost:5000/",
        //routes action   
        get:(url)=>axios.get(url),
        post:(url,house)=> axios.post(url,house),
        put:(url,id,house)=> axios.put(url+id,house),
        delete:(url,id)=> axios.delete(url+id),
        find:(url,query)=> axios.get(url+query),
        auth: {
            get: ({ url }) => {
                var token = getCookie("token")
                var headers = { Authorization: `Bearer ${token}` }// for every request
                console.log(token)
                return axios.get(url, {
                    headers: headers,
                })

            },
            post: ({ url, token, send }) => {
                var headers = { Authorization: `Bearer ${token}` }// for every request
                return axios.post(url, { ...send, headers: headers })
            },
            put: ({ url, token, send }) => {
                var headers = { Authorization: `Bearer ${token}` }// for every request
                return axios.put(url, { ...send, headers: headers })
            },
            delete: ({ url, token, send }) => {
                var headers = { Authorization: `Bearer ${token}` }// for every request
                return axios.delete(url, { ...send, headers: headers })
            },

        }
    },
    sidebar: {
        top: 60,
        open: true,
        width: 240,
        height: window.innerHeight,
        items: [
            { id:"Dashboard", type: "item", name: "Dashboard", active: false},
            { id:"Products", type: "item", name: "Products", active: false },
            { id:"Users", type: "item", name: "Users", active: false },
            { id:"Sales", type: "item", name: "Sales", active: false },
            { id:"Employees", type: "item", name: "Employees", active: false },
            { id:"Roles", type: "item", name: "Roles", active: false },
            { id:"Permissions", type: "item", name: "Permissions", active: false },
        ]
    },
    user: {
        token: () => !getCookie("token") ? null : getCookie("token"),
        autorized: () => !getLocal("autorized") ? false : getLocal("autorized"),
        obj: {},
    },
    theme: {
        mode: () => { return getLocal('theme') },
        setMode: "",
        colors: { ...colors },
        use: () => {
            return State.theme.colors[State.theme.mode()]
        },
        base:base,
    },
    animation: {
        open: ".4,0,0,1"
    },

}
export const Reducers = {
    addActions: (state, action) => {
        state.actions = { ...state.actions, ...action.payload }
    },
    setUrlBase: (state, action) => {
        state.server.url = action.payload
    },
    setter: (state, action) => {
        const { keys, value, only } = action.payload

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
        }
    },
    changeTheme:(state,action)=>{
        const theme=getLocal("theme")
         saveLocal("theme",theme === "dark" ? "light" : "dark")
        state.theme.setMode=getLocal("theme")
    },
    setActiveSidebarItem: (state, action) => {
     
        state.sidebar.items.map(item=>{
            if(item.name.toLowerCase()===action.payload.toLowerCase()){
                item.active=true
            }else{
                item.active=false
            }
        })
    
  
},

}

// save local storage
const saveLocal = (key, v) => {
    try {
        localStorage.setItem(key, v)
    } catch (e) {
        var parce = JSON.parse(v)
        localStorage.setItem(key, parce)
    }
}
const getLocal = (key) => {
    try {
        return localStorage.getItem(key)
    } catch (e) {
        var res=localStorage.getItem(key)
        return JSON.parse(res)
    }
}
localStorage.getItem('theme') === null ? saveLocal('theme', 'light') : null


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
