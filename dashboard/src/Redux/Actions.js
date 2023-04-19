import axios, { Axios } from 'axios'
// import colors from '../colors'

export const InitialState = {
    actions:{},
    server:{
        url:"http://localhost:5000/",
        //routes action   
        auth:{
            get:({url})=>{
                var token=getCookie("token")
                    var headers={Authorization:`Bearer ${token}`}// for every request
             console.log(token)
                    return axios.get(url,{
                        headers:headers,
                      })
                  
            },
            post:({url,token,send})=>{
                var headers={Authorization:`Bearer ${token}`}// for every request
                return axios.post(url,{...send,headers:headers})
            },
            put:({url,token,send})=>{
                var headers={Authorization:`Bearer ${token}`}// for every request
                return axios.put(url,{...send,headers:headers})
            },
            delete:({url,token,send})=>{
                var headers={Authorization:`Bearer ${token}`}// for every request
                return axios.delete(url,{...send,headers:headers})
            },

        }
    }

}
export const Reducers ={
    addActions: (state, action) => {
        state.actions={...state.actions,...action.payload}
    }
}


//save cookien for 24 hours
const saveCookie = (key,v) => {
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
