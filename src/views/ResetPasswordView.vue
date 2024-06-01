<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {resetPassword} from '@/api'
import {errorMessage, successMessage} from "@/utils/message.js";

const router = useRouter()
const form = ref({
  email: 'ynyjyz@163.com',
})

const resetPasswordHandler = () => {
  const {email} = form.value
  if (!email) {
    errorMessage('请输入邮箱')
    return
  }
  resetPassword({email}).then(res => {
    successMessage('重置密码邮件已发送')
    router.push('/login')
  }).catch(err => {
    const {data} = err.response
    for (let key in data) {
      errorMessage(data[key])
    }
  })
}

</script>

<template>
  <div id="main-body" class="bg-primary-100 flex justify-center h-screen">
    <section class="container flex justify-center items-center rounded">
      <div class="hidden md:block">
        <img src="@/assets/images/register.png"
             alt="" class="rounded-l max-h-[500px]"/>
      </div>
      <div class="rounded-r w-80 h-[500px] my-8 px-2 py-4 bg-white shadow shadow-gray-300">
        <div class="text-center text-lg py-6">
          找回密码
        </div>
        <form @submit.prevent="resetPasswordHandler"
              id="register_form" class="px-4">
          <div
              class="flex justify-left items-center relative h-10 px-4 my-2 rounded border-solid border border-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300 mr-2" fill="none" viewbox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <input v-model="form.email" type="email" placeholder="请输入电子邮箱" class="outline-0 text-sm" value=""/>
          </div>

          <div class="pt-6">
            <button id="login" type="submit" class="rounded bg-green-500 w-full h-8 text-white">
              发送重置密码邮件
            </button>
          </div>
          <div class="text-center text-sm my-2">
            <span class="text-left text-green-500"><a href="/login">登录?</a></span>
            没有账号
            <a class="text-blue-500" href="/register">去注册</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
