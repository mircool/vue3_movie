<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {errorMessage, successMessage} from "@/utils/message.js";
import {resetPasswordConfirm} from "@/api";

const router = useRouter()

const uid = router.currentRoute.value.params.uid
const token = router.currentRoute.value.params.token

const form = ref({
  new_password: '',
  confirm_password: ''
})

const changePasswordHandler = () => {
  const { new_password, confirm_password} = form.value
  if (!new_password) {
    errorMessage('请输入新密码')
    return
  }
  if (!confirm_password) {
    errorMessage('请输入确认密码')
    return
  }
  if (new_password !== confirm_password) {
    errorMessage('两次密码不一致')
    return
  }
  // change password
  const data = {
    uid,
    token,
    new_password,
    re_new_password: confirm_password
  }
  resetPasswordConfirm(data).then(res => {
    successMessage('密码修改成功')
    localStorage.clear()
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
  <div id=container class="text-white text-sm bg-primary-300 min-h-screen pb-4">
    <!--    header-->
    <Header/>
    <!--    main-->
    <div id="main" class="bg-primary-300 p-6 text-black">
      <div class="rounded bg-white mx-4 my-4 py-6">
        <div class="px-6">
          <h1 class="text-lg font-semibold">个人中心</h1>
        </div>
      </div>
      <div class="rounded bg-white mx-4 mt-4 py-6">
        <div id="tabs" class="flex justify-start items-center py-4 bg-gray-100">
          <div class="px-4 text-md">
            <a href="http://127.0.0.1:8080/personal" class="underline-gray">账号信息</a>
          </div>
          <div class="px-4 text-md">
            <a href="http://127.0.0.1:8080/change_password">修改密码</a>
          </div>
        </div>
        <div class="mt-4 mb-3">
          <div class="not-prose relative">
            <div class="ml-4 text-lg">
              <div class="py-2 text-md">
                <form @submit.prevent="changePasswordHandler"
                      method="post" class="w-[300px]">
                  <div class="flex items-center justify-between py-2">
                    <label for="new_password">新密码:</label>
                    <input v-model="form.new_password"
                           id="new_password" type="password" name="new_password"
                           class="mx-2 outline-0 rounded border border-solid border-gray-500" value=""/>
                  </div>
                  <div class="flex items-center justify-between py-2">
                    <label for="confirm">确认密码:</label>
                    <input v-model="form.confirm_password"
                           id="confirm_password" type="password" name="confirm_password"
                           class="mx-2 outline-0 rounded border border-solid border-gray-500" value=""/>
                  </div>
                  <button type="submit" id="change_password"
                          class="mb-2 rounded border bg-blue-500 text-white text-sm h-8 w-16">提交
                  </button>
                </form>
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
