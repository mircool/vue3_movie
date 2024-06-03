<script setup>
import {onMounted, ref, watch} from "vue";
import {getOrders, pay, payOrder} from "@/api";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {errorMessage} from "@/utils/message.js";
import Paging from "@/components/Paging.vue";
import {useRoute} from "vue-router";

const route = useRoute()
const order_sn = ref('')


const orders = ref([
  {
    order_sn: "",
    card: {
      card_name: ""
    },
    pay_time: "",
    order_mount: "",
    pay_status: ""
  }
])

const fetchOrders = () => {
  const page = route.query.page   // 当前页码
  const pay_status = route.query.pay_status   // 订单状态
  const order_sn = route.query.order_sn   // 订单号
  const params = new URLSearchParams()
  if (page) {
    params.append('page', String(page))
  }
  if (pay_status) {
    params.append('pay_status', String(pay_status))
  }
  if (order_sn) {
    params.append('order_sn', String(order_sn))
  }

  getOrders(params).then((res) => {
    orders.value = res.data
  }).catch((err) => {
    const error = err.response.data
    for (let key in error) {
      errorMessage(error[key])
    }
  })
}

const topayOrder = (id, sn) => {
  console.log('payOrder', id, sn)
  payOrder(id, sn).then((res) => {
    // 新窗口打开支付页面
    window.open(res.data.url)
  }).catch((err) => {
    const error = err.response.data
    for (let key in error) {
      errorMessage(error[key])
    }
  })
}

// formatDate
const formatDate = (date) => {
  const d = new Date(date)
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
}

onMounted(() => {
  fetchOrders()
  order_sn.value = route.query.order_sn
})

watch(() => route.query, (newQuery) => {
  fetchOrders()
  // 页面滚动到顶部并添加动画
  window.scrollTo({
    top: 0,
    behavior: "smooth",  // 平滑滚动
  })
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
          <h1 class="text-lg font-semibold">我的订单</h1>
        </div>
      </div>
      <div class="rounded bg-white mx-4 mt-4 py-6">
        <div id="tabs" class="flex justify-start items-center py-4">
          <div class="px-4 text-md">
            <a href="/orders" class="order-status" data-order-status="all">全部订单</a>
          </div>
          <div class="px-4 text-md">
            <a href="/orders/?pay_status=WAIT_BUYER_PAY" class="order-status"
               data-order-status="unpay">未付款</a>
          </div>
          <div class="px-4 text-md">
            <a href="/orders/?pay_status=TRADE_SUCCESS" class="order-status"
               data-order-status="payed">已付款</a>
          </div>
          <div class="flex items-center ml-4">
            <div class="relative shrink">
              <form>
                <input v-model="order_sn"
                       type="text" name="order_sn"
                       class="outline-0 h-9 rounded border border-gray-600 placeholder-gray-400 w-64 px-2 py-1"
                       placeholder="请输入订单号" value=""/>
                <div class="absolute top-0 right-0 flex items-center h-full">
                  <div class="rounded text-xs text-gray-400 px-2 mr-2">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewbox="0 0 24 24"
                           stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="mt-4 mb-3">
          <div class="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
            <div
                class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
                style="background-position:10px 10px"></div>
            <div class="relative rounded-xl overflow-auto">
              <div class="shadow-sm overflow-hidden my-8">
                <table class="border-collapse table-auto w-full text-sm">
                  <thead>
                  <tr>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      订单号
                    </th>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      商品名称
                    </th>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      购买日期
                    </th>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      金额
                    </th>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      订单状态
                    </th>
                  </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-slate-800">
                  <tr v-for="order in orders.results" :key="order.order_sn">
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {{ order.order_sn }}
                    </td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {{ order.card.card_name }}
                    </td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {{ formatDate(order.pay_time) }}
                    </td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {{ order.order_mount }} 元
                    </td>
                    <td class="border-b border-slate-100 dark:border-slate-700 py-4 text-slate-500 dark:text-slate-400">
                      <button v-if="order.pay_status === 'WAIT_BUYER_PAY'"
                              @click="topayOrder(order.card.id,order.order_sn)"
                              class="rounded border bg-gray-500 hover:bg-blue-500 hover:text-white text-sm h-8 w-16 text-primary-100">
                        待付款
                      </button>
                      <button v-else-if="order.pay_status === 'TRADE_SUCCESS'"
                              class="rounded border bg-green-500 hover:bg-green-600 hover:text-white text-sm h-8 w-16 text-primary-100">
                        已付款
                      </button>
                      <button v-else-if="order.pay_status === 'TRADE_CLOSED'"
                              class="rounded border bg-gray-500 hover:bg-blue-500 hover:text-white text-sm h-8 w-16 text-primary-100">
                        已关闭
                      </button>

                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Paging :info="orders"/>
      </div>
    </div>

    <!--footer-->
    <Footer/>
  </div>
</template>
