const LocalStorage = {
    safeCall(method, ...args) {
        try {
            return localStorage[method](...args);
        } catch (e) {
            console.error(e);
        }
    },
    set(name, value) {
        this.safeCall('setItem', name, value);
    },
    get(name, value) {
        return this.safeCall('getItem', name);
    },
    remove(name) {
        this.safeCall('removeItem', name);
    }
}

export default LocalStorage;