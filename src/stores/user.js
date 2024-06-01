import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    // 登录状态
    const isLogin = ref(false)
    // 是否登录
    const initializeStore = () => {
        localStorage.getItem('token') ? isLogin.value = true : isLogin.value = false;
    }

    const setLoginStatus = (status) => {
        isLogin.value = status;
    }

    const logout = () => {
        localStorage.clear()
        isLogin.value = false;
    }

    return {isLogin, initializeStore, setLoginStatus, logout}
})
