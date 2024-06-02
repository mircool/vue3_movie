<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import {getUser} from "@/api";
import {errorMessage} from "@/utils/message.js";

const route = useRoute();

const user = ref({
  username: "",
  mobile: "",
  status: "",
  exipre: "",
})

const getUserInfo = () => {
  getUser().then(res => {
    user.value = res.data;
  }).catch(err => {
    const {status, data} = err.response;
    for (let key in data) {
      errorMessage(data[key])
    }
  })
}

onMounted(() => {
  getUserInfo();
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
          <h1 class="text-lg font-semibold">个人中心</h1>
        </div>
      </div>
      <div class="rounded bg-white mx-4 mt-4 py-6">
        <div id="tabs" class="flex justify-start items-center py-4 bg-gray-100">
          <div class="px-4 text-md">
            <a href="/profile" class="underline-gray">账号信息</a>
          </div>
          <div class="px-4 text-md">
            <a href="/set_password">修改密码</a>
          </div>
        </div>
        <div class="mt-4 mb-3">
          <div class="not-prose relative">
            <div class="ml-4 text-lg">
              <div class="py-2">
                用户名： {{user.username}}
              </div>
              <div class="py-2">
                手机号：12312312312
              </div>
              <div class="py-2">
                会员状态： 会员\ 非会员
              </div>
              <div class="py-2">
                到期时间：*****
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
