<script setup>
import {RouterView} from 'vue-router'


import {useUserStore} from '@/stores/user'
import {onBeforeMount} from "vue";

const userStore = useUserStore()

onBeforeMount(() => {
  userStore.initializeStore()
})

</script>

<template>
  <RouterView/>
</template>
