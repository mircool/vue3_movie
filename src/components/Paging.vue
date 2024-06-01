模板
<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

// 初始化当前页码
const currentPage = ref(1);
// 每页的电影数量
const pageSize = 12;
// 获取路由实例
const router = useRouter();
// 定义组件接收的props
const props = defineProps({
  info: Object
});

// 组件挂载时，从路由查询参数中获取当前页码，并进行初始化
onMounted(() => {
  currentPage.value = Number(useRoute().query.page) || 1;
});

// 计算上一页码
const prePage = computed(() => {
  return props.info.previous ? currentPage.value - 1 : currentPage.value
});

// 计算下一页码
const nextPage = computed(() => {
  return props.info.next ? currentPage.value + 1 : currentPage.value
});

// 计算总页数
const totalPage = computed(() => {
  return Math.ceil(props.info.count / pageSize)
});

// 计算页码数组
const pages = computed(() => {
      const pageArr = [];
      for (let i = 1; i <= totalPage.value; i++) {
        if (i === 1 || i === totalPage.value || (i >= currentPage.value - 1 && i <= currentPage.value + 1)) {
          pageArr.push(i);
        } else if (i === currentPage.value - 2 || i === currentPage.value + 2) {
          pageArr.push('...');
        }

      }
      return pageArr;
    }
);

/**
 * 跳转到指定页码
 * @param {number} page 想要跳转到的页码
 */
const goToPage = (page) => {
  if (page < 1 || page > totalPage.value) {
    // 如果页码无效，则将其设置为首页或末页
    currentPage.value = page < 1 ? 1 : totalPage.value;
  } else {
    currentPage.value = page;
    // 获取当前的查询参数
    const currentQuery = {...router.currentRoute.value.query};
    // 修改页码,把page转换为字符串
    currentQuery.page = String(page);
    // 发起路由跳转到指定页码，保留其他查询参数
    router.push({query: currentQuery}).catch(err => {
      console.log(err);
    });
  }
}
</script>


<template>
  <div class="flex items-center justify-center text-gray-500 pb-4 mb-12">
    <a v-if="props.info.previous" class="page-link" @click="goToPage(prePage)">
      <button class="w-8 h-8 rounded mx-1 my-1 bg-gray-300">
        <svg xmlns='http://www.w3.org/2000/svg' class="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"></path>
        </svg>
      </button>
    </a>

    <a class="page-link" v-for="page in pages" :key="page">
      <button
          v-if="page==='...'"
          :class="page===currentPage?'w-8 h-8 rounded mx-1 my-1 bg-blue-500 text-white':'w-8 h-8 rounded mx-1 my-1 bg-gray-300'">
        {{ page }}
      </button>
      <button
          v-else
          @click="goToPage(page)"
          :class="page===currentPage?'w-8 h-8 rounded mx-1 my-1 bg-blue-500 text-white':'w-8 h-8 rounded mx-1 my-1 bg-gray-300'">
        {{ page }}
      </button>
    </a>

    <a v-if="props.info.next" class="page-link" @click="goToPage(nextPage)">
      <button class="w-8 h-8 rounded mx-1 my-1 bg-gray-300">
        <svg xmlns='http://www.w3.org/2000/svg' class="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"></path>
        </svg>
      </button>
    </a>
  </div>
</template>

<style scoped>

</style>
