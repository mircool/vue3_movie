<script setup>
import {ref, onMounted} from "vue";
import router from '@/router'
import {useUserStore} from '@/stores/user'
import Category from "@/components/Category.vue";
import {refreshToken} from "@/api";
import {getLocalStorage, setLocalStorage} from "@/utils/localStorage.js";

const keyword = ref('');  // 搜索关键字
const username = ref(getLocalStorage('username')); // 用户名

const userStore = useUserStore()

const is_hidden = ref(false);
// 个人中心下拉
const toggle = () => {
  is_hidden.value = !is_hidden.value;
}

// 搜索电影
const search = () => {
  keyword.value = keyword.value.trim();
  router.push({
    name: 'home',
    query: {search: keyword.value}
  });
}

// 封装检查和刷新token的操作
const checkAndRefreshToken = () => {
  const currentTime = Date.now();
  const expiredTime = Number(getLocalStorage('expiredTime'));
  const refresh_token = getLocalStorage('refreshToken');

  if (expiredTime > currentTime && getLocalStorage('token')) {
    userStore.setLoginStatus(true);
  } else {
    if (refresh_token) {
      refreshToken({refresh: refresh_token}).then(res => {
        const token = res.data.access;
        setLocalStorage('token', token);
        setLocalStorage('expiredTime', String(Date.now() + (5 * 60 * 1000)))
        userStore.setLoginStatus(true);
      }).catch(() => {
        userStore.setLoginStatus(false);
      })
    } else {
      userStore.setLoginStatus(false);
    }
  }
}

// 退出登录
const logout = () => {
  userStore.setLoginStatus(false);
  localStorage.clear()
  router.push('/');
}

onMounted(() => {
  checkAndRefreshToken();
})

</script>

<template>
  <div id=header class="h-12 py-1 bg-primary-100 flex items-center justify-center">
    <div class="w-full px-4" style=max-width:1440px>
      <div class="flex justify-between">
        <div class="flex items-center">
          <a href='/'>
            <img src='@/assets/images/logo.png' style=height:39px alt="logo">
          </a>
          <!-- 分类 -->
          <Category/>
        </div>
        <div class="flex items-center space-x-2">
          <div class="relative shrink">
            <form @submit.prevent='search'>
              <input v-model="keyword" type='text' name='keyword'
                     class="outline-0 h-9 rounded bg-primary-700 border border-gray-600 placeholder-gray-400 w-64 px-2 py-1 max-w-[180px]"
                     placeholder=请输入关键词 value>
              <div class="absolute top-0 right-0 flex items-center h-full">
                <div class="rounded text-xs text-gray-400 px-2 mr-2">
                  <button>
                    <svg xmlns='http://www.w3.org/2000/svg' class="h-4 w-4" fill=none viewBox="0 0 24 24"
                         stroke=currentColor stroke-width=2>
                      <path stroke-linecap=round stroke-linejoin=round d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div v-if="userStore.isLogin" class="text-white">
            <! -- 显示用户名，用户名后面有一个下拉菜单，下拉菜单中有退出登录，个人中心，我的收藏 -->
            <div
                @click="toggle"
                id="userinfo"
                 class="flex relative hover: cursor-pointer items-center justify-center rounded border border-solid text-white text-lg h-9 text-center">
              <div id="username" class="px-2">
                {{username}}
              </div>
              <div class="pr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewbox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
              </div>
              <div
                  :class="{hidden:!is_hidden}"
                  class="absolute top-[40px] w-32 transition ease-in-out delay-150 z-50 sf-hidden"
                   id="userinfo_menu">
                <ul class="bg-primary-700 my-2 px-4 rounded">
                  <li class="plx-2 py-2">
                    <a href='/favorite' class="hover:text-blue-500 block">我的收藏</a>
                  </li>
                  <li class="plx-2 py-2">
                    <a href='/profile' class="hover:text-blue-500 block">个人中心</a>
                  </li>
                  <li class="plx-2 py-2">
                    <a href='/orders' class="hover:text-blue-500 block">我的订单</a>
                  </li>
                  <li class="plx-2 py-2">
                    <a href='/member_card' class="hover:text-blue-500 block">我要购卡</a>
                  </li>
                  <li class="plx-2 py-2">
                    <a @click="logout" class="hover:text-blue-500 block">退出登录</a>
                  </li>
                </ul>

              </div>
            </div>
          </div>
          <div v-else class="text-white flex-shrink-0 pr-2">
            <a href='/login'>登录</a>
            / <a href='/register'>注册</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped></style>
