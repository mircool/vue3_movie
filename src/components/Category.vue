<script setup>
import {getCategories} from "@/api/index.js";
import {onMounted, ref} from "vue";

const categories = ref([]) // 分类列表
// 获取分类列表
const fetchCategories = async () => {
  const res = await getCategories();
  categories.value = res.data.results
}

const toggle = (catory) => {
  catory.hidden = !catory.hidden
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div id=nav class=px-4>
    <ul class="hidden md:flex items-center space-x-4 ml-2">
      <li>
        <a href='/'>首页</a>
      </li>
      <li>
        <a href=http://127.0.0.1:8080>热门</a>
      </li>

      <li v-for="category in categories" :key="category.id" @click="toggle(category)"
          class="dropdown-menu flex items-center relative hover: cursor-pointer select-none">
        {{ category.name }}
        <span>
                    <svg xmlns='http://www.w3.org/2000/svg' class="h-5 w-5" viewBox="0 0 20 20" fill=currentColor>
                      <path fill-rule=evenodd
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule=evenodd></path>
                    </svg>
                  </span>
        <div
            :class="{hidden:!category.hidden}"
            class="dropdown-item-content absolute top-9 w-32 transition ease-in-out delay-150 z-50 sf-hidden">
          <ul class="bg-primary-700 py-2 px-4 rounded">
            <li class="plx-2 py-2">
              <a href="">全部</a>
            </li>
            <li class="plx-2 py-2">
              <a href="">最新</a>
            </li>
            <li class="plx-2 py-2">
              <a href="">最热</a>
            </li>


          </ul>
        </div>
      </li>


    </ul>
  </div>

</template>

<style scoped>

</style>
