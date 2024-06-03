<script setup>
import {onMounted, ref} from "vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import {getMemberCard} from "@/api"

const memberCard = ref([
  {
    card_name: "",
    card_price: "",
    duration: "",
    info: ""
  }
])

const fetchMemberCard = () => {
  getMemberCard().then((res) => {
    memberCard.value = res.data.results
  }).catch((err) => {
        const error = err.response.data
        console.log(error)
      }
  )
}

onMounted(() => {
  fetchMemberCard()
})

</script>

<template>
  <div id=container class="text-white text-sm bg-primary-300 min-h-screen pb-4">
    <!--    header-->
    <Header/>
    <!--    main-->
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold my-4">会员卡</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="card in memberCard" :key="card.id" class="bg-white text-gray-700 p-4 rounded-lg w-60">
          <h2 class="text-xl font-bold">名称: {{ card.card_name }}</h2>
          <p class="text-lg font-semibold" >价格: {{ card.card_price }}</p>
          <p class="text-lg font-semibold">时长: {{ card.duration }}</p>
          <p class="text-lg font-semibold">详情: {{ card.info }}</p>
          <button class="bg-primary-700 text-white px-4 py-2 rounded-lg mt-2">购买</button>
        </div>
      </div>
    </div>
    <!--footer-->
    <Footer/>
  </div>
</template>
