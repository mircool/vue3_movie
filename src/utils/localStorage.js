// 封装获取和设置localStorage的操作
const getLocalStorage = (key, defaultValue = '') => {
    return localStorage.getItem(key) || defaultValue;
}

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

const setLocalStorageAsync = (key, value) => {
  return new Promise((resolve) => {
    localStorage.setItem(key, value);
    resolve();
  });
}

export {
    getLocalStorage,
    setLocalStorage,
    setLocalStorageAsync
}
