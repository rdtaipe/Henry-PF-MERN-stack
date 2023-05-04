import axios, { Axios } from 'axios'
import colors from './Utils/colors'
import { base, themeSettings } from './Utils/theme'
import { utils } from './Utils/Utils'

export const InitialState = {
    actions: {},
    server: {
        url: "http://localhost:5000/",
        dashboardUrl: "http://localhost:3001/",
        clientUrl: "http://localhost:3000/",
        //routes action   
        get: (url) => axios.get(url),
        post: (url, data) => axios.post(url, data),
        put: (url, data) => axios.put(url, data),
        delete: (url) => axios.delete(url),
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
    sidebar: {
        top: 60,
        open: true,
        width: 240,
        height: window.innerHeight,
        items: [
            { id: "Dashboard", type: "item", name: "Dashboard", active: false },
            { id: "Products", type: "item", name: "Products", active: false },
            { id: "Users", type: "item", name: "Users", active: false },
            { id: "Sales", type: "item", name: "Sales", active: false },
            { id: "Employees", type: "item", name: "Employees", active: false },
            { id: "Roles", type: "item", name: "Roles", active: false },
            { id: "Permissions", type: "item", name: "Permissions", active: false },
        ]
    },
    user: {
        setStatus: (status) => { utils.saveLocal("userStatus", status) },
        status: () => !utils.getLocal("userStatus") ? { error: true, message: "waiting_authorization" } : utils.getLocal("userStatus"),
        token: () => !utils.getCookie("token") ? null : utils.getCookie("token"),
        isAutorized: () => !utils.getLocal("autorized") ? false : utils.getLocal("autorized"),
        data: () => !utils.getLocal("userData") ? {} : utils.getLocal("userData"),
        authorize: async (token, user, url) => {
            const domain = url + "users/authorize"
            const headers = { authorization: `Bearer ${token}`, user: user }// for every request
            const getUserMetadataResponse = await axios.get(domain, {
                headers: headers,
            });
            const data = getUserMetadataResponse.data.user
            utils.saveLocal("userStatus", { error: false, message: "Authorized" })
            utils.saveLocal("autorized", true)
            utils.saveLocal("userData", data)
            utils.saveCookie("token", token)
            console.log(utils.getLocal("userData"), "user data")
            return data
        },
        unauthorize: ({ message }) => {
            var newMessage = message ? message : "Unauthorized"
            utils.saveLocal("userStatus", { error: true, message: newMessage })
            utils.saveLocal("autorized", false)
            utils.saveLocal("userData", {})
            utils.saveCookie("token", "")
        },
    },
    utils: utils,
    theme: {
        mode: () => { return utils.getLocal('theme') },
        setMode: "",
        colors: { ...colors },
        use: () => {
            return State.theme.colors[State.theme.mode()]
        },
        base: base,
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
    changeTheme: (state, action) => {
        const theme = utils.getLocal("theme")
        utils.saveLocal("theme", theme === "dark" ? "light" : "dark")
        state.theme.setMode = utils.getLocal("theme")
    },
    setActiveSidebarItem: (state, action) => {

        state.sidebar.items.map(item => {
            if (item.name.toLowerCase() === action.payload.toLowerCase()) {
                item.active = true
            } else {
                item.active = false
            }
        })


    },

}

localStorage.getItem('theme') === null ? utils.saveLocal('theme', 'light') : null


//save cookien for 24 hours
