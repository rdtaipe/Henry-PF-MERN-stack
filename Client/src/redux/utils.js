export const utils = {
    queryString: (obj) => {
        return Object.keys(obj).map(key => {
            if (typeof obj[key] === 'object') {
                return `${key}=${encodeURIComponent(JSON.stringify(obj[key]))}`;
            }
            return `${key}=${encodeURIComponent(obj[key])}`;
        }).join('&');
    },

    // save local storage
    saveLocal: (key, v) => {
        try {
            const data = JSON.stringify(v);
            localStorage.setItem(key, data);
        } catch (e) {
            console.log(e);
        }
    },
    getLocal: (key) => {
        try {
            const data = localStorage.getItem(key);
            return JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
    },

    //save cookien for 24 hours
    saveCookie: (key, v, t) => {
        var time=t?t:86400;
        try {
            const data = JSON.stringify(v);
            document.cookie = `${key}=${data};max-age=${time}`;
        } catch (e) {
            console.log(e);
        }
    },
    getCookie: (key) => {
        try {
            const data = document.cookie
                .split(";")
                .find((c) => c.trim().startsWith(`${key}=`));
            return JSON.parse(data.split("=")[1]);
        } catch (e) {
            console.log(e);
        }
    }


}