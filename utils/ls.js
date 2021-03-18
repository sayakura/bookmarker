import { isBrowser } from "browser-or-node";

const get = (key) => {
    if (!isBrowser) return null;
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
        const json = JSON.parse(item);
        return json;
    } catch(e) {
        try {
            const num = Number.parse(item); 
            return num;
        } catch(e) {
            return item;
        }
    }
}

const set = (key, val) => {
    if (!isBrowser) return ;
    localStorage.setItem(key, JSON.stringify(val));
}

module.exports = {
    get,
    set
}