<script setup>
import {ref, onMounted} from 'vue'
import {getMovies} from '@/api'

const info = ref([])

// 获取电影列表
const getMovieList = () => {
  getMovies().then(res => {
    info.value = res.data
  })
}

onMounted(() => {
  getMovieList()
})


</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full px-2" style=max-width:1440px>
      <div id=movie-list class="p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

        <div class=movie v-for="movie in info" :key="movie.id">
          <a href='http://127.0.0.1:8080/movie/2'>
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

</template>

<style scoped>

</style>
