<script setup>
import {onMounted, ref} from 'vue'
import {getMovie} from '@/api'
import {useRoute} from "vue-router";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

const movie = ref({})
const id = ref(1)
const route = useRoute()

// 获取电影详情
const getMovieDetail = (id) => {
  getMovie(id).then(res => {
    movie.value = res.data
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  id.value = Number(route.params.id)
  getMovieDetail(id.value)
})

</script>

<template>
  <div id="container" class="text-white text-sm bg-primary-300 min-h-screen pb-4">
    <!--    header-->
    <Header/>
    <div class="flex items-center justify-center">
      <div class="w-full px-2" style="max-width: 1440px">
        <div id="main" class="bg-primary-300 p-6 text-black">
          <div class="flex rounded bg-white mx-4 py-6">
            <div class="mx-6">
              <div style="min-height: 259px; max-height: 300px; height: 274px">
                <img class="h-full w-full"
                     :src="movie.image_url "/>
              </div>
              <button id="collect" class="bg-blue-500 copy text-white w-full px-4 py-1 mt-2 text-sm rounded border">
                添加收藏
              </button>
            </div>
            <div id="info" data-movie-id="443">
              <ul>
                <li class="text-lg font-semibold">{{ movie.name }} ({{ movie.release_year }})</li>
                <li>导演: {{ movie.director }}</li>
                <li>编剧: {{ movie.scriptwriter }}</li>
                <li>主演: {{ movie.actors }}</li>
                <li>语言: {{ movie.language }}</li>
                <li>首播: {{ movie.release_date }}</li>
                <li>集数: {{ movie.duration }}</li>
                <li>类型: {{ movie.types }}</li>
                <li>制片国家/地区:
                  <span v-if="movie.region===1">中国</span>
                  <span v-else-if="movie.region===2">美国</span>
                  <span v-else-if="movie.region===3">日本</span>
                  <span v-else-if="movie.region===4">韩国</span>
                  <span v-else-if="movie.region===5">英国</span>
                  <span v-else-if="movie.region===6">法国</span>
                  <span v-else-if="movie.region===7">德国</span>
                  <span v-else>其他</span>
                </li>
                <li>又名: {{ movie.alternate_name }}</li>
                <li>豆瓣评分: {{ movie.rate }}</li>
              </ul>
            </div>
          </div>
          <div class="rounded bg-white mx-4 my-4 py-6">
            <div class="px-6">
              <h1 class="text-lg mb-6 font-semibold">简介</h1>
              <div>
                <div v-html="movie.review"></div>
              </div>
            </div>
          </div>
          <div v-if="movie.download_info" id="download_info" class="rounded bg-white mx-4 mt-4 py-6">
            <h1 class="text-lg mb-6 font-semibold px-6">网盘地址</h1>
            <div class="px-6">
              <div>
                {{ movie.download_info }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--footer-->
    <Footer/>
  </div>
</template>
