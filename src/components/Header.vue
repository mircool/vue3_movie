<script setup>
import {ref} from "vue";
import router from '../router'

const keyword = ref('');

// 搜索电影
const search = () => {
  keyword.value = keyword.value.trim();
  router.push({
    name: 'home',
    query: {search: keyword.value}
  });
}

</script>

<template>
  <div id=header class="h-12 py-1 bg-primary-100 flex items-center justify-center">
    <div class="w-full px-4" style=max-width:1440px>
      <div class="flex justify-between">
        <div class="flex items-center">
          <a href='/'>
            <img
                src="data:image/png;base64,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"
                style=height:39px>
          </a>
          <div id=nav class=px-4>
            <ul class="hidden md:flex items-center space-x-4 ml-2">
              <li>
                <a href='/'>首页</a>
              </li>
              <li>
                <a href=http://127.0.0.1:8080>热门</a>
              </li>
              <li
                  class="dropdown-menu flex items-center relative hover: cursor-pointer select-none">
                电影
                <span>
                                            <svg xmlns='http://www.w3.org/2000/svg' class="h-5 w-5" viewBox="0 0 20 20"
                                                 fill=currentColor>
                                                <path fill-rule=evenodd
                                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                      clip-rule=evenodd></path>
                                            </svg>
                                        </span>
                <div
                    class="hidden dropdown-item-content absolute top-9 w-32 transition ease-in-out delay-150 z-50 sf-hidden">
                </div>
              </li>
              <li class="dropdown-menu flex items-center relative hover: cursor-pointer select-none">
                电视剧
                <span>
                                            <svg xmlns='http://www.w3.org/2000/svg' class="h-5 w-5" viewBox="0 0 20 20"
                                                 fill=currentColor>
                                                <path fill-rule=evenodd
                                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                      clip-rule=evenodd></path>
                                            </svg>
                                        </span>
                <div
                    class="hidden dropdown-item-content absolute top-9 w-32 transition ease-in-out delay-150 z-50 sf-hidden">
                </div>
              </li>
              <li
                  class="dropdown-menu flex items-center relative hover: cursor-pointer select-none">
                综艺
                <span>
                                            <svg xmlns='http://www.w3.org/2000/svg' class="h-5 w-5" viewBox="0 0 20 20"
                                                 fill=currentColor>
                                                <path fill-rule=evenodd
                                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                      clip-rule=evenodd></path>
                                            </svg>
                                        </span>
                <div
                    class="hidden dropdown-item-content absolute top-9 w-32 transition ease-in-out delay-150 z-50 sf-hidden">
                </div>
              </li>
              <li
                  class="dropdown-menu flex items-center relative hover: cursor-pointer select-none">
                动漫
                <span>
                                            <svg xmlns='http://www.w3.org/2000/svg' class="h-5 w-5" viewBox="0 0 20 20"
                                                 fill=currentColor>
                                                <path fill-rule=evenodd
                                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                      clip-rule=evenodd></path>
                                            </svg>
                                        </span>
                <div
                    class="hidden dropdown-item-content absolute top-9 w-32 transition ease-in-out delay-150 z-50 sf-hidden">
                </div>
              </li>
              <li
                  class="dropdown-menu flex items-center relative hover: cursor-pointer select-none">
                纪录片
                <span>
                                            <svg xmlns='http://www.w3.org/2000/svg' class="h-5 w-5" viewBox="0 0 20 20"
                                                 fill=currentColor>
                                                <path fill-rule=evenodd
                                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                      clip-rule=evenodd></path>
                                            </svg>
                                        </span>
                <div
                    class="hidden dropdown-item-content absolute top-9 w-32 transition ease-in-out delay-150 z-50 sf-hidden">
                </div>
              </li>
              <li
                  class="dropdown-menu flex items-center relative hover: cursor-pointer select-none">
                短片
                <span>
                                            <svg xmlns='http://www.w3.org/2000/svg' class="h-5 w-5" viewBox="0 0 20 20"
                                                 fill=currentColor>
                                                <path fill-rule=evenodd
                                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                      clip-rule=evenodd></path>
                                            </svg>
                                        </span>
                <div
                    class="hidden dropdown-item-content absolute top-9 w-32 transition ease-in-out delay-150 z-50 sf-hidden">
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="relative shrink">
            <form @submit.prevent='search'>
              <input v-model="keyword"
                     type='text'
                     name='keyword'
                     class="outline-0 h-9 rounded bg-primary-700 border border-gray-600 placeholder-gray-400 w-64 px-2 py-1 max-w-[180px]"
                     placeholder=请输入关键词 value>
              <div class="absolute top-0 right-0 flex items-center h-full">
                <div class="rounded text-xs text-gray-400 px-2 mr-2">
                  <button>
                    <svg xmlns='http://www.w3.org/2000/svg' class="h-4 w-4" fill=none
                         viewBox="0 0 24 24" stroke=currentColor stroke-width=2>
                      <path stroke-linecap=round stroke-linejoin=round
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="text-white flex-shrink-0 pr-2">
            <a href='http://127.0.0.1:8080/login'>登录</a>
            / <a href='http://127.0.0.1:8080/register'>注册</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
