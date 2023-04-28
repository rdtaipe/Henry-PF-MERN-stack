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
            var fix = typeof v === 'object' ? JSON.stringify(v) : v
            localStorage.setItem(key, fix)
        } catch (e) {
            var parce = JSON.parse(v)
            localStorage.setItem(key, parce)
        }
    },
    getLocal: (key) => {
        try {
            var res = localStorage.getItem(key)
            return JSON.parse(res)
        } catch (e) {
            return localStorage.getItem(key)

        }
    },

    //save cookien for 24 hours
    saveCookie: (key, v, t) => {
        var time = t ? t : 86400;
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