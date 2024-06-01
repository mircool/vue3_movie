<script setup>
import {register} from "@/api";
import {ref} from "vue";
import {errorMessage, successMessage} from "@/utils/message.js";


const form = ref({})  // 表单数据

// 注册
const user_register = () => {
  const {username, password, confirm_password, email} = form.value
  if (!username || !password || !confirm_password || !email) {
    errorMessage('请填写完整信息')
    return
  }
  if (password !== confirm_password) {
    errorMessage('两次密码不一致')
    return
  }
  // 校验邮箱
  const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (!emailReg.test(email)) {
    errorMessage('邮箱格式不正确')
    return
  }

  register({username, password, email}).then(res => {
    console.log('res', res)
    if (res.code === 200) {
      successMessage('注册成功')
    } else {
      errorMessage('注册失败')
    }
  }).catch(err => {
        errorMessage('注册失败')
      }
  )
}


</script>

<template>
  <div id="main-body" class="bg-primary-100 flex justify-center h-screen">
    <section class="container flex justify-center items-center rounded">
      <div class="hidden md:block">
        <img
            src="@/assets/images/register.png"
            alt="" class="rounded-l max-h-[500px]"/>
      </div>
      <div class="rounded-r w-80 h-[500px] my-8 px-2 py-4 bg-white shadow shadow-gray-300">
        <div class="text-center text-lg py-6">
          用户注册
        </div>
        <form @submit.prevent="user_register"
              method="post" id="register_form" class="px-4">
          <div
              class="flex justify-left items-center relative h-10 px-4 my-2 rounded border-solid border border-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300 mr-2" fill="none" viewbox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <input v-model="form.username" type="text" id="username" name="username" placeholder="请输入用户名"
                   class="outline-0 text-sm"
                   value=""/>
          </div>
          <div
              class="flex justify-left items-center relative h-10 px-4 my-2 rounded border-solid border border-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300 mr-2" fill="none" viewbox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2"></path>
            </svg>
            <input v-model="form.email"
                   type="text" placeholder="请输入邮箱" class="outline-0 text-sm" value=""/>
          </div>
          <div
              class="flex justify-left items-center relative h-10 px-4 my-2 rounded border-solid border border-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300 mr-2" fill="none" viewbox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <input v-model="form.password"
                   type="password" id="password" name="password" placeholder="请输入密码" class="outline-0 text-sm"
                   value=""/>
          </div>
          <div
              class="flex justify-left items-center relative h-10 px-4 my-2 rounded border-solid border border-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300 mr-2" fill="none" viewbox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <input v-model="form.confirm_password"
                   type="password" id="confirm_password" name="confirm_password" placeholder="请确认密码"
                   class="outline-0 text-sm" value=""/>
          </div>
          <div class="pt-6">
            <button type="submit" id="register" class="rounded bg-green-500 w-full h-8 text-white"> 注册</button>
          </div>
          <div class="text-center text-sm my-2">
            已有账号?
            <a class="text-blue-500" href="http://127.0.0.1:8080/login/">去登录</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>
