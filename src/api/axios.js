import axios from "axios";


/**
 * 获取指定名称的cookie值。
 * @param {string} name 需要获取的cookie的名称。
 * @returns {string|null} 如果找到指定名称的cookie，则返回其值；否则返回null。
 */
const getCookie = (name) => {
    // 检查document.cookie是否存在，确保后续操作的有效性
    if (document.cookie) {
        // 将document.cookie字符串按分号分割成一个个cookie键值对
        const cookies = document.cookie.split(";");
        // 遍历所有的cookie键值对
        for (const cookie of cookies) {
            // 去除每个cookie键值对两端的空格，以便准确匹配
            const trimmedCookie = cookie.trim();
            // 检查当前cookie是否是我们需要的那一个
            if (trimmedCookie.startsWith(name + "=")) {
                // 如果是，则解码并返回cookie的值部分
                return decodeURIComponent(trimmedCookie.substring(name.length + 1));
            }
        }
    }
    // 如果没有找到指定名称的cookie，返回null
    return null;
};


const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
    },
});

export default instance;
