<script setup>
import {onMounted, ref} from 'vue'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

import {getCollects} from "@/api";

const collects = ref([])

const fetchCollects = async () => {
  const res = await getCollects();
  collects.value = res.data
}

onMounted(() => {
  fetchCollects()
})


</script>

<template>
  <div id=container class="text-white text-sm bg-primary-300 min-h-screen pb-4">
    <!--    header-->
    <Header/>
    <!--    main-->
    <div id="main" class="bg-primary-300 p-6 text-black">
      <div class="rounded bg-white mx-4 my-4 py-6">
        <div class="px-6">
          <h1 class="text-lg font-semibold">我的收藏</h1>
        </div>
      </div>
      <div class="rounded bg-white mx-4 mt-4 py-6">
        <div>
          <div id="movie-list" class="p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div v-for="collect in collects" :key="collect.id"
                class="movie">
              <a :href="'/movie/'+collect.id">
                <div class="relative">
                  <div class="cover">
                    <img
                        :src="collect.image_url"
                        alt="" class="rounded h-full w-full"/>
                  </div>
                </div>
                <p>{{collect.name}}({{collect.release_year}})</p>
                <p class="text-sm text-primary-200">{{collect.region}}</p>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!--footer-->
    <Footer/>
  </div>
</template>

<style scoped>

</style>
