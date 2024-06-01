<script setup>
import {ref, onMounted, watch} from 'vue'
import {getMovies} from '@/api'
import Paging from "@/components/Paging.vue";
import {useRoute} from "vue-router";
import router from "@/router/index.js";

const info = ref([])
const route = useRoute();


onMounted(() => {
  getMovieList()
})

watch(() => route.query, (newQuery) => {
  getMovieList()
  // 页面滚动到顶部并添加动画
  window.scrollTo({
    top: 0,
    behavior: "smooth",  // 平滑滚动
  })
});

// 获取电影列表
const getMovieList = () => {
  const page = route.query.page   // 当前页码
  const search = route.query.search   // 搜索关键字
  const category = route.query.category  // 分类
  const region = route.query.region // 地区
  // url编码
  const params = new URLSearchParams()
  if (page) {
    params.append('page', String(page))
  }
  if (search) {
    params.append('name', String(search))
  }
  if (category) {
    params.append('category', String(category))
  }
  if (region) {
    params.append('region', String(region))
  }

  getMovies(params).then(res => {
    info.value = res.data
  }).catch(err => {
    console.log(err)
  })
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full px-2" style=max-width:1440px>
      <div id=movie-list class="p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

        <div class=movie v-for="movie in info.results" :key="movie.id">
          <a :href="'/movie/' + movie.id">
            <div class=relative>
              <div style=min-height:259px;max-height:300px;height:274px>
                <img
                    :src="movie.image_url"
                    alt class="rounded h-full w-full">
              </div>
              <div v-if="movie.is_top" class="rounded absolute top-0 bg-purple-600 px-1 text-sm">置顶</div>
              <div v-if="movie.quality===1" class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm">高清
              </div>
              <div v-else-if="movie.quality===2" class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm">
                超清
              </div>
              <div v-else-if="movie.quality===3" class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm">
                蓝光
              </div>
              <div v-else class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm">标清</div>

            </div>
            <div>
              {{ movie.name }}({{ movie.release_year }})
              <p class="text-sm text-primary-200">{{ movie.language }}</p>
            </div>
          </a>
        </div>

      </div>
    </div>
  </div>

  <Paging :info="info"/>

</template>

<style scoped>

</style>
