export const utils={
     queryString:(obj)=>{
        return Object.keys(obj).map(key => {
          if (typeof obj[key] === 'object') {
            return `${key}=${encodeURIComponent(JSON.stringify(obj[key]))}`;
          }
          return `${key}=${encodeURIComponent(obj[key])}`;
        }).join('&');
      }

}