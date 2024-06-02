<script setup>
import {onMounted, ref} from 'vue'
import {getMovie} from '@/api'
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import {getMovieFavorStatus, addCollect, cancelCollect} from "@/api";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import {errorMessage, successMessage} from "@/utils/message.js";

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const movie = ref({})
const id = ref(1) // 电影id
const collectStatus = ref(false)  // 收藏状态
const collectText = ref('') // 收藏文字
const downloadInfo = ref(false) // 下载信息


// 获取电影详情
const getMovieDetail = (id) => {
  getMovie(id).then(res => {
    movie.value = res.data
  }).catch(err => {
    console.log(err)
  })
}

// 获取收藏状态,返回true表示已收藏，false表示未收藏
const getFavorStatus = (id) => {
  getMovieFavorStatus(id).then(res => {
    console.log('res', res.data)
    collectStatus.value = res.data.is_collected
    if (collectStatus.value) {
      collectText.value = '取消收藏'
    } else {
      collectText.value = '添加收藏'
    }
  }).catch(err => {
    const error = err.response.data
    for (const key in error) {
      errorMessage(error[key])
    }
  })
}

// 添加收藏或取消收藏
const collect_or_cancel = (id) => {
  if (!userStore.isLogin) {
    errorMessage('请先登录')
    router.push('/login')
    return
  }
  if (collectStatus.value) {
    cancelCollect(id).then(res => {
      collectStatus.value = false
      collectText.value = '添加收藏'
      successMessage('取消收藏成功')
    }).catch(err => {
      const error = err.response.data
      for (const key in error) {
        errorMessage(error[key])
      }
    })
  } else {
    addCollect({'movie_id': id}).then(res => {
      collectStatus.value = true
      collectText.value = '取消收藏'
      successMessage('添加收藏成功')
    }).catch(err => {
      const error = err.response.data
      for (const key in error) {
        errorMessage(error[key])
      }
    })
  }
}

// 检查会员状态
const check_member_status = () => {
  if (!userStore.isLogin) {
    errorMessage('请先登录')
    return
  }
  if (!userStore.isMember) {
    errorMessage('请先开通会员')
    return
  }
  downloadInfo.value = true
}


onMounted(() => {
  id.value = Number(route.params.id)
  getMovieDetail(id.value)
  // 判断是否收藏，如果是未登录状态，显示文字为添加收藏
  if (!userStore.isLogin) {
    collectStatus.value = false
    collectText.value = '添加收藏'
  } else {
    getFavorStatus(id.value)
  }
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
                     :src="movie.image_url " alt=""/>
              </div>
              <button @click="collect_or_cancel(movie.id)"
                      id="collect"
                      :class="collectStatus?'bg-gray-700':'bg-blue-500'"
                      class="bg-blue-500 copy text-white w-full px-4 py-1 mt-2 text-sm rounded border">
                {{ collectText }}
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
          <div id="download_info" class="rounded bg-white mx-4 mt-4 py-6">
            <h1 class="text-lg mb-6 font-semibold px-6">网盘地址</h1>
            <div v-if="movie.download_info" class="px-6">
              <div v-if="downloadInfo">
                {{ movie.download_info }}
              </div>
              <div v-else>
                <button @click="check_member_status"
                        class="bg-blue-500 copy text-white w-full px-4 py-1 mt-2 text-sm rounded border">
                  查看下载地址
                </button>
              </div>
            </div>
            <div v-else class="px-6">
              <div>暂无资源</div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!--footer-->
    <Footer/>
  </div>
</template>
