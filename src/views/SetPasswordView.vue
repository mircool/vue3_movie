<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {setPassword} from "@/api";
import {errorMessage, successMessage} from "@/utils/message.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter()

const form = ref({
  current_password: '',
  new_password: '',
  re_new_password: ''
})

// 修改密码
const changePassword = () => {
  if (!form.value.current_password || !form.value.new_password || !form.value.re_new_password) {
    errorMessage('请填写完整信息')
    return
  }
  if (form.value.new_password !== form.value.re_new_password) {
    errorMessage('两次密码不一致')
    return
  }
  setPassword(form.value).then(() => {
    successMessage('修改密码成功')
    localStorage.clear()
    router.push('/login')
  }).catch((err) => {
    console.log(err)
    const {new_password} = err.response.data
    for (let key in new_password) {
      errorMessage(new_password[key])
    }
  })
}

</script>

<template>
  <div id=container class="text-white text-sm bg-primary-300 min-h-screen pb-4">
    <!--    header-->
    <Header/>
    <form @submit.prevent="changePassword">

      <div class="w-1/3 mx-auto mt-8">
        <div class="mb-4">
          <label for="current_password" class="block text-sm text-white">当前密码</label>
          <input type="password" v-model="form.current_password" id="current_password"
                 class="w-full px-3 py-2 bg-white text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
        </div>
        <div class="mb-4">
          <label for="new_password" class="block text-sm text-white">新密码</label>
          <input type="password" v-model="form.new_password" id="new_password"
                 class="w-full px-3 py-2 bg-white text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
        </div>
        <div class="mb-4">
          <label for="re_new_password" class="block text-sm text-white">确认新密码</label>
          <input type="password" v-model="form.re_new_password" id="re_new_password"
                 class="w-full px-3 py-2 bg-white text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
        </div>
        <button type="submit"
                class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
          修改密码
        </button>
      </div>


    </form>
    <!--footer-->
    <Footer/>
  </div>
</template>
