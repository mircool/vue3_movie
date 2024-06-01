// 封装获取和设置localStorage的操作
const getLocalStorage = (key, defaultValue = '') => {
    return localStorage.getItem(key) || defaultValue;
}

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

export {
    getLocalStorage,
    setLocalStorage
}
