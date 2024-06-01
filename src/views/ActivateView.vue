<script setup>
import {useRouter} from 'vue-router'
import {activate} from '@/api'
import {errorMessage, successMessage} from "@/utils/message.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter()

// 激活用户
const handleActivate = () => {
  const data = {
    uid: router.currentRoute.value.params.uid,
    token: router.currentRoute.value.params.token
  }
  activate(data).then(() => {
    successMessage('激活成功')
    router.push('/login')
  }).catch((err) => {
    const msg = err.response.data
    for (const key in msg) {
      errorMessage(msg[key])
    }
  })
}

</script>

<template>
  <Header/>
  <div class="container  flex justify-center items-center bg-primary-700 h-screen mx-auto max-w-full">
    <! -- 激活用户,布局上下左右居中 -->
    <div class="w-96 p-5 bg-white rounded-lg shadow-lg">
      <h3 class="text-center">激活用户</h3>
      <p class="text-center">请点击下方按钮激活用户</p>
      <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="handleActivate">
        激活账号
      </button>
    </div>
  </div>
  <Footer/>
</template>
