import {SET_STATE} from './types';
import {setState} from './actions'

export var initialState={
    actions:{setState},
    state:{
        workspace:{
            left:0,
            right:0,
            top:0,
            bottom:0,
            width:0,
            height:0,
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
                       function updateObjectOrArray(obj, keys, value) {
                           if (!obj || !keys) return obj;
       
                           const [currentKey, ...remainingKeys] = keys.split('.');
                           const type = Object.prototype.toString.call(obj[currentKey])
       
                           if (type === '[object Array]') {
                             const index = obj[currentKey].findIndex(item => item.id.toString() === remainingKeys[0])
                             if (index !== -1) {
                               if( remainingKeys.length  === 1){
                                   var newKeys=Object.keys(value)[0]
                                   var newValue=Object.values(value)[0]
                                   if(only){
                                       const newData=obj[currentKey].map((item,i)=>{
                                         item[newKeys]=false
                                           if(i===index){
                                               item[newKeys]=newValue
                                           }
                                           return item
                                       })
                                       return obj[currentKey] = newData
       
                                   }else{
                                       return(obj[currentKey][index] = { ...obj[currentKey][index], ...value })
                                   }
                               }else{
                                   updateObjectOrArray(obj[currentKey][index], remainingKeys.slice(1).join('.'), value)
                               }
                           }
                           } else if (type === '[object Object]') {
                               //keys:"workspace.right",value:200
       
                               if(remainingKeys.length === 1){
                                   obj[currentKey][remainingKeys[0]] = value
       
                               }else{
                                   obj[currentKey] = remainingKeys.length ? updateObjectOrArray(obj[currentKey], remainingKeys.join('.'), value) : value;
                               }
                           }
       
                           return obj;
                         }
                         var newState={...state}
                      var st=updateObjectOrArray(newState, keys, value);
                          return st
                       // console.log(JSON.parse(JSON.stringify(st.workspace)))
       
       
       
                      
       
       
       
                   //    console.log(updatedObj.toolbar)
                   /*     const recursive = (state, i) => {
                           const type = Object.prototype.toString.call(state[newKeys[i]]) || null//si es array detener si no seguir
                           const RealData = JSON.parse(JSON.stringify(state[newKeys[i]]))
       
                           if (type === "[object Array]") {
                               //if object value:{onj}
                               //if array only :true
       
                               if (i < newKeys.length - 1) {
                                   //if object value: {id:1}||{onj}
                                   state.map((item, i) => {
                                       if (item[newKeys[i]]) {
                                           recursive(item[newKeys[i]], i + 1);
                                       }
                                   })
                               } else {
                                   const newValuekeys = Object.keys(value).map((item) => item)
                                   var newState= state[newKeys[i]].map((item, i) => {
       
                                      return newValuekeys.reduce((result, key) => {
                                       if (item.id === value.id && item[key] !== value[key]) {
                                           var newItem={...item,[key]: value[key]}
                                           return {...result, ...newItem}
                                       }
                                       return { ...item,...result}
                                     }, {});
       
                                   })
                                   state[newKeys[i]] = newState
                               }
       
       
                           } else if (type === "[object Object]") {
                               //if object value: string, number , boolean, array, object
                               //if array only :undefinet
       
       
                               if (i < newKeys.length - 1) {
                                   recursive(state[newKeys[i]], i + 1);
                               } else {
                                   state[newKeys[i]] = value;
                               }
       
                           }
       
       
                       };
                       recursive(state, 0);
       
        */
       
       
                       //key=toolbar, i=0, obj=state
                       //key=left, i=1, obj=state.toolbar
                       //key=active, i=2, array=state.toolbar.left.map((item,i)=>{if(i===2){item.active=value}})
       
                       /*                 newKeys.map((key, i) => {
       
       
                                           const type=Object.prototype.toString.call(state[key])//si es array detener si no seguir
                                           if(type==="[object Array]"){
                                               console.log(key,"---arr")
       
                                               //obtener el valor real de state no proxy ejemplo: state.toolbar.left
       
                                               //JSON A OBJETO
                                               const obj = JSON.parse(JSON.stringify(state[key]))
                                               console.log(obj);
       
                                               console.log(state[key],"---arr")
                                               state[key].map((item,i)=>{
                                                   if(i===newKeys.length-1){
                                                       item[last]=value
                                                   }
                                               })
                                           }else if(type==="[object Object]"){
                                               console.log(key,"---obj")
                                               state = state[key]
                                           }
       
       
                                          /*  const bucle = (obj, name) => {
                                               //tetectar si obj es un array o un objeto
                                               // if(obj[name]){
       
                                               // }
       
                                               if (keys.length === 1) {//si es el ultimo elemento
                                                   const type=Object.prototype.toString.call(obj[name])//si es array detener si no seguir
       
                                                   if(type==="[object Array]"){
                                                       console.log("array","---end")
                                                   }else{
                                                       console.log("object","---end")
       
                                                   }
                                                   // obj[name] = value
                                               } else {//si no es el ultimo elemento
                                                   // detect Proxy(Array) or Proxy(Object)
                                                   const type=Object.prototype.toString.call(obj[name])//si es array detener si no seguir
       
                                                   if(type==="[object Array]"){
                                                       console.log("array","---next")
                                                   }else{
                                                       console.log("object","---next")
                                                       bucle(obj[name], newKeys[i + 1])//llamar a la funcion con el siguiente elemento
       
                                                   }
       
       
                                               }
                                           }
                                           bucle(state, key) */
       
       
                   } else {
                       state[keys] = value
                   }
       }


        default:
            return state;
    }

}


// save local storage
const saveLocal = (key,v) => {
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
