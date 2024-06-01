<script setup>
import {ref, onMounted} from "vue";
import router from '@/router'
import {useUserStore} from '@/stores/user'
import Category from "@/components/Category.vue";

const keyword = ref('');  // 搜索关键字
const username = ref(''); // 用户名

const userStore = useUserStore()

// 搜索电影
const search = () => {
  keyword.value = keyword.value.trim();
  router.push({
    name: 'home',
    query: {search: keyword.value}
  });
}

onMounted(() => {
  username.value = localStorage.getItem('username') || '';
  // 判断登录状态
  const currentTime = Date.now();
  const expiredTime = localStorage.getItem('expiredTime');
  if (currentTime > Number(expiredTime)) {
    userStore.setLoginStatus(false);
  } else if (localStorage.getItem('token')) { // 有token
    userStore.setLoginStatus(true);
  }
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
            <span>{{ username }}</span>
            <button @click="userStore.logout" class="text-white mx-3">退出</button>
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
